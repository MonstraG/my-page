import { type FC } from "react";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import JoyLink from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";

const exampleWireguardConfig = `
[Interface]
PrivateKey = 713Hl9...
Address = 10.0.0.1/32
DNS = 8.8.8.8

[Peer]
PublicKey = 0PqOoZE9x....
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = your.server.ip.address:51820
PersistentKeepalive = 25
`;

const IdeasSomebodyAlreadyMadePage: FC = () => (
	<Container maxWidth="md">
		<Typography level="h1" gutterBottom>
			Ideas somebody already made
		</Typography>

		<Stack gap={4}>
			<Typography>
				You know how you have a great idea, and you start googling around, maybe even start
				making it, creating a repo, spending hours and days on it and then you suddenly
				stumble over a repo of somebody else who did exactly the same thing as you wanted?
			</Typography>

			<section>
				<Typography level="h2" gutterBottom>
					XKCD: Things you should not do
				</Typography>
				<Image
					src="https://imgs.xkcd.com/comics/things_you_should_not_do.png"
					alt="xkcd things you should not do comic"
					width={436}
					height={738}
				/>
				<Typography>
					Randall Munroe, author of an excellent &quot;blog&quot;{" "}
					<JoyLink href="https://what-if.xkcd.com/">what-if</JoyLink> has come up with
					this joke list of things you should not do in his (at the time of writing)
					latest book, <JoyLink href="https://xkcd.com/what-if-2/">what if? 2</JoyLink>.
				</Typography>
				<Typography>
					Now, I bought the book and came across the list in the book and found it very
					amusing to have a list like that on here. I would need to think about where to
					get more entries from, maybe there are more pieces online?..
				</Typography>
				<Typography>
					6th link in google:{" "}
					<JoyLink href="https://thriving-kitten-e80056.netlify.app">
						https://thriving-kitten-e80056.netlify.app
					</JoyLink>
				</Typography>
				<Typography>...</Typography>
				<Typography>
					Of course somebody already made AI-generated, every-day-updated version of this
					very list.
				</Typography>
			</section>

			<section>
				<Typography level="h2" gutterBottom>
					WireGuard config manager
				</Typography>
				<Image
					src="https://user-images.githubusercontent.com/994900/218720566-e5b3ab22-d7fc-4df7-a777-ad9b6280ada8.png"
					alt="WireGuard config manager interface"
					width={603}
					height={432}
				/>
				<Typography>
					I come from a country, where, in recent times, it became fairly important to
					have a VPN.asda dasdkasdasldasdlaksdkasdlaksdlaksdlaksdasdasd
				</Typography>
				<Typography>
					The best VPN we ever managed to set up was{" "}
					<JoyLink href="https://www.wireguard.com/">WireGuard</JoyLink>, where you
					purchase a server, install it, and then you need to set up client
					configurations, that look like this:
				</Typography>
				<pre>{exampleWireguardConfig}</pre>
				<Typography>
					So every time you add a new client (like new PC/laptop/phone for yourself or a
					friend), you would generate a pair of keys and write a config and send that to
					the friend. (and also a similar but much smaller [Peer] configuration that you
					would save in server&apos;s config.
				</Typography>
				<Typography>
					After you do that 10 times in a row, you would want to have a handy tool to
					automate most of the job. The tool will run on the server, so it would be a CLI
					app, and can be small and quick. Great choice for a Golang application. Also
					there is this cli-gui-interface library,{" "}
					<JoyLink href="https://github.com/charmbracelet/bubbletea">Bubble tea</JoyLink>
					so that you can even hook up a gui for this cli app.
				</Typography>
				<Typography>
					<JoyLink href="https://github.com/AndrianBdn/wg-cmd">WG Commander</JoyLink> -
					TUI for managing WireGuard configuration files.
				</Typography>
				<Typography>
					And the worst part is, after you created those 10 clients, you stop, you
					don&apos;t need any more, so even if I finished making the tool, I wouldn&apos;t
					really use it.
				</Typography>
			</section>
		</Stack>
	</Container>
);

export default IdeasSomebodyAlreadyMadePage;
