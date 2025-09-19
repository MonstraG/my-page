import styles from "./CodeElements.module.css";
import type { FCC } from "@/types/react";
import type { FC } from "react";

export const CodeVar: FCC = ({ children }) => <span className={styles.variable}>{children}</span>;

export const CodeOp: FCC = ({ children }) => <span className={styles.operator}>{children}</span>;

export const CodeOther: FCC = ({ children }) => <span className={styles.other}>{children}</span>;

export const CodeArg: FCC = ({ children }) => <span className={styles.argument}>{children}</span>;

export const CodeProp: FCC = ({ children }) => <span className={styles.property}>{children}</span>;

export const CodeComment: FCC = ({ children }) => (
	<span className={styles.comment}>{children}</span>
);

export const CodeVal: FCC = ({ children }) => <span className={styles.value}>{children}</span>;

export const CodeLine: FCC = ({ children }) => <span className={styles.line}>{children}</span>;

export const CodeCommand: FC<{ command: string; args: string }> = ({ command, args }) => (
	<CodeLine>
		<CodeVar>{command}</CodeVar> <CodeArg>{args}</CodeArg>
	</CodeLine>
);

export const CodeBlock: FCC = ({ children }) => {
	// biome-ignore format: keep in one line
	const inline = <span>{"\t"}{children}</span>;

	return (
		<>
			<CodeLine>
				<CodeOther>{"{"}</CodeOther>
			</CodeLine>
			{inline}
			<CodeLine>
				<CodeOther>{"}"}</CodeOther>
			</CodeLine>
		</>
	);
};
