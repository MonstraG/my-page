import { createStateContext } from "@/functions/createSimpleContext";

const context = createStateContext<number | undefined>(undefined);

export const DistributionSyncContextProvider = context.Provider;

export const useDistributionSyncContext = context.useContextHook;
