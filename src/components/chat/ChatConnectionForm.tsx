import { type Dispatch, type FC, type SetStateAction, useState } from "react";
import type { ChatConnection } from "@/components/chat/Chat.types.ts";
import { Stack } from "@/ui/Stack/Stack.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import { Field } from "@/ui/Field/Field.tsx";
import { Input } from "@/ui/Input/Input.tsx";

const defaultAddress = "http://192.168.10.132:1234";
const addressInput = "address";

function tryUrl(address: string): URL | undefined {
	try {
		return new URL(address);
	} catch (_) {
		return undefined;
	}
}

interface Props {
	setConnection: Dispatch<SetStateAction<ChatConnection>>;
}

export const ChatConnectionForm: FC<Props> = ({ setConnection }) => {
	const [error, setError] = useState<string | undefined>(undefined);

	const connectToServer = async (formData: FormData) => {
		setError(undefined);

		const value = formData.get(addressInput);
		if (!value || typeof value !== "string") {
			setError("Enter address");
			return;
		}

		const url = tryUrl(value);
		if (!url) {
			setError("Enter valid address");
			return;
		}

		const requestUrl = new URL(url);
		requestUrl.pathname += `v1/models`;

		return fetch(requestUrl, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((json: unknown) => {
				if (
					typeof json !== "object" ||
					json == null ||
					!("data" in json) ||
					!Array.isArray(json.data)
				) {
					throw new Error("Invalid response");
				}

				const modelIds: string[] = [];

				for (const item of json.data) {
					if (
						typeof item === "object" &&
						"id" in item &&
						typeof item.id === "string" &&
						"object" in item &&
						item.object === "model"
					) {
						modelIds.push(item.id);
					}
				}

				if (modelIds.length === 0) {
					throw new Error("No models :(");
				}

				setConnection({ ok: true, models: modelIds, url });
			})
			.catch((error) => {
				console.error(error);
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError(error.toString());
				}
				setConnection({ ok: false, models: [], url: undefined });
			});
	};

	return (
		<form action={connectToServer}>
			<Stack direction="row" gap={1} style={{ alignItems: "end", flexWrap: "wrap" }}>
				<Field label="Server address">
					<Input
						type="url"
						name={addressInput}
						placeholder={defaultAddress}
						defaultValue={defaultAddress}
						required
						invalid={Boolean(error)}
					/>
				</Field>

				<Button type="submit">Connect</Button>
			</Stack>
			{error && <p style={{ marginTop: "2px" }}>{error}</p>}
		</form>
	);
};
