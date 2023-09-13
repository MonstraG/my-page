import { FC, useEffect, useId, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

interface Props {
	value?: OutputData;
}

export const Editable: FC<Props> = () => {
	const id = useId();

	const editor = useRef<EditorJS>(
		new EditorJS({
			holder: id,
			autofocus: true,
			placeholder: "Start writing here",
			tools: {
				// ... your tools
			},
			onReady: function () {
				console.log("onReady");
				console.log(editor.current);
			},
			onChange: function (api, event) {
				console.log("something changed", event);
			}
		})
	);

	useEffect(() => {
		const reference = editor.current;
		return () => {
			// types lie, initially editor has only `isReady`.
			// eslint-disable-next-line
			if (reference.destroy) {
				reference.destroy();
			}
		};
	}, []);

	return <div id={id} />;
};
