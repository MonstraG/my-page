import { createStateContext } from "@/functions/createSimpleContext.tsx";

const context = createStateContext<number | undefined>(undefined);

export const DistributionSyncContextProvider = context.Provider;

export const useDistributionSyncContext = context.useContextHook;
