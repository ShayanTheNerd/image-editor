import type { spinModes } from '@ts/constants.ts';

type SpinMode = typeof spinModes[number];

type FilterName = 'blur' | 'sepia' | 'opacity' | 'contrast' | 'saturate' | 'grayscale' | 'brightness' | 'hue-rotate';

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

export type { State, Filter, SpinMode, FilterName };
