const dataOpenMarker = "---\n";
const dataCloseMarker = "\n---\n";

export interface ParsedMarkdown {
	data: Record<string, unknown> | undefined;
	content: string;
}

export const serializeMarkdownData = (data: Record<string, unknown>, content: string): string => {
	return `${dataOpenMarker}${JSON.stringify(data)}${dataCloseMarker}${content}`;
};

export const parseMarkdownData = (markdown: string) => {
	const normalizedMarkdown = markdown.replaceAll("\r\n", "\n").trim();
	const parsed = parse(normalizedMarkdown);
	if (parsed == null) {
		return { data: undefined, content: markdown };
	}

	return parsed;
};

const parse = (markdown: string): ParsedMarkdown | null => {
	if (markdown === "") {
		return null;
	}

	if (!markdown.startsWith(dataOpenMarker)) {
		return null;
	}

	const dataStartIndex = markdown.indexOf(dataOpenMarker);
	if (dataStartIndex < 0) {
		return null;
	}
	const dataEndIndex = markdown.indexOf(dataCloseMarker, dataStartIndex);
	if (dataEndIndex < 0) {
		return null;
	}

	const dataBlock = markdown
		.substring(dataStartIndex + dataOpenMarker.length, dataEndIndex)
		.trim();
	const contentBlock = markdown.substring(dataEndIndex + dataCloseMarker.length);

	if (dataBlock === "") {
		return null;
	}

	try {
		return {
			data: JSON.parse(dataBlock) as Record<string, unknown> | undefined,
			content: contentBlock
		};
	} catch (error) {
		console.error("Failed to parse markdown file data block", dataBlock, error);
		return null;
	}
};
