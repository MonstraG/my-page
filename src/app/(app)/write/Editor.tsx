"use client";
import { FC, useCallback, useEffect, useRef } from "react";
import styles from "@/app/(app)/write/Page.module.scss";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import HeaderTool from "@editorjs/header";
import RawTool from "@editorjs/raw";
import QuoteTool from "@editorjs/quote";
import ListTool from "@editorjs/list";
import ChecklistTool from "@editorjs/checklist";
import InlineCodeTool from "@editorjs/inline-code";
import CodeTool from "@editorjs/code";
import TableTool from "@editorjs/table";

const renderValueInEditor = (value: string | undefined, instance: EditorJS | null) => {
	try {
		if (!value || !instance) {
			return;
		}
		const parsed = JSON.parse(value) as OutputData | undefined;
		if (!parsed) {
			return;
		}
		void instance.render(parsed);
	} catch (ignored) {
		/* ignored */
	}
};

interface Props {
	value: string | undefined;
	setValue: (newValue: string | undefined) => void;
}

const Editor: FC<Props> = ({ value, setValue }) => {
	const editorContainer = useRef<HTMLDivElement | null>(null); // create a ref to hold the div reference
	const editorInstance = useRef<EditorJS | null>(null); // an instance to hold EditorJs instance
	const initialValue = useRef<string | undefined>(value);

	const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const save = useCallback(() => {
		if (editorInstance.current == null) return;

		editorInstance.current
			.save()
			.then((data) => {
				setValue(JSON.stringify(data));
			})
			.catch((err) => {
				console.error(err);
			});
	}, [setValue]);

	useEffect(() => {
		if (editorContainer.current && !editorInstance.current) {
			editorInstance.current = new EditorJS({
				holder: editorContainer.current,
				autofocus: true,
				placeholder: "Start writing here",
				tools: {
					header: HeaderTool,
					raw: RawTool,
					quote: QuoteTool,
					list: ListTool,
					checklist: ChecklistTool,
					table: {
						class: TableTool,
						config: {
							withHeadings: true
						}
					},
					code: {
						class: CodeTool,
						config: {
							placeholder: "Leet code"
						}
					},
					inlineCode: {
						class: InlineCodeTool,
						shortcut: "CMD+SHIFT+M"
					}
				},
				onReady() {
					renderValueInEditor(initialValue.current, editorInstance.current);
				},
				onChange() {
					if (saveTimeout.current) {
						clearTimeout(saveTimeout.current);
					}
					saveTimeout.current = setTimeout(() => {
						save();
					}, 5000);
				}
			});
		}

		return () => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (editorInstance.current?.destroy) {
				editorInstance.current.destroy();
				editorInstance.current = null;
			}
		};
	}, [save]);

	useEffect(() => {
		if (editorInstance.current?.isReady) {
			renderValueInEditor(value, editorInstance.current);
		}
	}, [value]);

	useEffect(() => {
		function saveHotkey(e: KeyboardEvent) {
			if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();

				if (saveTimeout.current) {
					clearTimeout(saveTimeout.current);
				}

				save();
			}
		}

		window.addEventListener("keydown", saveHotkey);
		return () => {
			window.removeEventListener("keydown", saveHotkey);
		};
	}, [save]);

	return <div ref={editorContainer} className={styles.editorContainer} />;
};

export default Editor;