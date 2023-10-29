import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface ResourcesState {
	resources: string[];
	remember: (resource: string) => void;
}

export const useResourcesStore = create<ResourcesState>()(
	devtools(
		persist(
			(set) => ({
				resources: ["copper ore"],
				remember: (resource: string) => {
					set((state) => ({ resources: [...new Set([...state.resources, resource])] }));
				}
			}),
			{
				name: "resources"
			}
		)
	)
);
