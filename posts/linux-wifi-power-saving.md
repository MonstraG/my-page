---
{
    "title": "Linux Wi-Fi power saving",
    "slug": "linux-wifi-power-saving",
    "date": "2025-04-14",
    "categories": ["Programming"]
}
---

I'm on Endeavor OS (recommend, except switch theme to default), and recently, I noticed that if I ping google, I get sort-of ladder of ping times:

```
$ ping 8.8.8.8                       
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=57 time=15.8 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=57 time=21.4 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=57 time=85.6 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=57 time=41.0 ms
64 bytes from 8.8.8.8: icmp_seq=5 ttl=57 time=28.4 ms
64 bytes from 8.8.8.8: icmp_seq=6 ttl=57 time=50.7 ms
64 bytes from 8.8.8.8: icmp_seq=7 ttl=57 time=72.7 ms
64 bytes from 8.8.8.8: icmp_seq=8 ttl=57 time=94.6 ms
64 bytes from 8.8.8.8: icmp_seq=9 ttl=57 time=117 ms
```

See how it rises up? That was very weird. At some points the ping would even timeout. Similar effect would be noticeable in voice calls or games. Eventually, I found out that it was `power_save`.

Even though I'm on a PC, not a laptop, power saving was still enabled (and it is enabled by default in most distros it seems) in NetworkManager.

To check if you have it enabled or disabled you need to run:

```shell
sudo iw dev wlan0 get power_save
```

It'll report `Power save: on` if it's enabled.

But, I didn't have `iw` installed, so I had to first do `yay iw` (consult your distro for appropriate installation instructions).

To then disable it, you need to run:

```shell
sudo iw dev wlan0 set power_save off
```

Changes are applied immediately, so, getting it again, you should see `Power save: off`. And the ping test reports:

```
$ ping 8.8.8.8                        
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=57 time=16.2 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=57 time=15.9 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=57 time=15.7 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=57 time=16.2 ms
64 bytes from 8.8.8.8: icmp_seq=5 ttl=57 time=15.9 ms
```

Much better. But, changes are not persistent. Appropriate googling terms will probably get you [How to turn off Wireless power management permanently](https://unix.stackexchange.com/questions/269661/how-to-turn-off-wireless-power-management-permanently) on unix.stackexchange, with a bunch of solutions, and I liked [one](https://unix.stackexchange.com/a/315400) of them the most:

> 1. Open `/etc/NetworkManager/conf.d/default-wifi-powersave-on.conf`
> 2. add/modify it so that `wifi.powersave` is `2`:
>
> ```
> [connection]
> wifi.powersave = 2
> ```

Thanks, @Niko!

That's it, reboot and everything is cool.
