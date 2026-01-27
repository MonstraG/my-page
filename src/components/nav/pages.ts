import { D20Icon } from "@/icons/custom/D20Icon";
import { GithubIcon } from "@/icons/custom/GithubIcon";
import type { SvgIcon } from "@/icons/icon.type";
import { CasinoIcon } from "@/icons/material/CasinoIcon";
import { DictionaryIcon } from "@/icons/material/DictionaryIcon";
import { HomeFilledIcon } from "@/icons/material/HomeFilledIcon";
import { NewsIcon } from "@/icons/material/NewsIcon";
import type { Route } from "next";
import { ChatBubbleIcon } from "@/icons/material/ChatBubbleIcon.tsx";

interface Page {
	name: string;
	href: Route | undefined;
	slug: string;
	Icon: SvgIcon;
	description: string;
	ignoreOnHome?: boolean;
	ignoreOnNav?: boolean;
}

export const allPages: readonly Page[] = [
	{
		name: "Home",
		href: "/",
		slug: "",
		Icon: HomeFilledIcon,
		description: "",
		ignoreOnHome: true,
	},
	{
		name: "Dice rolling",
		href: "/dice",
		slug: "dice",
		Icon: CasinoIcon,
		description: "Have you wondered how does the 4d6 distribution look like?",
	},
	{
		name: "DnD spells",
		href: "/dnd-spells",
		slug: "dnd-spells",
		Icon: D20Icon,
		description: "Browse and search across all standard 5.5e DnD spells without page loads",
	},
	{
		name: "Vocabulary tester",
		href: "/words/en" as Route,
		slug: "words",
		Icon: DictionaryIcon,
		description: "Check your vocabulary, and find the most common word you don't yet know",
	},
	{
		name: "Blog thing",
		href: "/blog",
		slug: "blog",
		Icon: NewsIcon,
		description: "Read like 3 short articles because everyone has a markdown blog",
	},
	{
		name: "About (but not really)",
		href: "/about",
		slug: "about",
		Icon: GithubIcon,
		description: "See if my github API thingie still runs",
	},
	{
		name: "Video",
		href: undefined,
		slug: "video",
		Icon: GithubIcon,
		description: "COMING SOON: p2p video sessions, if google meets continues to suck",
		ignoreOnNav: true,
	},
	{
		name: "MyGPT",
		href: "/chat",
		slug: "chat",
		Icon: ChatBubbleIcon,
		description: "Just a frontend for an OpenAI-compatible LLM, you need to provide the server",
	},
];
