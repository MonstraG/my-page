---
{
    "title": "WireGuard config manager",
    "slug": "wireguard-config-manager",
    "date": "2024-04-26",
    "image": {
        "src": "/wg-cmd-screenshot.webp",
        "alt": "WireGuard config manager interface",
        "width": 603,
        "height": 432
    },
    "categories": ["Ideas somebody already made"]
}
---

I come from a country, where, in recent times, it became fairly important to have a VPN.

The best VPN we ever managed to set up was [WireGuard](https://www.wireguard.com), where you purchase a server,
install it, and then you need to set up client configurations, that look like this:

```txt
[Interface]
PrivateKey = 713Hl9...
Address = 10.0.0.1/32
DNS = 8.8.8.8

[Peer]
PublicKey = 0PqOoZE9x....
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = your.server.ip.address:51820
PersistentKeepalive = 25
```

So every time you add a new client (like a new PC/laptop/phone for yourself or a friend), you would generate a pair of keys and write a config and send that to
the friend. (and also a similar but much smaller `[Peer]` configuration that you would save in server's config.

After you do that 10 times in a row, you would want to have a handy tool to automate most of the job.
The tool will run on the server, so it would be a CLI app, and can be small and quick.
Great choice for a Golang application. Also, there is this cli-gui-interface library,
[Bubble tea](https://github.com/charmbracelet/bubbletea) so that you can even hook up a gui for this cli app.

So you start writing the tool, parse the configs, display the peers in a table, and then stumble onto this:

[WG Commander](https://github.com/AndrianBdn/wg-cmd) - TUI for managing WireGuard configuration files.

WireGuard? Check. Config manager? Check. Golang? Check. TUI? Check.

And the worst part is, after you created those 10 clients, you stop.
You don't need any more: all your phones, laptops and friends are set up.
So, even if I finished making the tool, I wouldn't use it.
