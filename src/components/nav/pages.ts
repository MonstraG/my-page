import { D20Icon } from "@/icons/custom/D20Icon";
import { GithubIcon } from "@/icons/custom/GithubIcon";
import type { SvgIcon } from "@/icons/icon.type";
import { CasinoIcon } from "@/icons/material/CasinoIcon";
import { DictionaryIcon } from "@/icons/material/DictionaryIcon";
import { HomeFilledIcon } from "@/icons/material/HomeFilledIcon";
import { NewsIcon } from "@/icons/material/NewsIcon";
import type { Metadata, Route } from "next";
import { ChatBubbleIcon } from "@/icons/material/ChatBubbleIcon";
import { AccountTreeIcon } from "@/icons/material/AccountTreeIcon";
import { VideocamIcon } from "@/icons/material/VideocamIcon.tsx";
import { SettingsFilledIcon } from "@/icons/material/SettingsFilledIcon";

interface Page {
	title: string;
	href: Route | undefined;
	Icon: SvgIcon;
	description: string;
	ignoreOnHome?: boolean;
}

const home: Page = {
	title: "Home",
	href: "/",
	Icon: HomeFilledIcon,
	description: "Random tools I managed to make",
	ignoreOnHome: true,
};

const diceRolling: Page = {
	title: "Dice rolling",
	href: "/dice",
	Icon: CasinoIcon,
	description: "Have you wondered how does the 4d6 distribution look like?",
};

const dndSpells: Page = {
	title: "DnD spells",
	href: "/dndSpells",
	Icon: D20Icon,
	description: "Browse and search across all standard 5.5e DnD spells without page loads",
};
const vocabularyTester: Page = {
	title: "Vocabulary tester",
	href: "/words/en" as Route,
	Icon: DictionaryIcon,
	description: "Check your vocabulary, and find the most common word you don't yet know",
};

const blog: Page = {
	title: "Blog thing",
	href: "/blog",
	Icon: NewsIcon,
	description: "Read like 3 short articles because everyone has a markdown blog",
};

const me: Page = {
	title: "Me",
	href: "/about",
	Icon: GithubIcon,
	description: "See if my github API thingie still runs",
};

const video: Page = {
	title: "Video",
	href: "/video",
	Icon: VideocamIcon,
	description: "P2P video conference",
};

const myGpt: Page = {
	title: "MyGPT",
	href: "/myGpt",
	Icon: ChatBubbleIcon,
	description: "A frontend for an OpenAI-compatible LLM, you need to provide the server",
};

const windowBrowser: Page = {
	title: "Window browser",
	href: "/windowBrowser",
	Icon: AccountTreeIcon,
	description: "Browse your window object",
};

const test: Page = {
	title: "Test",
	href: "/test",
	Icon: SettingsFilledIcon,
	description: "This page exists only to test various ui elements in local development",
	ignoreOnHome: true,
};

export const allPages = {
	home,
	diceRolling,
	dndSpells,
	vocabularyTester,
	blog,
	me,
	video,
	myGpt,
	windowBrowser,
	test,
} as const;

export function getMetadata(page: Page): Metadata {
	return {
		title: page.title,
		description: page.description,
	};
}
