// https://github.com/vercel/next.js/discussions/49415#discussioncomment-10388757
export const evilHtmlLangHack = {
	lang: "en"
};

export const setHtmlLangHack = (lang: string) => {
	// @eslint-disable-next-line react-compiler -- https://github.com/vercel/next.js/discussions/49415#discussioncomment-10388757
	evilHtmlLangHack.lang = lang;
};
