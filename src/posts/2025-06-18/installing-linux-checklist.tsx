import type { FC, ReactElement, ReactNode } from "react";
import type { Post } from "@/components/blog/post.types";
import {
	CodeArg,
	CodeCommand,
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
			<ol>
				<Check>
					Create new <a href="https://www.ventoy.net/en/index.html">Ventoy</a> usb drive
					if don't have one
				</Check>
				<Check>
					Check if there is new release on the{" "}
					<a href="https://endeavouros.com">Endeavor OS website</a>
				</Check>
				<Check>
					Put the the ISO, avatar.jpg and wallpaper.jpg (and/or other files you might
					need, like configs) on the drive
				</Check>
				<Check>
					Put the drive in the machine, reboot and choose the drive as boot media
				</Check>
				<Check>Log in into Wi-Fi</Check>
				<Check>Start installer</Check>
				<Check>Pick American English as language</Check>
				<Check>Select Plasma KDE desktop</Check>
				<Check>Reboot into the actual system</Check>
				<Check>Mount the USB drive and copy other files from drive to the disk</Check>
				<Check>Unmount USB and unplug it</Check>
			</ol>
			<h2>Settings / Personalization</h2>
			<ol>
				<Check>Adjust display Scale</Check>
				<Check>Disable Mouse acceleration</Check>
				<Check>Switch Global theme from godawful EndeavourOS to plain Breeze Dark</Check>
				<Check>Enable Night light</Check>
				<Check>
					Change Region &amp; Language settings to preferred, like Language: American
					English and norsk bokmål for everything else. You might wanna enable the locale
					in <code>/etc/locale-gen</code> and run <code>locale-gen</code>, see more on{" "}
					<a href="https://wiki.archlinux.org/title/Locale">locale page on arch wiki</a>
				</Check>
				<Check>Reboot after changing language settings</Check>
				<Check>
					(if it's a laptop) Set charge limits in Power Management &gt; Advanced Power
					settings
				</Check>
				<Check>Set profile picture for your profile</Check>
				<Check>Set wallpaper in Login screen (SDDM)</Check>
				<Check>Set wallpaper everywhere else by right-clicking the file</Check>
				<Check>
					Change cursor size to 36 in Colors &amp; Themes &gt; Global Theme &gt; Cursors
				</Check>
				<Check>Disable bell in Accessibility &gt; System bell &gt; Audible bell</Check>
				<Check>
					Enable cursor shake in Accessibility &gt; Shake Cursor and magnification as high
					as it can go, it's hilarious!
				</Check>
				<Check>Disable hot corner in Screen Edges</Check>
				<Check>Add desired keyboard layouts (don't forget to change the shortcut)</Check>
				<Check>Enable compose key in Keyboard &gt; Key Bindings</Check>
				<Check>Launch Spectacle and configure saving to clipboard and folder</Check>
				<Check>Change home Wi-Fi firewall group to trusted</Check>
				<Check>Disable "Do not disturb" on fullscreen apps</Check>
				<Check>
					Disable "Middle click: Pastes selected text" in General Behavior (requires
					restart)
				</Check>
			</ol>
			<h2>Taskbar:</h2>
			<ol>
				<Check>Remove margin spacer thing</Check>
				<Check>Add Weather Report plugin on the panel</Check>
				<Check>Set Show temperature in the plugin</Check>
				<Check>Set Show battery percentage on icon (if it's a laptop)</Check>
				<Check>
					Configure digital clock: ISO date, always show seconds, show week numbers
				</Check>
			</ol>
			<h2>Configs, tweaks and installs</h2>
			<ol>
				<Check>
					Install <a href="https://ohmyz.sh/">oh-my-zsh</a>:
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
				</Check>
				<Check>Reboot for it to become default</Check>
				<Check>
					Install <a href="https://micro-editor.github.io/">micro</a>:
					<pre>
						<CodeCommand command="yay" args="micro" />
					</pre>
				</Check>
				<Check>
					Install wl-clipboard (for copy-pasting in micro):
					<pre>
						<CodeCommand command="yay" args="wl-clipboard" />
					</pre>
				</Check>
				<Check>
					Disable <a href="/blog/linux-wifi-power-saving">Wi-Fi power save</a>:
					<pre>
						<CodeCommand command="yay" args="iw" />
						<CodeCommand
							command="sudo micro"
							args="/etc/NetworkManager/conf.d/default-wifi-powersave-on.conf"
						/>
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
				</Check>
				<Check>
					Enable <a href="/blog/recovering-from-freeze-with-reisub">REISUB</a>:
					<pre>
						<CodeCommand command="sudo micro" args="/etc/sysctl.d/99-sysctl.con" />
					</pre>
					Write this
					<pre>
						<CodeLine>
							<CodeVar>kernel.sysrq</CodeVar>
							<CodeArg> =</CodeArg>
							<CodeVal> 1</CodeVal>
						</CodeLine>
					</pre>
				</Check>
				<Check>
					Put in .gitconfig:
					<pre>{gitconfig}</pre>
				</Check>

				<Check>
					Install github-cli:
					<pre>
						<CodeCommand command="yay" args="github-cli" />
					</pre>
				</Check>

				<Check>
					Login in github-cli:
					<pre>
						<CodeCommand command="gh" args="auth login" />
					</pre>
				</Check>

				<Check>
					Install jetbrains-toolbox
					<pre>
						<CodeCommand command="yay" args="jetbrains-toolbox" />
					</pre>
				</Check>

				<Check>Launch it, login, disable run on startup, install IDEs</Check>
				<Check>
					Install telegram:
					<pre>
						<CodeCommand command="yay" args="telegram-desktop" />
					</pre>
				</Check>
				<Check>
					Add compact density in firefox: go to <code>about:config</code> and enable{" "}
					<code>browser.compactmode.show</code>
				</Check>
				<Check>Login and personalize firefox</Check>
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

const Check: FC<{ children: ReactNode }> = ({ children }) => (
	<li>
		<input type="checkbox" style={{ marginRight: "8px" }} />
		<span>{children}</span>
	</li>
);
