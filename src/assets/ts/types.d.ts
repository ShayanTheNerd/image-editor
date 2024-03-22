import { spinModes } from '@ts/constants.ts';

/* prettier-ignore */
type SpinMode = typeof spinModes[number];

type FilterName = 'brightness' | 'grayscale' | 'blur' | 'hue-rotate' | 'opacity' | 'contrast' | 'saturate' | 'sepia';

type Filter = {
	name: FilterName;
	maxValue: number;
	value: number;
	unit: '%' | 'px' | 'deg';
	isActive: boolean;
};

type State = {
	name: null | string;
	extension: null | string;
	rotationDeg: number;
	verticalFlip: 1 | -1;
	horizontalFlip: 1 | -1;
	CSSFilters: string;
	filters: Filter[];
};

export type { SpinMode, FilterName, Filter, State };
