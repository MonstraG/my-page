"use client";
import { use } from "react";
import { MyFormContext, type MyFormContextType } from "@/components/Form/MyFormContext";

export const useMyFormContext = <TSchema extends object>(): MyFormContextType<TSchema> => {
	const context = use(MyFormContext);
	if (context === null) {
		throw new Error("useMyFormContext must be be called in MyFormContext.Provider");
	}
	return context as MyFormContextType<TSchema>;
};
