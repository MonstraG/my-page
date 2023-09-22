// https://github.com/codex-team/editor.js/issues/900#issuecomment-915300903
declare module "@editorjs/header" {
	import { BlockTool } from "@editorjs/editorjs";

	export default class HeaderTool implements BlockTool {
		save(block: HTMLDivElement);
		render(): HTMLElement;
	}
}

declare module "@editorjs/raw" {
	import { BlockTool } from "@editorjs/editorjs";

	export default class RawTool implements BlockTool {
		save(block: HTMLDivElement);
		render(): HTMLElement;
	}
}

declare module "@editorjs/quote" {
	import { BlockTool } from "@editorjs/editorjs";

	export default class QuoteTool implements BlockTool {
		save(block: HTMLDivElement);
		render(): HTMLElement;
	}
}

declare module "@editorjs/list" {
	import { BlockTool } from "@editorjs/editorjs";

	export default class ListTool implements BlockTool {
		save(block: HTMLDivElement);
		render(): HTMLElement;
	}
}

declare module "@editorjs/checklist" {
	import { BlockTool } from "@editorjs/editorjs";

	export default class ChecklistTool implements BlockTool {
		save(block: HTMLDivElement);
		render(): HTMLElement;
	}
}

declare module "@editorjs/inline-code" {
	import { BlockTool } from "@editorjs/editorjs";

	export default class InlineCodeTool implements BlockTool {
		save(block: HTMLDivElement);
		render(): HTMLElement;
	}
}

declare module "@editorjs/code" {
	import { BlockTool } from "@editorjs/editorjs";

	export default class CodeTool implements BlockTool {
		save(block: HTMLDivElement);
		render(): HTMLElement;
	}
}

declare module "@editorjs/table" {
	import { BlockTool } from "@editorjs/editorjs";

	export default class TableTool implements BlockTool {
		save(block: HTMLDivElement);
		render(): HTMLElement;
	}
}
