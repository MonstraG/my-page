import { FC, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

interface Props {
	value?: OutputData;
}

export const Editable: FC<Props> = () => {
	const editorContainer = useRef<HTMLDivElement | null>(null); // create a ref to hold the div reference
	const editorInstance = useRef<EditorJS | null>(null); // an instance to hold EditorJs instance

	useEffect(() => {
		if (editorContainer.current && !editorInstance.current) {
			editorInstance.current = new EditorJS({
				holder: editorContainer.current,
				autofocus: true,
				placeholder: "Start writing here",
				tools: {
					// ... your tools
				},
				onReady: function () {
					console.log("onReady");
					console.log(editorInstance.current);
				},
				onChange: function (api, event) {
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

	return <div ref={editorContainer} />;
};
