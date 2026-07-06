---
title: "chroot: la historia real detrás de los contenedores"
description: "Borrador de ensayo técnico sobre chroot, UNIX V7 y la genealogía conceptual de los contenedores modernos."
date: 2026-07-06
tags: ["unix", "linux", "containers", "history", "chroot"]
lang: "es"
draft: true
---

## Resumen

La historia de los contenedores modernos suele contarse desde Docker, Kubernetes y el ecosistema cloud native. Esa historia es útil, pero incompleta. Mucho antes, UNIX introdujo con `chroot` una idea decisiva: el mundo visible de un proceso no tiene por qué coincidir con el mundo completo del sistema.

`chroot` no fue un contenedor moderno, ni una jail de seguridad, ni una sandbox robusta. Su importancia está en otro lugar: permitió cambiar la raíz aparente del filesystem para un proceso y, con ello, separó parcialmente el sistema real del sistema percibido.

La tesis central del ensayo es precisa: `chroot` no creó los contenedores, pero sí formuló una pregunta que los contenedores modernos ampliarían durante décadas: qué mundo debe presentarle el sistema operativo a un proceso.

## Estado de este borrador

Este archivo es una versión inicial creada a partir del documento editorial de Google Drive. El manuscrito completo ya existe como Markdown exportado desde el documento restaurado, pero el conector bloqueó la subida del archivo completo por tamaño/contenido largo.

La versión completa debe reemplazar este borrador antes de publicar. El post queda marcado como `draft: true` para evitar publicación accidental.

## Estructura prevista

1. Prólogo: la historia mal contada de los contenedores.
2. UNIX antes de `chroot`.
3. Nacimiento de `chroot` en UNIX V7.
4. `u_rdir`, `namei()` y resolución de rutas.
5. Por qué `chroot` nunca fue una jail completa.
6. La discusión de LKML de 2007.
7. FreeBSD Jails y Solaris Zones.
8. Linux namespaces, cgroups, capabilities y seccomp.
9. OCI, `runc`, `pivot_root` y ejecución moderna de contenedores.
10. La herencia conceptual de `chroot`.

## Nota editorial

La versión publicable debe conservar citas como texto Markdown/HTML, no como notas al pie de Google Docs. La estrategia recomendada es usar referencias manuales tipo `[1]` en el cuerpo y una sección final de notas o bibliografía.
