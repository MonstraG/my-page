"use client";
import { type ReactElement, type ReactNode, useActionState } from "react";
import {
	MyFormContext,
	type MyFormContextType,
	type MyFormState,
} from "@/components/Form/MyFormContext";
import { Paragraph } from "@/ui/Paragraph/Paragraph";

export const MyForm = <TSchema extends object, TState extends MyFormState<TSchema>>({
	initialState,
	action,
	children,
}: {
	initialState: Awaited<TState> | undefined;
	action: (state: TState | undefined, formData: FormData) => Promise<TState>;
	children: ReactNode;
}): ReactElement => {
	const [state, formAction, isPending] = useActionState<TState | undefined, FormData>(
		action,
		initialState,
	);

	return (
		<form action={formAction} aria-disabled={isPending}>
			{state?.error && (
				<h2>
					<Paragraph color="error" component="span">
						{state.error}
					</Paragraph>
				</h2>
			)}

			<MyFormContext.Provider value={{ state, isPending } as MyFormContextType<never>}>
				{children}
			</MyFormContext.Provider>
		</form>
	);
};
