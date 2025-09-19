import type { ReactElement } from "react";
import type { Post } from "@/components/blog/post.types";
import {
	CodeArg,
	CodeLine,
	CodeOther,
	CodeVal,
	CodeVar,
} from "@/components/blog/CodeElements/CodeElements";

export const installingLinuxChecklist: Post = {
	title: "Installing linux checklist",
	slug: "installing-linux-checklist",
	date: "2025-06-18",
	categories: ["Linux"],
	body: <InstallingLinuxChecklist />,
};

function InstallingLinuxChecklist(): ReactElement {
	return (
		<>
			<p>This is my personal checklist for installing Endeavor OS on a new machine.</p>
			<h2>Installation</h2>
			<ol className="contains-task-list">
				<li className="task-list-item">
					<input type="checkbox" /> Create new{" "}
					<a href="https://www.ventoy.net/en/index.html">Ventoy</a> usb drive if don't
					have one
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Check if there is new release on the{" "}
					<a href="https://endeavouros.com">Endeavor OS website</a>
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Put the the ISO, avatar.jpg and wallpaper.jpg (and/or
					other files you might need, like configs) on the drive
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Put the drive in the machine, reboot and choose the
					drive as boot media
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Log in into Wi-Fi
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Start installer
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Pick American English as language
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Select Plasma KDE desktop
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Reboot into the actual system
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Mount the USB drive and copy other files from drive to
					the disk
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Unmount USB and unplug it
				</li>
			</ol>
			<h2>Settings / Personalization</h2>
			<ol className="contains-task-list">
				<li className="task-list-item">
					<input type="checkbox" /> Adjust display Scale
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Disable Mouse acceleration
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Switch Global theme from godawful EndeavourOS to plain
					Breeze Dark
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Enable Night light
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Change Region &amp; Language settings to preferred,
					like Language: American English and norsk bokmål for everything else. You might
					wanna enable the locale in <code>/etc/locale-gen</code> and run{" "}
					<code>locale-gen</code>, see more on{" "}
					<a href="https://wiki.archlinux.org/title/Locale">locale page on arch wiki</a>
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Reboot after changing language settings
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> (if it's a laptop) Set charge limits in Power
					Management &gt; Advanced Power settings
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Set profile picture for your profile
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Set wallpaper in Login screen (SDDM)
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Set wallpaper everywhere else by right-clicking the
					file
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Change cursor size to 36 in Colors &amp; Themes &gt;
					Global Theme &gt; Cursors
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Disable bell in Accessibility &gt; System bell &gt;
					Audible bell
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Enable cursor shake in Accessibility &gt; Shake Cursor
					and magnification as high as it can go, it's hilarious!
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Disable hot corner in Screen Edges
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Add desired keyboard layouts (don't forget to change
					the shortcut)
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Enable compose key in Keyboard &gt; Key Bindings
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Launch Spectacle and configure saving to clipboard and
					folder
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Change home Wi-Fi firewall group to trusted
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Disable "Do not disturb" on fullscreen apps
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Disable "Middle click: Pastes selected text" in
					General Behavior (requires restart)
				</li>
			</ol>
			<h2>Taskbar:</h2>
			<ol className="contains-task-list">
				<li className="task-list-item">
					<input type="checkbox" /> Remove margin spacer thing
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Add Weather Report plugin on the panel
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Set Show temperature in the plugin
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Set Show battery percentage on icon (if it's a laptop)
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Configure digital clock: ISO date, always show
					seconds, show week numbers
				</li>
			</ol>
			<h2>Configs, tweaks and installs</h2>
			<ol className="contains-task-list">
				<li className="task-list-item">
					<input type="checkbox" /> Install <a href="https://ohmyz.sh/">oh-my-zsh</a>:
					<pre>
						<CodeLine>
							<CodeVar>sh</CodeVar>
							<CodeVal> -c</CodeVal>
							<CodeArg> "$(</CodeArg>
							<CodeVar>curl</CodeVar>
							<CodeVal> -fsSL</CodeVal>
							<CodeArg>
								{" "}
								https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
							</CodeArg>
						</CodeLine>
					</pre>
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Reboot for it to become default
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Install{" "}
					<a href="https://micro-editor.github.io/">micro</a>:
					<pre>
						<CodeLine>
							<CodeVar>yay</CodeVar>
							<CodeArg> micro</CodeArg>
						</CodeLine>
					</pre>
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Install wl-clipboard (for copy-pasting in micro):
					<pre>
						<CodeLine>
							<CodeVar>yay</CodeVar>
							<CodeArg> wl-clipboard</CodeArg>
						</CodeLine>
					</pre>
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Disable{" "}
					<a href="/blog/linux-wifi-power-saving">Wi-Fi power save</a>:
					<pre>
						<CodeLine>
							<CodeVar>yay</CodeVar>
							<CodeArg> iw</CodeArg>
						</CodeLine>
						<CodeLine>
							<CodeVar>sudo</CodeVar>
							<CodeArg>
								{" "}
								micro /etc/NetworkManager/conf.d/default-wifi-powersave-on.conf
							</CodeArg>
						</CodeLine>
						<CodeLine />
					</pre>
					Write this:
					<pre>
						<CodeLine>
							<CodeOther>[connection]</CodeOther>
						</CodeLine>
						<CodeLine>
							<CodeVar>wifi.powersave</CodeVar>
							<CodeArg> =</CodeArg>
							<CodeVal> 2</CodeVal>
						</CodeLine>
					</pre>
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Enable{" "}
					<a href="/blog/recovering-from-freeze-with-reisub">REISUB</a>:
					<pre>
						<CodeLine>
							<CodeVar>sudo</CodeVar>
							<CodeArg> micro</CodeArg>
							<CodeArg> /etc/sysctl.d/99-sysctl.con</CodeArg>
						</CodeLine>
					</pre>
					Write this
					<pre>
						<CodeLine>
							<CodeVar>kernel.sysrq</CodeVar>
							<CodeArg> =</CodeArg>
							<CodeVal> 1</CodeVal>
						</CodeLine>
					</pre>
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Put in .gitconfig:
					<pre>{gitconfig}</pre>
				</li>

				<li className="task-list-item">
					<input type="checkbox" /> Install github-cli:
					<pre>
						<CodeLine>
							<CodeVar>yay</CodeVar>
							<CodeArg> github-cli</CodeArg>
						</CodeLine>
					</pre>
				</li>

				<li className="task-list-item">
					<input type="checkbox" /> Login in gitub cli:
					<pre>
						<CodeLine>
							<CodeVar>gh</CodeVar>
							<CodeArg> auth</CodeArg>
							<CodeArg> login</CodeArg>
						</CodeLine>
					</pre>
				</li>

				<li className="task-list-item">
					<input type="checkbox" /> Install jetbrains-toolbox
					<pre>
						<CodeLine>
							<CodeVar>yay</CodeVar>
							<CodeArg> jetbrains-toolbox</CodeArg>
						</CodeLine>
					</pre>
				</li>

				<li className="task-list-item">
					<input type="checkbox" /> Launch it, login, disable run on startup, install IDEs
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Install telegram:
					<pre>
						<CodeLine>
							<CodeVar>yay</CodeVar>
							<CodeArg> telegram-desktop</CodeArg>
						</CodeLine>
					</pre>
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Add compact density in firefox: go to{" "}
					<code>about:config</code> and enable <code>browser.compactmode.show</code>
				</li>
				<li className="task-list-item">
					<input type="checkbox" /> Login and personalize firefox
				</li>
			</ol>
			<p>Aaaand you're more or less done.</p>
		</>
	);
}

const gitconfig = `[user]
	name = Arseny Garelyshev
	email = monstrag@gmail.com
[core]
	editor = micro
[column]
	ui = auto
[tag]
	sort = version:refname
[init]
	defaultBranch = main
[diff]
	algorithm = histogram
	colorMoved = plain
	mnemonicPrefix = true
	renames = true
[push]
	autoSetupRemote = true
	followTags = true
[fetch]
	prune = true
	pruneTags = true
	all = true
[commit]
	verbose = true
`;
