const dataOpenMarker = "---\n";
const dataCloseMarker = "\n---\n";

export interface PostMetadata {
	title: string;
	slug: string;
	date: string;
	image?: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
}

export interface ParsedMarkdownPost {
	metadata: PostMetadata | undefined;
	content: string;
}

export const serializeMarkdownData = (data: Record<string, unknown>, content: string): string => {
	return `${dataOpenMarker}${JSON.stringify(data)}${dataCloseMarker}${content}`;
};

export const parseMarkdownData = (markdown: string): ParsedMarkdownPost => {
	const normalizedMarkdown = markdown.replaceAll("\r\n", "\n").trim();
	const parsed = parse(normalizedMarkdown);
	if (parsed == null) {
		return { metadata: undefined, content: markdown };
	}

	return parsed;
};

const parse = (markdown: string): ParsedMarkdownPost | null => {
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
			metadata: JSON.parse(dataBlock) as PostMetadata,
			content: contentBlock,
		};
	} catch (error) {
		console.error("Failed to parse markdown file data block", dataBlock, error);
		return null;
	}
};
