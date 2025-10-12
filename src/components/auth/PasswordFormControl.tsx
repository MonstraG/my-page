"use client";
import { type ReactElement, useState } from "react";
import { FormControl, type FormControlProps } from "@/ui/FormControl/FormControl";
import { VisibilityOffIcon } from "@/icons/material/VisibilityOffIcon";
import { VisibilityIcon } from "@/icons/material/VisibilityIcon";

export function PasswordFormControl<TShape extends object>(
	props: Omit<FormControlProps<TShape>, "type" | "endDecorator">,
): ReactElement {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	return (
		<FormControl
			type={passwordVisible ? "text" : "password"}
			endDecorator={
				<button type="button" onClick={() => setPasswordVisible((p) => !p)}>
					{passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
				</button>
			}
			{...props}
		/>
	);
}
