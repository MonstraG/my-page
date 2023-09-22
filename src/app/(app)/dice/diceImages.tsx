import { FC, ReactNode, SVGProps } from "react";

const DieBaseSvg: FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg width={adjustImageWidth(40, 40)} height="40" viewBox="0 0 40 40" {...props} />
);

// todo: give different sizes to D2-12 so that this has effect
function adjustImageWidth(width: number, height: number) {
	const widthBase = 40;
	const scaleFactor = 0.5;
	const imageRatio = width / height;

	return Math.pow(imageRatio, scaleFactor) * widthBase;
}

const D2: FC = () => (
	<DieBaseSvg>
		<circle cx="20" cy="20" r="20" />
	</DieBaseSvg>
);

const D4: FC = () => (
	<DieBaseSvg>
		<path d="M40 37.4H0L20 2.7z" />
	</DieBaseSvg>
);

const D6: FC = () => (
	<DieBaseSvg>
		<path d="M0 0h40v40H0z" />
	</DieBaseSvg>
);

const D8: FC = () => (
	<DieBaseSvg>
		<path d="M20 40L0 20 20 0l20 20z" />
	</DieBaseSvg>
);

const D10: FC = () => (
	<DieBaseSvg>
		<path d="M20 0L0 16.9v6.3L20 40l20-16.9V17z" />
	</DieBaseSvg>
);

const D12: FC = () => (
	<DieBaseSvg>
		<path d="M20 40L0 24.8 7.6 0h24.7L40 24.8z" />
	</DieBaseSvg>
);

const D20: FC = () => (
	<DieBaseSvg>
		<path d="M2.7 30V10L20 0l17.3 10v20L20 40z" />
	</DieBaseSvg>
);

export const diceImages: Record<number, ReactNode> = {
	2: <D2 />,
	4: <D4 />,
	6: <D6 />,
	8: <D8 />,
	10: <D10 />,
	12: <D12 />,
	20: <D20 />
};
