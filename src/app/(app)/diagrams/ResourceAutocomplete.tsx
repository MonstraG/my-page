import type { FC } from "react";
import Autocomplete, { createFilterOptions } from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { useMemo } from "react";
import { Add } from "@mui/icons-material";
import { useResourcesStore } from "@/app/(app)/diagrams/resources";

const filter = createFilterOptions<ResourceOption>();

interface ResourceOption {
	title: string;
	inputValue?: string;
}

const optionEquality = (a: ResourceOption, b: ResourceOption) => a.title === b.title;

interface Props {
	value: string;
	onChange: (resource: string) => void;
	disabled?: boolean | undefined;
}

/**
 * https://mui.com/joy-ui/react-autocomplete/#users-created-option
 */
export const ResourceAutocomplete: FC<Props> = ({ value, onChange, disabled }) => {
	const resourcesStore = useResourcesStore();
	const options: ResourceOption[] = useMemo(
		() => resourcesStore.resources.map((r) => ({ title: r })),
		[resourcesStore]
	);

	return (
		<Autocomplete
			value={{ title: value }}
			onChange={(_, newValue) => {
				if (typeof newValue === "string") {
					onChange(newValue);
				} else if (newValue?.inputValue) {
					// Create a new value from the user input
					onChange(newValue.inputValue);
				} else {
					onChange(newValue?.title ?? "");
				}
			}}
			isOptionEqualToValue={optionEquality}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				const { inputValue } = params;
				// Suggest the creation of a new value
				const isExisting = options.some((option) => inputValue === option.title);
				if (inputValue !== "" && !isExisting) {
					filtered.push({
						inputValue,
						title: `Add "${inputValue}"`
					});
				}

				return filtered;
			}}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			freeSolo
			options={options}
			getOptionLabel={(option) => {
				// Value selected with enter, right from the input
				if (typeof option === "string") {
					return option;
				}
				// Add "xxx" option created dynamically
				if (option.inputValue) {
					return option.inputValue;
				}
				// Regular option
				return option.title;
			}}
			renderOption={(props, option) => {
				const key = "key" in props ? (props.key as string) : option.title;
				return (
					<AutocompleteOption {...props} key={key}>
						{option.inputValue && (
							<ListItemDecorator>
								<Add />
							</ListItemDecorator>
						)}

						{option.title}
					</AutocompleteOption>
				);
			}}
			placeholder="Resource"
			disabled={Boolean(disabled)}
		/>
	);
};
