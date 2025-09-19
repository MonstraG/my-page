import type { SvgIcon } from "@/icons/icon.type";
import type { FC, ReactNode, SVGProps } from "react";
import styles from "./DiceBag.module.css";

const DieSvg: SvgIcon = (props) => (
	<svg className={styles.diceSvg} width="40" height="40" viewBox="-1 -1 42 42" {...props} />
);

const DieText: FC<SVGProps<SVGTextElement>> = (props) => (
	<text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={20} {...props} />
);

const D2: FC = () => (
	<DieSvg fill="#d7608a">
		<circle cx="20" cy="20" r="20" />
		<DieText>2</DieText>
	</DieSvg>
);

const D4: FC = () => (
	<DieSvg fill="#c0df33">
		<path d="M40 37.4H0L20 2.7z" />
		<DieText x="47%" y="60%">
			4
		</DieText>
	</DieSvg>
);

const D6: FC = () => (
	<DieSvg fill="#af61d8">
		<path d="M0 0h40v40H0z" />
		<DieText x="47%">6</DieText>
	</DieSvg>
);

const D8: FC = () => (
	<DieSvg fill="#71c957">
		<path d="M20 40L0 20 20 0l20 20z" />
		<DieText x="47%">8</DieText>
	</DieSvg>
);

const D10: FC = () => (
	<DieSvg fill="#8a8ed1">
		<path d="M20 0L0 16.9v6.3L20 40l20-16.9V17z" />
		<DieText x="47%">10</DieText>
	</DieSvg>
);

const D12: FC = () => (
	<DieSvg fill="#d7aa33">
		<path d="M20 40L0 24.8 7.6 0h24.7L40 24.8z" />
		<DieText x="47%" y="45%">
			12
		</DieText>
	</DieSvg>
);

const D20: FC = () => (
	<DieSvg fill="#5ac7a6">
		<path d="M2.7 30V10L20 0l17.3 10v20L20 40z" />
		<DieText y="52%">20</DieText>
	</DieSvg>
);

export const diceImages: Record<number, ReactNode> = {
	2: <D2 />,
	4: <D4 />,
	6: <D6 />,
	8: <D8 />,
	10: <D10 />,
	12: <D12 />,
	20: <D20 />,
};
