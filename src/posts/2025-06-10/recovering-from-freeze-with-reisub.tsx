import type { ReactElement } from "react";
import type { Post } from "@/components/blog/post.types";
import {
	CodeArg,
	CodeComment,
	CodeLine,
	CodeVal,
	CodeVar,
} from "@/components/blog/CodeElements/CodeElements";

export const recoveringFromFreezeWithReisub: Post = {
	title: "Recovering from system freeze with REISUB on linux",
	slug: "recovering-from-freeze-with-reisub",
	date: "2025-06-10",
	categories: ["Linux"],
	body: <RecoveringFromFreezeWithReisub />,
};

function RecoveringFromFreezeWithReisub(): ReactElement {
	return (
		<>
			<p>
				You have a system freeze where nothing works, and you think you just have to hold
				down the power button? Stop. Think about it. You might be able to avoid this (or at
				least future occurrences) with REISUB.
			</p>
			<p>
				Basically, try holding <code>Alt + SysRq</code> and then typing <code>REISUB</code>{" "}
				slowly. That's like cheat codes in your GTAs except for recovery.
			</p>
			<p>
				But, it might not work, if SysRq button handling is not enabled. To check that, run
			</p>
			<pre>
				<CodeVar>sudo</CodeVar>
				<CodeArg> sysctl</CodeArg>
				<CodeVal> --system</CodeVal>
			</pre>
			<p>In my case it returns:</p>
			<pre>
				{`- Applying /usr/lib/sysctl.d/10-arch.conf ...
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
  kernel.pid_max = 4194304`}
			</pre>
			<p>
				See that <code>kernel.sysrq = 16</code>? That's it being (mostly) disabled.
			</p>
			<p>
				To enable it permanently, create/edit <code>/etc/sysctl.d/99-sysctl.conf</code> file
				(under sudo) so that it contains:
			</p>
			<pre>
				<CodeLine>
					<CodeVar>kernel.sysrq</CodeVar>
					<CodeArg> =</CodeArg>
					<CodeVal> 1</CodeVal>
				</CodeLine>
			</pre>
			<p>
				One would mean that all <code>SysRq</code> commands are allowed.
			</p>
			<p>Run this again:</p>
			<pre>
				<code>
					<CodeLine>
						<CodeVar>sudo</CodeVar>
						<CodeArg> sysctl</CodeArg>
						<CodeVal> --system</CodeVal>
					</CodeLine>
				</code>
			</pre>
			<p>Now, the output is:</p>
			<pre>
				<code>
					{`* Applying /usr/lib/sysctl.d/10-arch.conf ...
* Applying /usr/lib/sysctl.d/50-coredump.conf ...
* Applying /usr/lib/sysctl.d/50-default.conf ...
* Applying /usr/lib/sysctl.d/50-pid-max.conf ...
* Applying /etc/sysctl.d/99-sysctl.conf ...     `}
					<CodeComment>{"<-- new"}</CodeComment>
					{`
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
kernel.sysrq = 1        `}
					<CodeComment>{"<-- new, overrides"}</CodeComment>
				</code>
			</pre>
			<p>
				This means <code>SysRq</code> is enabled and we are done.
			</p>
			<p>
				How it works? You should read{" "}
				<a href="https://wiki.archlinux.org/title/Keyboard_shortcuts#Kernel_(SysRq)">
					Kernel (SysRq)
				</a>{" "}
				(at least up to{" "}
				<a href="https://wiki.archlinux.org/title/Keyboard_shortcuts#Rebooting">1.1.2</a>),
				and for configuration documentation, look at{" "}
				<a href="https://wiki.archlinux.org/title/Sysctl#Configuration">
					Sysctl configuration
				</a>
				.
			</p>
		</>
	);
}
