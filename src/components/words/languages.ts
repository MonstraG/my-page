export const languages = [
	{
		iso: "en",
		label: "English",
	},
	{
		iso: "no",
		label: "Norsk",
	},
	{
		iso: "ru",
		label: "Русский",
	},
	{
		iso: "pt",
		label: "Português",
	},
	{
		iso: "es",
		label: "Español",
	},
] as const;

export type Language = (typeof languages)[number]["iso"];
