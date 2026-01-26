import {
	createContext,
	type Dispatch,
	type FC,
	type ReactNode,
	type SetStateAction,
	useContext,
	useState,
} from "react";

export function createStateContext<T>(defaultValue: T) {
	const StateContext = createContext<{
		value: T;
		setValue: Dispatch<SetStateAction<T>>;
	} | null>(null);

	const StateContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
		const [value, setValue] = useState<T>(defaultValue);

		return (
			<StateContext.Provider value={{ value, setValue }}>{children}</StateContext.Provider>
		);
	};

	function useStateContext() {
		const context = useContext(StateContext);
		if (context == null) {
			throw new Error(`Not inside SpellSortContext`);
		}

		return context;
	}

	return {
		context: StateContext,
		Provider: StateContextProvider,
		useContextHook: useStateContext,
	};
}
