"use client";
import { createContext } from "react";

export interface MyFormState<TSchema extends object> {
	defaultValues: Partial<Record<keyof TSchema, TSchema[keyof TSchema] | undefined>>;
	error?: string;
	errors?: Partial<Record<keyof TSchema, string>>;
}

export interface MyFormContextType<TSchema extends object> {
	state: MyFormState<TSchema> | undefined;
	isPending: boolean;
}

export const MyFormContext = createContext<MyFormContextType<never> | null>(null);
