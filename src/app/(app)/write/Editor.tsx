"use client";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import LinkTool from "@editorjs/link";
import HeaderTool from "@editorjs/header";
import RawTool from "@editorjs/raw";
import QuoteTool from "@editorjs/quote";
import ListTool from "@editorjs/list";
import ChecklistTool from "@editorjs/checklist";

interface Props {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

const Editor: FC<Props> = ({ value, setValue }) => {
	const editorContainer = useRef<HTMLDivElement | null>(null); // create a ref to hold the div reference
	const editorInstance = useRef<EditorJS | null>(null); // an instance to hold EditorJs instance
	const initialValue = useRef<string>(value);

	useEffect(() => {
		if (editorContainer.current && !editorInstance.current) {
			editorInstance.current = new EditorJS({
				holder: editorContainer.current,
				autofocus: true,
				placeholder: "Start writing here",
				tools: {
					header: HeaderTool,
					link: LinkTool,
					raw: RawTool,
					quote: QuoteTool,
					list: ListTool,
					checklist: ChecklistTool
				},
				onReady: function () {
					const parsed = JSON.parse(initialValue.current) as OutputData | undefined;
					if (parsed) {
						void editorInstance.current?.render(parsed);
					}
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
	}, []);

	useEffect(() => {
		if (editorInstance.current?.isReady) {
			try {
				const parsed = JSON.parse(value) as OutputData | undefined;
				if (parsed) {
					void editorInstance.current.render(parsed);
				}
			} catch (ignored) {
				/* ignored */
			}
		}
	}, [value]);

	useEffect(() => {
		const save = function (e: KeyboardEvent) {
			if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				if (editorInstance.current?.save) {
					editorInstance.current
						.save()
						.then((data) => {
							setValue(JSON.stringify(data));
						})
						.catch((err) => {
							console.error(err);
						});
				}
			}
		};

		window.addEventListener("keydown", save);
		return () => {
			window.removeEventListener("keydown", save);
		};
	}, [setValue]);

	return <div ref={editorContainer} style={{ width: "100%" }} />;
};

export default Editor;
