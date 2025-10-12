import { FormControl } from "@/ui/FormControl/FormControl";
import { MyLink } from "@/ui/MyLink/MyLink";
import type { FC } from "react";
import { PasswordFormControl } from "@/components/auth/PasswordFormControl";
import { MyForm } from "@/components/Form/MyForm";
import { Button } from "@/ui/Button/Button";
import type { MyFormState } from "@/components/Form/MyFormContext";

function formDataGetString(formData: FormData, key: string): string | undefined {
	const value = formData.get(key);
	if (!value) {
		return undefined;
	}
	if (typeof value !== "string") {
		return undefined;
	}
	return value;
}

interface Schema {
	username: string;
	password: string;
}

async function loginAction(
	_state: MyFormState<Schema> | undefined,
	formData: FormData,
): Promise<MyFormState<Schema>> {
	"use server";
	const username = formDataGetString(formData, "username");
	const password = formDataGetString(formData, "password");

	return {
		defaultValues: {
			username: username,
		},
		error: "Not implemented",
		errors: {
			password: "bad!",
		},
	};
}

export const LoginForm: FC = () => (
	<MyForm initialState={undefined} action={loginAction}>
		<FormControl label="Username" type="text" name="username" required />

		<PasswordFormControl label="Password" name="password" required />

		<Button type="submit">Login</Button>

		<MyLink href="/forgot-password">Forgot password?</MyLink>
	</MyForm>
);
