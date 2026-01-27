"use client";
import type { Dispatch, FC, SetStateAction } from "react";
import { ModelSelector } from "@/components/chat/ModelSelector.tsx";
import { Stack } from "@/ui/Stack/Stack.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import { SettingsIcon } from "@/icons/material/SetingsFilledIcon.tsx";
import { Dialog } from "@/ui/Dialog/Dialog.tsx";
import { type DialogControl, useDialogControl } from "@/ui/Dialog/useDialogControl.ts";
import { Field } from "@/ui/Field/Field.tsx";
import { Textarea } from "@/ui/Textarea/Textarea.tsx";
import { useSystemPrompt } from "@/components/chat/useSystemPrompt.tsx";

interface Props {
	models: string[];
	selectedModel: string | undefined;
	setSelectedModel: Dispatch<SetStateAction<string | undefined>>;
}

export const ChatSettingsSection: FC<Props> = ({ models, selectedModel, setSelectedModel }) => {
	const dialogControl = useDialogControl();

	return (
		<Stack direction="row" gap={1} style={{ alignItems: "end" }} component="section">
			<ModelSelector
				models={models}
				selectedModel={selectedModel}
				setSelectedModel={setSelectedModel}
			/>
			<Button square onClick={dialogControl.handleOpen}>
				<SettingsIcon />
			</Button>

			<EditPromptDialog dialogControl={dialogControl} />
		</Stack>
	);
};

const EditPromptDialog: FC<{
	dialogControl: DialogControl;
}> = ({ dialogControl }) => {
	const [systemPrompt, setSystemPrompt] = useSystemPrompt();
	const fieldName = "system prompt";

	const handleSubmit = (formData: FormData) => {
		const value = formData.get(fieldName)?.toString() ?? "";
		setSystemPrompt(value);
		dialogControl.handleClose();
	};

	return (
		<Dialog isOpen={dialogControl.isOpen} close={dialogControl.handleClose}>
			<form action={handleSubmit}>
				<Field label="System prompt">
					<Textarea
						placeholder="No mistakes"
						name={fieldName}
						rows={6}
						defaultValue={systemPrompt}
					/>
				</Field>

				<Stack
					direction="row"
					gap={1}
					style={{ width: "100%", justifyContent: "flex-end", paddingTop: "1rem" }}
				>
					<Button type="button" onClick={dialogControl.handleClose}>
						Cancel
					</Button>
					<Button type="submit">Save & Close</Button>
				</Stack>
			</form>
		</Dialog>
	);
};
