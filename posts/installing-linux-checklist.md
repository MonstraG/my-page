---
{
    "title": "Installing linux checklist",
    "slug": "installing-linux-checklist",
    "date": "2025-06-18",
    "categories": ["Linux"]
}
---

This is my personal checklist for installing Endeavor OS on a new machine.

## Installation

1. [ ] Create new [Ventoy](https://www.ventoy.net/en/index.html) usb drive if don't have one
2. [ ] Check if there is new release on the [Endeavor OS website](https://endeavouros.com)
3. [ ] Put the the ISO, avatar.jpg and wallpaper.jpg (and/or other files you might need, like configs) on the drive
4. [ ] Put the drive in the machine, reboot and choose the drive as boot media
5. [ ] Log in into Wi-Fi
6. [ ] Start installer
7. [ ] Pick American English as language
8. [ ] Select Plasma KDE desktop
9. [ ] Reboot into the actual system
10. [ ] Mount the USB drive and copy other files from drive to the disk
11. [ ] Unmount USB and unplug it

## Settings / Personalization

1. [ ] Adjust display Scale
2. [ ] Disable Mouse acceleration
3. [ ] Switch Global theme from godawful EndeavourOS to plain Breeze Dark
4. [ ] Enable Night light
5. [ ] Change Region & Language settings to preferred, like Language: American English and norsk bokmål for everything else. You might wanna enable the locale in `/etc/locale-gen` and run `locale-gen`, see more on [locale page on arch wiki](https://wiki.archlinux.org/title/Locale)
6. [ ] Reboot after changing language settings
7. [ ] (if it's a laptop) Set charge limits in Power Management > Advanced Power settings
8. [ ] Set profile picture for your profile
9. [ ] Set wallpaper in Login screen (SDDM)
10. [ ] Set wallpaper everywhere else by right-clicking the file
11. [ ] Change cursor size to 36 in Colors & Themes > Global Theme > Cursors
12. [ ] Disable bell in Accessibility > System bell > Audible bell
13. [ ] Enable cursor shake in Accessibility > Shake Cursor and magnification as high as it can go, it's hilarious!
14. [ ] Disable hot corner in Screen Edges
15. [ ] Add desired keyboard layouts (don't forget to change the shortcut)
16. [ ] Enable compose key in Keyboard > Key Bindings
17. [ ] Launch Spectacle and configure saving to clipboard and folder
18. [ ] Change home Wi-Fi firewall group to trusted
19. [ ] Disable "Do not disturb" on fullscreen apps

## Taskbar:

1. [ ] Remove margin spacer thing
2. [ ] Add Weather Report plugin on the panel
3. [ ] Set Show temperature in the plugin
4. [ ] Set Show battery percentage on icon (if it's a laptop)
5. [ ] Configure digital clock: ISO date, always show seconds, show week numbers

## Configs, tweaks and installs

1. [ ] Install [oh-my-zsh](https://ohmyz.sh/):

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

2. [ ] Reboot for it to become default
3. [ ] Install [micro](https://micro-editor.github.io/):

```shell
yay micro
```

4. [ ] Install wl-clipboard (for copy-pasting in micro):

```shell
yay wl-clipboard
```

5. [ ] Disable [Wi-Fi power save](/blog/linux-wifi-power-saving):

```shell
yay iw
sudo micro /etc/NetworkManager/conf.d/default-wifi-powersave-on.conf

# write this:
[connection]
wifi.powersave = 2
```

6. [ ] Enable [REISUB](/blog/recovering-from-freeze-with-reisub):

```shell
sudo micro /etc/sysctl.d/99-sysctl.con

# write this
kernel.sysrq = 1
```

7. [ ] Put in .gitconfig:

```.gitconfig
[user]
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
```

8. [ ] Install github-cli:

```shell
yay github-cli
```

9. [ ] Login in gitub cli:

```shell
gh auth login
```

10. [ ] Install jetbrains-toolbox

```shell
yay jetbrains-toolbox
```

11. [ ] Launch it, login, disable run on startup, install IDEs
12. [ ] Install telegram:

```shell
yay telegram-desktop
```

13. [ ] Add compact density in firefox: go to `about:config` and enable `browser.compactmode.show`
14. [ ] Login and personalize firefox

Aaaand you're more or less done.
