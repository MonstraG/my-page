import { FC, useEffect, useId, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

interface Props {
	value?: OutputData;
}

export const Editable: FC<Props> = () => {
	const id = useId();

	const editor = useRef<EditorJS | null>(null);

	useEffect(() => {
		editor.current = new EditorJS({
			holder: id,
			autofocus: true,
			placeholder: "Start writing here",
			tools: {
				// ... your tools
			},
			onReady: function () {
				console.log("onReady");
			},
			onChange: function (api, event) {
				console.log("something changed", event);
			}
		});

		return () => {
			if (editor.current?.destroy) {
				editor.current.destroy();
			}
		};
	}, [id]);

	return <div id={id} />;
};
