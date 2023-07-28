import type { FC, PropsWithChildren } from "react";

export type FCC<T = NonNullable<unknown>> = FC<PropsWithChildren<T>>;
