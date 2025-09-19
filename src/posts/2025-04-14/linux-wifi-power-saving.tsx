import type { ReactElement } from "react";
import type { Post } from "@/components/blog/post.types";
import {
	CodeArg,
	CodeCommand,
	CodeLine,
	CodeVar,
} from "@/components/blog/CodeElements/CodeElements";

export const linuxWifiPowerSaving: Post = {
	title: "Linux Wi-Fi power saving",
	slug: "linux-wifi-power-saving",
	date: "2025-04-14",
	categories: ["Programming"],
	body: <LinuxWifiPowerSaving />,
};

function LinuxWifiPowerSaving(): ReactElement {
	return (
		<>
			<p>
				I'm on Endeavor OS (recommend, except switch theme to default), and recently, I
				noticed that if I ping google, I get sort-of ladder of ping times:
			</p>
			<pre>
				<CodeCommand command="ping" args="8.8.8.8" />
				{`                   
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=57 time=15.8 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=57 time=21.4 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=57 time=85.6 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=57 time=41.0 ms
64 bytes from 8.8.8.8: icmp_seq=5 ttl=57 time=28.4 ms
64 bytes from 8.8.8.8: icmp_seq=6 ttl=57 time=50.7 ms
64 bytes from 8.8.8.8: icmp_seq=7 ttl=57 time=72.7 ms
64 bytes from 8.8.8.8: icmp_seq=8 ttl=57 time=94.6 ms
64 bytes from 8.8.8.8: icmp_seq=9 ttl=57 time=117 ms`}
			</pre>
			<p>
				See how it rises up? That was very weird. At some points the ping would even
				timeout. Similar effect would be noticeable in voice calls or games. Eventually, I
				found out that it was <code>power_save</code>.
			</p>
			<p>
				Even though I'm on a PC, not a laptop, power saving was still enabled (and it is
				enabled by default in most distros it seems) in NetworkManager.
			</p>
			<p>To check if you have it enabled or disabled you need to run:</p>
			<pre>
				<CodeLine>
					<CodeVar>sudo</CodeVar> <CodeArg>iw dev wlan0 get power_save</CodeArg>
				</CodeLine>
			</pre>
			<p>
				It'll report <code>Power save: on</code> if it's enabled.
			</p>
			<p>
				But, I didn't have <code>iw</code> installed, so I had to first do{" "}
				<code>yay iw</code> (consult your distro for appropriate installation instructions).
			</p>
			<p>To then disable it, you need to run:</p>
			<pre>
				<CodeLine>
					<CodeVar>sudo</CodeVar> <CodeArg>iw dev wlan0 set power_save off</CodeArg>
				</CodeLine>
			</pre>
			<p>
				Changes are applied immediately, so, getting it again, you should see{" "}
				<code>Power save: off</code>. And the ping test reports:
			</p>
			<pre>
				<CodeCommand command="ping" args="8.8.8.8" />
				{`                    
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=57 time=16.2 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=57 time=15.9 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=57 time=15.7 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=57 time=16.2 ms
64 bytes from 8.8.8.8: icmp_seq=5 ttl=57 time=15.9 ms`}
			</pre>
			<p>
				Much better. But, changes are not persistent. Appropriate googling terms will
				probably get you{" "}
				<a href="https://unix.stackexchange.com/questions/269661/how-to-turn-off-wireless-power-management-permanently">
					How to turn off Wireless power management permanently
				</a>{" "}
				on unix.stackexchange, with a bunch of solutions, and I liked{" "}
				<a href="https://unix.stackexchange.com/a/315400">one</a> of them the most:
			</p>
			<blockquote>
				<ol>
					<li>
						Open <code>/etc/NetworkManager/conf.d/default-wifi-powersave-on.conf</code>
					</li>
					<li>
						add/modify it so that <code>wifi.powersave</code> is <code>2</code>:
					</li>
				</ol>
				<pre>
					{`[connection]
wifi.powersave = 2`}
				</pre>
			</blockquote>
			<p>Thanks, @Niko!</p>
			<p>That's it, reboot and everything is cool.</p>
		</>
	);
}
