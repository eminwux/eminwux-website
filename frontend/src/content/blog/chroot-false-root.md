---
title: "chroot: the false root that changed a process's world"
description: "How a few lines of UNIX V7 turned the filesystem root into a contextual property—without yet creating a container or a security jail."
date: 2026-07-29
tags: ["unix", "linux", "history", "chroot", "filesystems", "containers"]
lang: "en"
translationKey: "chroot-false-root"
draft: false
youtubeUrl: "https://youtu.be/1QFqUFEPGRw"
ogImage: "/blog/chroot-raiz-falsa/og.jpg"
---

## Summary

Long before Docker, and even before Linux, UNIX could take any directory and present it to a process as though it were the complete root of the system. The tool was called `chroot`, and its visible implementation in UNIX Version 7, released in 1979, fit into just a few lines.

That brevity invites the wrong story. `chroot` did not create the first container, boot another kernel, or build a security jail. It did something smaller and, conceptually, deeper: it made `/` a reference that could depend on the process.

That is the thesis of this article. The importance of `chroot` lies not in having solved modern isolation, but in having changed the map through which a process interprets the filesystem. After `chroot`, two processes could use the same absolute pathname and reach different objects.

<nav aria-label="Table of contents">
  <strong>Contents</strong>
  <ol>
    <li><a href="#a-root-that-was-not-the-root">A root that was not the root</a></li>
    <li><a href="#building-one-system-inside-another">Building one system inside another</a></li>
    <li><a href="#the-few-lines-in-unix-v7">The few lines in UNIX V7</a></li>
    <li><a href="#where-i-am-and-where-my-world-begins">Where I am and where my world begins</a></li>
    <li><a href="#an-inode-reference-not-a-prefix">An inode reference, not a prefix</a></li>
    <li><a href="#what-chroot-does-not-build">What chroot does not build</a></li>
    <li><a href="#the-first-false-root-still-had-an-exit">The first false root still had an exit</a></li>
    <li><a href="#it-was-not-a-container-it-was-a-new-question">It was not a container: it was a new question</a></li>
    <li><a href="#conclusion-chroot-does-not-build-a-wall">Conclusion: chroot does not build a wall</a></li>
    <li><a href="#sources-and-further-reading">Sources and further reading</a></li>
  </ol>
</nav>

<a id="a-root-that-was-not-the-root"></a>

## A root that was not the root

On a UNIX system, the slash `/` feels like a certainty. It is the origin of the filesystem tree: the point from which names such as `/etc/passwd`, `/bin/sh`, and `/usr/lib` begin. A process can change directories, but that movement takes place within the same tree. Its position changes; the world in which it moves does not.

That intuition holds until an odd question appears: what if `/` did not mean the same thing to every process?

Imagine two programs trying to open `/etc/passwd`. The first reaches the file on the main system. The second reaches a file located, from the host's perspective, at `/mnt/newroot/etc/passwd`. Both gave the kernel exactly the same string. Neither knows about a special prefix. Yet the lookup began in different places.

That is what makes `chroot` interesting. It does not modify the pathname written by the program; it modifies the context in which the kernel interprets it. A directory remains a directory to the rest of the system, but to one process it can become `/`.

The effect resembles an illusion, although it is not a visual shell trick. It does not merely change what `pwd` prints or hide text in an interface. The difference lives in the ordinary mechanism by which the kernel turns names into filesystem objects.

To understand the kind of problem this ability could solve, we need to set aside the modern idea of security for a moment. Before asking how to confine an attacker, consider how to work with a system that is not yet the active system.

<a id="building-one-system-inside-another"></a>

## Building one system inside another

UNIX was not merely a product to be installed and left untouched. It was also the environment used to build, install, and maintain UNIX. Compilers, linkers, libraries, and installation tools ran from the system that was already working.

What follows is a technical reconstruction of a use the mechanism made possible, not a claim about the exact personal motivations of its authors.

Suppose we attach a new disk and mount the hierarchy of a future installation on it:

```text
/mnt/newroot/
├── bin/
│   └── sh
├── etc/
│   └── passwd
├── lib/
└── usr/
```

To the active system, all of this is a subtree beneath `/mnt/newroot`. To the system we are preparing, that same directory must eventually become `/`. Its programs will expect to find `/bin`, read files from `/etc`, and look for libraries in `/lib`.

One possible solution would be to modify every tool so that it adds `/mnt/newroot` to all absolute pathnames. But that strategy spreads the same problem throughout the software. Every program must know the temporary destination, every script needs an exception, and any forgotten pathname may end up modifying the main system.

UNIX took the opposite approach: instead of teaching the prefix to every program, it changed the meaning of the root for the process running them. A tool could continue opening `/etc/passwd`; the kernel would take responsibility for beginning the lookup in the alternative hierarchy.

The model remains useful in practice. When repairing a Linux installation from an external system, preparing a distribution inside a new tree, or building Linux From Scratch, ordinary tools need to operate on a root that has not booted yet. `chroot` lets us enter that workshop without persuading every tool that its pathnames mean something else.

The word *workshop* describes this technical origin better than the word *jail*. The immediate goal is to make an alternative hierarchy habitable. Confining hostile processes requires a different and much broader set of guarantees.

<a id="the-few-lines-in-unix-v7"></a>

## The few lines in UNIX V7

The `chroot()` implementation preserved in the UNIX Version 7 source is strikingly short:

```c
chroot()
{
        if (suser())
                chdirec(&u.u_rdir);
}
```

The fragment contains no runtime, image, resource policy, or second operating-system instance. It does two things.

First, `suser()` checks that the operation is authorized for the superuser. Then `chdirec()` receives the address of `u.u_rdir` and updates the reference that represents the process's root.

The privilege check also helps place the mechanism in context. Historical `chroot` was not an operation that any untrusted process could invoke to become magically confined. It was a privileged modification of the context from which a process accessed the filesystem.

The code's brevity does not mean that all the work happened in those four lines. `chroot()` could be small because UNIX already had the necessary abstractions: processes with their own state, inodes representing filesystem objects, and a routine responsible for resolving names. The new system call did not build a world from scratch; it changed a reference used by the existing machinery.

The helper function `chdirec()` was shared with another familiar system call:

```c
chdir()
{
        chdirec(&u.u_cdir);
}
```

Both operations locate a directory and update a field. The difference is which field they receive. That tiny difference separates two fundamental questions.

<a id="where-i-am-and-where-my-world-begins"></a>

## Where I am and where my world begins

`chdir()` changes `u_cdir`, the current directory. `chroot()` changes `u_rdir`, the root associated with the process. A useful way to remember the distinction is to phrase the question each reference answers:

- `u_cdir`: where is the process standing?
- `u_rdir`: where does its universe of absolute pathnames begin?

A relative pathname such as `src/main.c` needs the current directory as its starting point. An absolute pathname such as `/bin/sh` begins at the root. Changing `u_cdir` moves the process within a tree. Changing `u_rdir` changes the origin from which that process interprets the tree.

The UNIX V7 `user` structure shows both fields side by side:

```c
struct inode *u_cdir;   /* pointer to inode of current directory */
struct inode *u_rdir;   /* root directory of current process */
```

The comment introducing that structure in the historical source says that one was allocated per process. It held the user's identity, open files, signals, and other execution-context data. The alternative root was therefore not a new global property of the system; it was part of the state associated with a process.

That allows two processes to share the same kernel while beginning the resolution of an absolute pathname from different references. From the perspective of both programs, `/bin/sh` exists; from an outside perspective, each name may lead to a different file.

The analogy should not be taken too far. `u_cdir` and `u_rdir` explain two starting points for name resolution, but they do not describe the complete semantics of a filesystem by themselves. Permissions, mount points, open descriptors, and other elements still participate. That is precisely why `chroot` can be useful without being total.

<a id="an-inode-reference-not-a-prefix"></a>

## An inode reference, not a prefix

When we say that `/mnt/newroot` begins to act as `/`, it may sound as though the kernel takes every string and prepends a prefix:

```text
/bin/sh → /mnt/newroot/bin/sh
```

That diagram is useful for comparing the internal and external views, but it does not literally describe the implementation. `u_rdir` did not store the string `/mnt/newroot`. It stored a pointer to an inode: an internal reference to the object from which traversal should begin.

A pathname is a description. To open `/bin/sh`, the kernel must choose a starting point, find the `bin` entry, verify that it leads to a directory, and search that directory for the `sh` entry. Historical functions such as `namei()` performed this translation from names to objects.

If the process had no alternative root, a pathname beginning with `/` started at the global root. If `u_rdir` was set, that reference could become the starting point. The string supplied by the program remained unchanged; what changed was the first object in the traversal.

We can represent the two perspectives like this:

```text
Host view                        Process view

/mnt/newroot/bin/sh              /bin/sh
/mnt/newroot/etc/passwd          /etc/passwd
/mnt/newroot/usr                 /usr
```

Neither view needs to be false to the party using it. They are contextual names for reaching the same objects. The host can describe a file from its root; the process describes it from the root assigned to it by the kernel.

This separation between name and object explains why the mechanism is transparent to software. A shell or installation tool does not need to know that it lives beneath `/mnt/newroot`. It continues using ordinary UNIX conventions while the kernel interprets its names within another context.

It also explains an important limitation: changing the starting point for names does not automatically invalidate every reference that already exists. A current directory or open descriptor may retain access to objects that the new pathnames no longer describe in the same way. `chroot` changes one component of resolution; it does not retrospectively rewrite all of the process's state.

<a id="what-chroot-does-not-build"></a>

## What chroot does not build

An empty alternative root does not become a usable system on its own. If `/bin/sh` does not exist inside it, no shell will appear. If the executable depends on a missing loader or libraries, it cannot start. If a tool needs devices, configuration files, or pseudo-filesystems, someone must prepare or mount those resources.

`chroot` does not create content. It lets a tree that has already been prepared act as the root for name resolution.

Nor does it create another kernel. Processes continue to run under the host kernel and share its scheduler and the memory it manages. By itself, `chroot` does not provide:

- a separate view of processes;
- an independent network stack;
- dedicated CPU or memory limits;
- a distinct host identity;
- an automatic reduction of privileges;
- a complete system-access policy;
- an isolated copy of the operating system.

A modern container combines several pieces to build a more limited view and authority. On Linux, namespaces, cgroups, capabilities, system-call filters, and mount rules all participate in that composition. Reducing this entire set to `chroot` erases the differences that make modern isolation possible.

The opposite mistake would be to dismiss `chroot` because it does not provide those layers. A wrench has not failed because it is not an entire workshop. The system call performs one specific operation: it changes the root used to interpret absolute pathnames. Trouble begins when it is credited with a guarantee that is not part of that contract.

The current Linux manual states this without ambiguity: `chroot()` changes one ingredient of pathname resolution and is not intended, by itself, as a complete sandbox. It also does not automatically change the current directory or close file descriptors the process already had open. Those conditions matter whenever we evaluate a security expectation.

<a id="the-first-false-root-still-had-an-exit"></a>

## The first false root still had an exit

One historical detail prevents us from projecting the modern image of a *chroot jail* onto the first implementation.

Today we expect a process located at `/` to be unable to ascend with `..`. If it runs `cd ..`, it should remain at the same apparent root. This rule makes the subtree feel closed under ordinary navigation.

The pathname-resolution code in UNIX V7 used `u_rdir` when beginning an absolute pathname, but it did not yet include a special check to keep `..` inside that per-process root. The semantics that stop upward traversal at the alternative root appeared later in BSD.

The historical record lets us date the change precisely. On March 9, 1981, Bill Joy created SCCS revision 4.5 of `vfs_lookup.c`. The revision's general message, “lint and a few minor fixed,” did not describe this particular modification, but the diff added three unmistakable lines:

```c
if (dp == u.u_rdir && u.u_dent.d_name[0] == '.' &&
    u.u_dent.d_name[1] == '.' && u.u_dent.d_name[2] == 0)
        goto cloop;
```

The condition checks two things: that the directory being traversed is the root assigned to the process and that the next component is exactly `..`. When both are true, lookup returns to the loop without following the entry that would lead to the parent directory. The [revision reconstructed from CSRG's SCCS history](https://github.com/dspinellis/unix-history-repo/commit/33fae772fcfca6b0b494138885a755262cc7b1db) preserves the author, date, version number, and diff.

The sequence changes the historical interpretation:

1. First, UNIX made it possible to choose another starting point for absolute pathnames.
2. Later, BSD reinforced the appearance of a closed subtree by treating `..` specially at that boundary.

This does not prove the exact personal motivation of the authors. It does let us describe what the code did without turning a reconstruction into a fact: the first version made the root relative to a process, but it did not yet provide even all the navigation semantics we would later associate with a jail.

And even after ordinary upward traversal through `..` was blocked, the other questions remained open. What happens if the current directory lies outside the new tree? What access remains through already-open descriptors? What can a process retaining privileges do? Which network and processes can it see? Closing one route of navigation does not automatically answer any of them.

That is why it is useful to distinguish three things: the system call's contract, the surprises it can produce, and the security expectation someone projects onto it. A behavior can be dangerous in a particular use without turning the interface into a promised but defective sandbox.

<a id="it-was-not-a-container-it-was-a-new-question"></a>

## It was not a container: it was a new question

Calling `chroot` “the first container” creates a genealogy that is easy to remember but technically imprecise. A modern container is not merely an alternative filesystem tree. It results from combining mechanisms that control what a process can see, what it can do, and how many resources it may consume.

Yet excluding `chroot` from the story would mean losing the intuition that makes it relevant. The system call showed that the system presented to a process could differ from the complete system on the machine. In its case, that difference primarily affected the origin of absolute pathnames. Decades later, other technologies would extend the same kind of question to process identifiers, networking, mounts, users, and resources.

The relationship is conceptual, not an equivalence. `chroot` did not secretly contain namespaces or cgroups. Nor did it determine later evolution by itself. But it made a separation visible that remains central: the world a process can name does not have to coincide with the entire world administered by the kernel.

That separation also helps explain why containers can share a kernel without simply being ordinary processes stripped of context. Isolation does not emerge from a single wall. It is composed by adjusting several views and authorities. `chroot` acted on one of them and left the others largely intact.

Its longevity comes from that precision. It remains useful for repairing installations, preparing systems, and running tools inside alternative hierarchies. Not because it retroactively became a complete solution, but because the original operation is still necessary.

This essay accompanies the Spanish-language video [*chroot: la raíz falsa que cambió el mundo de un proceso*](https://youtu.be/1QFqUFEPGRw), where the same story is reconstructed visually from the UNIX V7 source.

<a id="conclusion-chroot-does-not-build-a-wall"></a>

## Conclusion: chroot does not build a wall

`chroot` does not move files, boot another kernel, or manufacture a virtual machine. In UNIX V7, it did not even completely prevent traversal beyond the apparent root through `..`. Its operation was smaller: it changed the reference from which a process began to interpret absolute pathnames.

That was enough for a tool designed to operate on `/` to work inside a secondary hierarchy. From the host, `/mnt/newroot/bin/sh`; from the process, `/bin/sh`. The file could be the same while its name depended on context.

The disproportion is the elegant part of the story. The visible code occupied just a few lines, but the reference it changed was the origin of the entire tree. Before, asking where `/` was seemed sufficient. After `chroot`, another question became necessary: where is `/` for this process?

That question did not build the modern container. It opened a conceptual crack through which many later ideas would enter: that an environment can be prepared, that a view can be partial, and that sharing a machine does not require sharing exactly the same world.

`chroot` does not build a wall. It changes the map.

<a id="sources-and-further-reading"></a>

## Sources and further reading

- **UNIX Seventh Edition, `usr/sys/sys/sys4.c`**. Historical implementation of `chroot()`, `chdir()`, and `chdirec()`: [snapshot preserved by TUHS](https://www.tuhs.org/cgi-bin/utree.pl?file=V7/usr/sys/sys/sys4.c).
- **UNIX Seventh Edition, `usr/sys/h/user.h`**. Definition of the per-process structure and the `u_cdir` and `u_rdir` fields: [snapshot preserved by TUHS](https://www.tuhs.org/cgi-bin/utree.pl?file=V7/usr/sys/h/user.h).
- **UNIX Seventh Edition, `usr/sys/sys/nami.c`**. Historical pathname-resolution code: [snapshot preserved by TUHS](https://www.tuhs.org/cgi-bin/utree.pl?file=V7/usr/sys/sys/nami.c).
- **UNIX Seventh Edition, `dir(5)`**. Historical conventions for the `.` and `..` entries: [manual preserved by TUHS](https://www.tuhs.org/cgi-bin/utree.pl?file=V7/usr/man/man5/dir.5).
- **CSRG SCCS, revision 4.5 of `sys/kern/vfs_lookup.c`**. Bill Joy's March 9, 1981 change preventing `..` from being followed at `u_rdir`: [commit reconstructed in the Unix History Repository](https://github.com/dspinellis/unix-history-repo/commit/33fae772fcfca6b0b494138885a755262cc7b1db).
- **Linux `chroot(2)`**. Current contract of the system call, required privileges, and security limitations: [Linux man-pages](https://man7.org/linux/man-pages/man2/chroot.2.html).
- **Linux From Scratch, chapter 7**. Current use of `chroot` to build the final system from a prepared hierarchy: [Entering the Chroot Environment](https://www.linuxfromscratch.org/lfs/view/stable/chapter07/chroot.html).
- **The Unix Heritage Society**. Archive of historical UNIX source code, manuals, and distributions: [tuhs.org](https://www.tuhs.org/).
