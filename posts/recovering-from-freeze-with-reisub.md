---
{
    "title": "Recovering from system freeze with REISUB on linux",
    "slug": "recovering-from-freeze-with-reisub",
    "date": "2025-06-10"
}
---

You have a system freeze where nothing works, and you think you just have to hold down the power button? Stop. Think about it. You might be able to avoid this (or at least future occurrences) with REISUB.

Basically, try holding `Alt + SysRq` and then typing `REISUB` slowly. That's like cheat codes in your GTAs except for recovery.

But, it might not work, if SysRq button handling is not enabled. To check that, run

```shell
sudo sysctl --system
```

In my case it returns:

```
- Applying /usr/lib/sysctl.d/10-arch.conf ...
- Applying /usr/lib/sysctl.d/50-coredump.conf ...
- Applying /usr/lib/sysctl.d/50-default.conf ...
- Applying /usr/lib/sysctl.d/50-pid-max.conf ...
  fs.inotify.max_user_instances = 1024
  fs.inotify.max_user_watches = 524288
  vm.max_map_count = 1048576
  net.ipv4.tcp_keepalive_time = 120
  kernel.core_pattern = |/usr/lib/systemd/systemd-coredump %P %u %g %s %t %c %h %d %F
  kernel.core_pipe_limit = 16
  fs.suid_dumpable = 2
  kernel.sysrq = 16
  kernel.core_uses_pid = 1
  net.ipv4.conf.default.rp_filter = 2
  ... (other net.ipv4 entries) ...
  net.ipv4.ping_group_range = 0 2147483647
  net.core.default_qdisc = fq_codel
  fs.protected_hardlinks = 1
  fs.protected_symlinks = 1
  fs.protected_regular = 1
  fs.protected_fifos = 1
  kernel.pid_max = 4194304
```

See that `kernel.sysrq = 16`? That's it being (mostly) disabled.

To enable it permanently, create/edit `/etc/sysctl.d/99-sysctl.conf` file (under sudo) so that it contains:

```
kernel.sysrq=1
```

One would mean that all `SysRq` commands are allowed.

Run this again:

```shell
sudo sysctl --system
```

Now, the output is:

```
* Applying /usr/lib/sysctl.d/10-arch.conf ...
* Applying /usr/lib/sysctl.d/50-coredump.conf ...
* Applying /usr/lib/sysctl.d/50-default.conf ...
* Applying /usr/lib/sysctl.d/50-pid-max.conf ...
* Applying /etc/sysctl.d/99-sysctl.conf ...     <-- new
fs.inotify.max_user_instances = 1024
fs.inotify.max_user_watches = 524288
vm.max_map_count = 1048576
net.ipv4.tcp_keepalive_time = 120
kernel.core_pattern = |/usr/lib/systemd/systemd-coredump %P %u %g %s %t %c %h %d %F
kernel.core_pipe_limit = 16
fs.suid_dumpable = 2
kernel.sysrq = 16       <-- still here
kernel.core_uses_pid = 1
... (net and fs stuff like before)...
kernel.pid_max = 4194304
kernel.sysrq = 1        <-- new, overrides
```

This means `SysRq` is enabled and we are done.

How it works? You should read [Kernel (SysRq)](https://wiki.archlinux.org/title/Keyboard_shortcuts#Kernel_(SysRq)) (at least up to [1.1.2](https://wiki.archlinux.org/title/Keyboard_shortcuts#Rebooting)), and for configuration documentation, look at [Sysctl configuration](https://wiki.archlinux.org/title/Sysctl#Configuration).
