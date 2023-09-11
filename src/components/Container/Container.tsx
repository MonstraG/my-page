import type { FC, HTMLAttributes } from "react";
import styles from "@/components/Container/Container.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Container: FC<Props> = (props) => <div className={styles.container} {...props} />;
