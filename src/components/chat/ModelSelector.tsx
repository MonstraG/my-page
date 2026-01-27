import type { Dispatch, FC, SetStateAction } from "react";
import { Select } from "@/ui/Select/Select.tsx";
import { ListItemButton } from "@/ui/ListItemLink/ListItemLink.tsx";
import { Field } from "@/ui/Field/Field.tsx";

interface Props {
	models: string[];
	selectedModel: string | undefined;
	setSelectedModel: Dispatch<SetStateAction<string | undefined>>;
}

export const ModelSelector: FC<Props> = ({ models, selectedModel, setSelectedModel }) => (
	<Field label="Model">
		<Select placeholder={selectedModel ?? "Select a model"}>
			{models.map((model) => (
				<ListItemButton
					key={model}
					active={selectedModel === model}
					size="sm"
					onClick={() => setSelectedModel(model)}
				>
					{model}
				</ListItemButton>
			))}
		</Select>
	</Field>
);
