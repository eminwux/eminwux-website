---
title: "chroot: la raíz falsa que cambió el mundo de un proceso"
description: "Cómo unas pocas líneas de UNIX V7 convirtieron la raíz del filesystem en una propiedad contextual, sin crear todavía un contenedor ni una cárcel de seguridad."
date: 2026-07-28
tags: ["unix", "linux", "history", "chroot", "filesystems", "containers"]
lang: "es"
draft: false
youtubeUrl: "https://youtu.be/1QFqUFEPGRw"
ogImage: "/blog/chroot-raiz-falsa/og.jpg"
---

## Resumen

Mucho antes de Docker y antes incluso de Linux, UNIX ya podía tomar un directorio cualquiera y presentárselo a un proceso como si fuera la raíz completa del sistema. La herramienta se llamaba `chroot`, y su implementación visible en UNIX Version 7, publicada en 1979, cabía en unas pocas líneas.

Ese tamaño invita a contar una historia equivocada. `chroot` no creó el primer contenedor, no arrancó otro kernel y no construyó una cárcel de seguridad. Hizo algo más pequeño y, conceptualmente, más profundo: convirtió `/` en una referencia que podía depender del proceso.

La tesis de este artículo es esa. La importancia de `chroot` no está en haber resuelto el aislamiento moderno, sino en haber cambiado el mapa con el que un proceso interpreta el filesystem. Después de `chroot`, dos procesos podían usar el mismo nombre absoluto y llegar a objetos distintos.

<nav aria-label="Tabla de contenidos">
  <strong>Contenido</strong>
  <ol>
    <li><a href="#una-raiz-que-no-era-la-raiz">Una raíz que no era la raíz</a></li>
    <li><a href="#el-problema-de-construir-un-sistema-dentro-de-otro">El problema de construir un sistema dentro de otro</a></li>
    <li><a href="#las-pocas-lineas-de-unix-v7">Las pocas líneas de UNIX V7</a></li>
    <li><a href="#donde-estoy-y-donde-comienza-mi-mundo">Dónde estoy y dónde comienza mi mundo</a></li>
    <li><a href="#una-referencia-a-un-inodo-no-un-prefijo">Una referencia a un inodo, no un prefijo</a></li>
    <li><a href="#lo-que-chroot-no-construye">Lo que chroot no construye</a></li>
    <li><a href="#la-primera-raiz-falsa-todavia-tenia-una-salida">La primera raíz falsa todavía tenía una salida</a></li>
    <li><a href="#no-era-un-contenedor-era-una-nueva-pregunta">No era un contenedor: era una nueva pregunta</a></li>
    <li><a href="#conclusion-chroot-no-construye-una-muralla">Conclusión: chroot no construye una muralla</a></li>
    <li><a href="#fuentes-y-lecturas">Fuentes y lecturas</a></li>
  </ol>
</nav>

<a id="una-raiz-que-no-era-la-raiz"></a>

## Una raíz que no era la raíz

En un sistema UNIX, la barra `/` parece una certeza. Es el origen del árbol de archivos: el punto desde el que comienzan nombres como `/etc/passwd`, `/bin/sh` o `/usr/lib`. Un proceso puede cambiar de directorio, pero ese movimiento ocurre dentro del mismo árbol. Cambia su posición; no cambia el mundo en el que se mueve.

Esa intuición funciona hasta que aparece una pregunta extraña: ¿qué pasaría si `/` no significara lo mismo para todos los procesos?

Imaginemos dos programas que intentan abrir `/etc/passwd`. El primero llega al archivo del sistema principal. El segundo llega a un archivo situado, desde la perspectiva del host, en `/mnt/newroot/etc/passwd`. Los dos entregaron al kernel exactamente la misma cadena. Ninguno conoce un prefijo especial. Sin embargo, la búsqueda comenzó desde lugares diferentes.

Eso es lo que vuelve interesante a `chroot`. No modifica la ruta escrita por el programa; modifica el contexto con el que el kernel la interpreta. Una carpeta continúa siendo una carpeta para el resto del sistema, pero para un proceso puede convertirse en `/`.

El efecto se parece a una ilusión, aunque no es un truco visual de la shell. No se limita a cambiar lo que imprime `pwd` ni a ocultar texto en una interfaz. La diferencia vive en el mecanismo normal con el que el kernel transforma nombres en objetos del filesystem.

Para entender qué clase de problema podía resolver esa capacidad hay que dejar a un lado, por un momento, la idea moderna de seguridad. Antes de pensar en cómo encerrar a un atacante, pensemos en cómo trabajar con un sistema que todavía no es el sistema activo.

## El problema de construir un sistema dentro de otro

UNIX no era solamente un producto que se instalaba y quedaba terminado. También era el entorno utilizado para construir, instalar y mantener UNIX. Compiladores, linkers, bibliotecas y herramientas de instalación operaban desde el sistema que ya estaba funcionando.

Lo que sigue es una reconstrucción técnica de un uso que el mecanismo hacía posible, no una afirmación sobre la motivación personal exacta de sus autores.

Supongamos que conectamos un disco nuevo y montamos en él la jerarquía de una instalación futura:

```text
/mnt/newroot/
├── bin/
│   └── sh
├── etc/
│   └── passwd
├── lib/
└── usr/
```

Para el sistema activo, todo eso es un subárbol bajo `/mnt/newroot`. Para el sistema que estamos preparando, ese mismo directorio deberá convertirse algún día en `/`. Sus programas esperarán encontrar `/bin`, leerán archivos de `/etc` y buscarán bibliotecas en `/lib`.

Una solución posible sería modificar cada herramienta para que añadiera `/mnt/newroot` a todas sus rutas absolutas. Pero esa estrategia distribuye el mismo problema por todo el software. Cada programa debe conocer el destino temporal, cada script necesita una excepción y cualquier ruta olvidada puede terminar modificando el sistema principal.

La alternativa de UNIX fue invertir la responsabilidad: no enseñar el prefijo a todos los programas, sino cambiar el significado de la raíz para el proceso que los ejecutaba. Una herramienta podía seguir abriendo `/etc/passwd`; el kernel se encargaría de comenzar la búsqueda en la jerarquía alternativa.

El modelo conserva utilidad práctica. Cuando se repara una instalación de Linux desde un sistema externo, cuando se prepara una distribución dentro de un árbol nuevo o cuando se construye Linux From Scratch, interesa que herramientas ordinarias operen sobre una raíz que todavía no ha arrancado. `chroot` permite entrar en ese taller sin convencer a cada herramienta de que sus rutas significan otra cosa.

La palabra *taller* describe mejor este origen técnico que la palabra *cárcel*. El objetivo inmediato es hacer habitable una jerarquía alternativa. La contención de procesos hostiles plantea requisitos distintos y mucho más amplios.

<a id="las-pocas-lineas-de-unix-v7"></a>

## Las pocas líneas de UNIX V7

La implementación de `chroot()` conservada en el código de UNIX Version 7 resulta llamativamente breve:

```c
chroot()
{
        if (suser())
                chdirec(&u.u_rdir);
}
```

El fragmento no contiene un runtime, una imagen, una política de recursos ni una segunda instancia del sistema operativo. Hace dos cosas.

Primero, `suser()` comprueba que la operación esté autorizada para el superusuario. Después, `chdirec()` recibe la dirección de `u.u_rdir` y actualiza la referencia que representa la raíz del proceso.

La comprobación de privilegios también ayuda a ubicar el mecanismo. El `chroot` histórico no era una operación que cualquier proceso no confiable pudiera invocar para quedar mágicamente confinado. Era una modificación privilegiada del contexto desde el que el proceso accedía al filesystem.

La brevedad del código no significa que todo el trabajo ocurriera en esas cuatro líneas. `chroot()` podía ser pequeño porque UNIX ya tenía las abstracciones necesarias: procesos con estado propio, inodos que representaban objetos del filesystem y una rutina encargada de resolver nombres. La nueva llamada no construía un mundo desde cero; modificaba una referencia utilizada por la maquinaria existente.

La función auxiliar `chdirec()` era compartida con otra llamada conocida:

```c
chdir()
{
        chdirec(&u.u_cdir);
}
```

Las dos operaciones localizan un directorio y actualizan un campo. La diferencia está en qué campo reciben. Esa diferencia mínima separa dos preguntas fundamentales.

<a id="donde-estoy-y-donde-comienza-mi-mundo"></a>

## Dónde estoy y dónde comienza mi mundo

`chdir()` modifica `u_cdir`, el directorio actual. `chroot()` modifica `u_rdir`, la raíz asociada al proceso. Una forma útil de recordarlo es formular las preguntas que responde cada referencia:

- `u_cdir`: ¿dónde está parado el proceso?
- `u_rdir`: ¿dónde comienza su universo de rutas absolutas?

Una ruta relativa, como `src/main.c`, necesita el directorio actual como punto de partida. Una ruta absoluta, como `/bin/sh`, comienza desde la raíz. Cambiar `u_cdir` mueve al proceso dentro de un árbol. Cambiar `u_rdir` modifica el origen desde el que ese proceso interpreta el árbol.

La estructura `user` de UNIX V7 muestra ambos campos uno junto al otro:

```c
struct inode *u_cdir;   /* pointer to inode of current directory */
struct inode *u_rdir;   /* root directory of current process */
```

El comentario que encabeza esa estructura en el código histórico dice que se asignaba una por proceso. Allí convivían la identidad del usuario, los archivos abiertos, las señales y otros datos del contexto de ejecución. La raíz alternativa no era, por tanto, una nueva propiedad global del sistema: era parte del estado asociado a un proceso.

Eso permite que dos procesos compartan el mismo kernel y, al mismo tiempo, comiencen la resolución de una ruta absoluta desde referencias diferentes. Desde el punto de vista de ambos programas existe `/bin/sh`; desde el punto de vista externo, cada nombre puede conducir a un archivo distinto.

Conviene no llevar la analogía demasiado lejos. `u_cdir` y `u_rdir` explican dos puntos de partida para la resolución de nombres, pero no describen por sí solos toda la semántica de un filesystem. Permisos, puntos de montaje, descriptores abiertos y otros elementos siguen interviniendo. Precisamente por eso `chroot` es útil sin ser total.

## Una referencia a un inodo, no un prefijo

Cuando decimos que `/mnt/newroot` pasa a comportarse como `/`, puede parecer que el kernel toma cada cadena y añade un prefijo:

```text
/bin/sh → /mnt/newroot/bin/sh
```

Ese dibujo sirve para comparar las vistas interna y externa, pero no describe literalmente la implementación. `u_rdir` no guardaba la cadena `/mnt/newroot`. Guardaba un puntero a un inodo: una referencia interna al objeto desde el que debía comenzar el recorrido.

Un pathname es una descripción. Para abrir `/bin/sh`, el kernel debe elegir un punto de partida, localizar la entrada `bin`, comprobar que conduce a un directorio y buscar dentro de él la entrada `sh`. Funciones históricas como `namei()` realizaban esa traducción de nombres a objetos.

Si el proceso no tenía una raíz alternativa, una ruta que comenzaba con `/` partía de la raíz global. Si `u_rdir` estaba configurado, esa referencia podía convertirse en el punto de partida. La cadena entregada por el programa seguía intacta; lo que cambiaba era el primer objeto del recorrido.

Podemos representar las dos perspectivas así:

```text
Vista del host                    Vista del proceso

/mnt/newroot/bin/sh               /bin/sh
/mnt/newroot/etc/passwd           /etc/passwd
/mnt/newroot/usr                  /usr
```

Ninguna de las vistas necesita ser falsa para quien la utiliza. Son nombres contextuales para alcanzar los mismos objetos. El host puede describir el archivo desde su raíz; el proceso lo describe desde la raíz que el kernel le asignó.

Esta separación entre nombre y objeto explica por qué el mecanismo resulta transparente para el software. Una shell o una herramienta de instalación no tiene que saber que vive bajo `/mnt/newroot`. Continúa usando las convenciones normales de UNIX, mientras el kernel interpreta sus nombres dentro de otro contexto.

También explica un límite importante: cambiar el punto de partida de los nombres no invalida automáticamente todas las referencias que ya existían. Un directorio actual o un descriptor abierto puede conservar acceso a objetos que no quedan descritos de la misma manera por las nuevas rutas. `chroot` cambia un componente de la resolución; no reescribe retrospectivamente todo el estado del proceso.

## Lo que chroot no construye

Una raíz alternativa vacía no se convierte por sí sola en un sistema utilizable. Si dentro no existe `/bin/sh`, la shell no aparecerá. Si el ejecutable depende de un cargador o de bibliotecas que faltan, no podrá arrancar. Si una herramienta necesita dispositivos, archivos de configuración o pseudo-filesystems, alguien deberá preparar o montar esos recursos.

`chroot` no crea contenido. Hace que un árbol ya preparado pueda actuar como raíz para la resolución de nombres.

Tampoco crea otro kernel. Los procesos siguen ejecutándose bajo el kernel del host y comparten su scheduler y la memoria que ese kernel administra. Por sí solo, `chroot` no proporciona:

- una vista separada de los procesos;
- una pila de red independiente;
- límites propios de CPU o memoria;
- una identidad de host distinta;
- una reducción automática de privilegios;
- una política completa de acceso al sistema;
- una copia aislada del sistema operativo.

Un contenedor moderno combina varias piezas para construir una vista y una autoridad más limitadas. En Linux, namespaces, cgroups, capabilities, filtros de llamadas al sistema y reglas sobre mounts participan en esa composición. Reducir todo ese conjunto a `chroot` borra las diferencias que permiten hablar de aislamiento moderno.

También sería un error inverso descartar `chroot` porque no ofrece esas capas. Una llave inglesa no fracasa por no ser un taller completo. La llamada resuelve una operación concreta: cambiar la raíz usada para interpretar pathnames absolutos. El problema aparece cuando se le atribuye una garantía que no forma parte de ese contrato.

El manual actual de Linux lo formula sin ambigüedad: `chroot()` modifica un ingrediente de la resolución de rutas y no está pensado, por sí mismo, como una sandbox completa. Además, no cambia automáticamente el directorio actual ni cierra los descriptores de archivo que el proceso ya tenía abiertos. Esas condiciones importan al analizar cualquier expectativa de seguridad.

<a id="la-primera-raiz-falsa-todavia-tenia-una-salida"></a>

## La primera raíz falsa todavía tenía una salida

Hay un detalle histórico que impide proyectar la imagen moderna de una *chroot jail* sobre la primera implementación.

Hoy esperamos que un proceso situado en `/` no pueda ascender con `..`. Si ejecuta `cd ..`, debería permanecer en la misma raíz aparente. Esa regla hace que el subárbol se perciba como cerrado desde la navegación ordinaria.

El código de resolución de nombres de UNIX V7 utilizaba `u_rdir` al comenzar una ruta absoluta, pero todavía no incluía una comprobación especial que mantuviera `..` dentro de esa raíz por proceso. La semántica que detiene el ascenso en la raíz alternativa apareció después en BSD.

El registro histórico permite fechar el cambio con precisión. El 9 de marzo de 1981, Bill Joy creó la revisión SCCS 4.5 de `vfs_lookup.c`. El mensaje general de la revisión, «lint and a few minor fixed», no describía esta modificación en particular, pero el diff añadió tres líneas inequívocas:

```c
if (dp == u.u_rdir && u.u_dent.d_name[0] == '.' &&
    u.u_dent.d_name[1] == '.' && u.u_dent.d_name[2] == 0)
        goto cloop;
```

La condición comprueba dos cosas: que el directorio recorrido sea la raíz asignada al proceso y que el siguiente componente sea exactamente `..`. Cuando ambas se cumplen, la búsqueda vuelve al bucle sin seguir la entrada que conduciría al directorio padre. La [revisión reconstruida desde el historial SCCS de CSRG](https://github.com/dspinellis/unix-history-repo/commit/33fae772fcfca6b0b494138885a755262cc7b1db) conserva el autor, la fecha, el número de versión y el diff.

El orden cambia la interpretación histórica:

1. Primero, UNIX permitió elegir otro punto de partida para las rutas absolutas.
2. Después, BSD reforzó la apariencia de un subárbol cerrado al tratar especialmente `..` en esa frontera.

Esto no demuestra por sí solo cuál fue la motivación personal exacta de sus autores. Sí permite describir lo que hacía el código sin convertir una reconstrucción en un hecho: la primera versión relativizaba la raíz, pero todavía no ofrecía ni siquiera toda la semántica de navegación que más tarde asociaríamos con una jaula.

Y aun después de impedir el ascenso ordinario mediante `..`, seguían abiertas las demás preguntas. ¿Qué sucede con el directorio actual si queda fuera del nuevo árbol? ¿Qué acceso conservan los descriptores ya abiertos? ¿Qué puede hacer un proceso que mantiene privilegios? ¿Qué red y qué procesos ve? Cerrar una ruta de navegación no responde automáticamente a ninguna de ellas.

Por eso conviene distinguir tres cosas: el contrato de la llamada, las sorpresas que puede producir y la expectativa de seguridad que alguien proyecta sobre ella. Un comportamiento puede resultar peligroso en cierto uso sin convertir a la interfaz en una sandbox prometida y defectuosa.

## No era un contenedor: era una nueva pregunta

Llamar a `chroot` “el primer contenedor” produce una genealogía fácil de recordar, pero técnicamente imprecisa. Un contenedor moderno no es solo un árbol de archivos alternativo. Es el resultado de combinar mecanismos que controlan qué ve un proceso, qué puede hacer y cuántos recursos puede consumir.

Sin embargo, excluir a `chroot` de la historia sería perder la intuición que lo vuelve relevante. La llamada mostró que el sistema presentado a un proceso podía diferir del sistema completo de la máquina. En su caso, esa diferencia afectaba principalmente al origen de las rutas absolutas. Décadas después, otras tecnologías extenderían la misma clase de pregunta a los identificadores de proceso, la red, los mounts, los usuarios y los recursos.

La relación es conceptual, no una equivalencia. `chroot` no contenía escondidos los namespaces ni los cgroups. Tampoco determinó por sí solo la evolución posterior. Pero hizo visible una separación que sigue siendo central: el mundo que un proceso puede nombrar no tiene por qué coincidir con todo el mundo que administra el kernel.

Esa separación ayuda también a entender por qué los contenedores comparten kernel sin ser simplemente procesos ordinarios sin contexto. El aislamiento no aparece de una única pared. Se compone ajustando varias vistas y autoridades. `chroot` actuaba sobre una de ellas y dejaba las demás prácticamente intactas.

Su longevidad procede de esa precisión. Todavía es útil al reparar instalaciones, preparar sistemas y ejecutar herramientas dentro de jerarquías alternativas. No porque se haya convertido retroactivamente en una solución completa, sino porque la operación original continúa siendo necesaria.

Este ensayo acompaña al vídeo [*chroot: la raíz falsa que cambió el mundo de un proceso*](https://youtu.be/1QFqUFEPGRw), donde la misma historia se reconstruye visualmente desde el código de UNIX V7.

<a id="conclusion-chroot-no-construye-una-muralla"></a>

## Conclusión: chroot no construye una muralla

`chroot` no mueve archivos, no arranca otro kernel y no fabrica una máquina virtual. En UNIX V7 ni siquiera impedía completamente atravesar la raíz aparente mediante `..`. Su operación era más pequeña: cambiaba la referencia desde la que un proceso comenzaba a interpretar las rutas absolutas.

Eso bastaba para que una herramienta diseñada para operar sobre `/` pudiera trabajar dentro de una jerarquía secundaria. Desde el host, `/mnt/newroot/bin/sh`; desde el proceso, `/bin/sh`. El archivo podía ser el mismo mientras el nombre dependía del contexto.

La desproporción es la parte elegante de la historia. El código visible ocupaba unas pocas líneas, pero la referencia modificada era el origen de todo el árbol. Antes parecía suficiente preguntar dónde estaba `/`. Después de `chroot`, había que añadir: ¿dónde está `/` para este proceso?

Esa pregunta no construyó el contenedor moderno. Abrió una grieta conceptual por la que entrarían muchas ideas posteriores: que el entorno puede ser preparado, que una vista puede ser parcial y que compartir una máquina no obliga a compartir exactamente el mismo mundo.

`chroot` no construye una muralla. Cambia el mapa.

## Fuentes y lecturas

- **UNIX Seventh Edition, `usr/sys/sys/sys4.c`**. Implementación histórica de `chroot()`, `chdir()` y `chdirec()`: [snapshot conservado por TUHS](https://www.tuhs.org/cgi-bin/utree.pl?file=V7/usr/sys/sys/sys4.c).
- **UNIX Seventh Edition, `usr/sys/h/user.h`**. Definición de la estructura por proceso y de los campos `u_cdir` y `u_rdir`: [snapshot conservado por TUHS](https://www.tuhs.org/cgi-bin/utree.pl?file=V7/usr/sys/h/user.h).
- **UNIX Seventh Edition, `usr/sys/sys/nami.c`**. Código histórico de resolución de nombres: [snapshot conservado por TUHS](https://www.tuhs.org/cgi-bin/utree.pl?file=V7/usr/sys/sys/nami.c).
- **UNIX Seventh Edition, `dir(5)`**. Convenciones históricas de las entradas `.` y `..`: [manual conservado por TUHS](https://www.tuhs.org/cgi-bin/utree.pl?file=V7/usr/man/man5/dir.5).
- **CSRG SCCS, revisión 4.5 de `sys/kern/vfs_lookup.c`**. Cambio de Bill Joy del 9 de marzo de 1981 que impide seguir `..` desde `u_rdir`: [commit reconstruido en Unix History Repository](https://github.com/dspinellis/unix-history-repo/commit/33fae772fcfca6b0b494138885a755262cc7b1db).
- **Linux `chroot(2)`**. Contrato actual de la llamada, privilegios necesarios y límites de seguridad: [Linux man-pages](https://man7.org/linux/man-pages/man2/chroot.2.html).
- **Linux From Scratch, capítulo 7**. Uso actual de `chroot` para construir el sistema final desde una jerarquía preparada: [Entering the Chroot Environment](https://www.linuxfromscratch.org/lfs/view/stable/chapter07/chroot.html).
- **The Unix Heritage Society**. Archivo de código, manuales y distribuciones históricas de UNIX: [tuhs.org](https://www.tuhs.org/).
