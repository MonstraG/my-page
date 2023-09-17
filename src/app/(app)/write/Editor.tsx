"use client";
import { FC, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import LinkTool from "@editorjs/link";
import HeaderTool from "@editorjs/header";
import RawTool from "@editorjs/raw";
import QuoteTool from "@editorjs/quote";
import ListTool from "@editorjs/list";
import ChecklistTool from "@editorjs/checklist";

const Editor: FC = () => {
	const editorContainer = useRef<HTMLDivElement | null>(null); // create a ref to hold the div reference
	const editorInstance = useRef<EditorJS | null>(null); // an instance to hold EditorJs instance

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
					console.log("onReady");
				},
				onChange: function (_api, event) {
					console.log("something changed", event);
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

	return <div ref={editorContainer} style={{ width: "100%" }} />;
};

export default Editor;
