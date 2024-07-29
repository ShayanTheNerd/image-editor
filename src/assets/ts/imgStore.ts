import type { State, Filter, SpinMode, FilterName } from '@types';

import { rotationDegs, splitFromLastDotRegExp } from '@ts/constants.ts';

const { left: leftRotationDeg, right: rightRotationDeg, half: halfRotationDeg, full: fullRotationDeg } = rotationDegs;

function deepCopy<TObj = object>(obj: TObj) {
	return structuredClone(obj) || JSON.parse(JSON.stringify(obj)) as TObj;
}

class ImgStore {
	state: State = {
		name: null,
		extension: null,
		rotationDeg: 0,
		verticalFlip: 1,
		horizontalFlip: 1,
		CSSFilters: '',
		filters: [
			{
				name: 'brightness',
				maxValue: 200,
				value: 100,
				unit: '%',
				isActive: true,
			},
			{
				name: 'grayscale',
				maxValue: 100,
				value: 0,
				unit: '%',
				isActive: false,
			},
			{
				name: 'blur',
				maxValue: 10,
				value: 0,
				unit: 'px',
				isActive: false,
			},
			{
				name: 'hue-rotate',
				maxValue: 100,
				value: 0,
				unit: 'deg',
				isActive: false,
			},
			{
				name: 'opacity',
				maxValue: 100,
				value: 100,
				unit: '%',
				isActive: false,
			},
			{
				name: 'contrast',
				maxValue: 200,
				value: 100,
				unit: '%',
				isActive: false,
			},
			{
				name: 'saturate',
				maxValue: 200,
				value: 100,
				unit: '%',
				isActive: false,
			},
			{
				name: 'sepia',
				maxValue: 100,
				value: 0,
				unit: '%',
				isActive: false,
			},
		],
	};

	#defaultState = deepCopy(this.state);

	/*** Methods ***/
	updateCSSFilters() {
		const BLUR_REDUCTION_FACTOR = 2.5;

		this.state.CSSFilters = this.state.filters.reduce((acc, { name, value, unit }) => {
			if (name === 'blur') {
				value /= BLUR_REDUCTION_FACTOR; // Visually reduce blur effect
			}

			return `${acc}${name}(${value}${unit}) `;
		}, '');
	}

	reset() {
		const { name, extension, rotationDeg } = this.state;
		const normalizedRotationDeg = this.#isRotated ? Math.round(rotationDeg / fullRotationDeg) * fullRotationDeg : rotationDeg;

		this.state = {
			...deepCopy(this.#defaultState),
			name,
			extension,
			rotationDeg: normalizedRotationDeg,
		};
	}

	/*** Getters ***/
	get #isRotated() {
		return this.state.rotationDeg % fullRotationDeg !== 0;
	}

	get #isFlipped() {
		const { verticalFlip, horizontalFlip } = this.state;
		const { verticalFlip: defaultVerticalFlip, horizontalFlip: defaultHorizontalFlip } = this.#defaultState;

		return verticalFlip !== defaultVerticalFlip || horizontalFlip !== defaultHorizontalFlip;
	}

	get #hasFilter() {
		const filterValueIsChanged = (filter: Filter, index: number) => {
			const defaultFilterValue = this.#defaultState.filters[index]!.value;

			return filter.value !== defaultFilterValue;
		};

		return this.state.filters.some(filterValueIsChanged);
	}

	get isEdited() {
		return this.#isRotated || this.#isFlipped || this.#hasFilter;
	}

	get isLandscape() {
		return this.state.rotationDeg % halfRotationDeg !== 0;
	}

	get title() {
		const { name, extension } = this.state;

		return `${name}.${extension}`;
	}

	get activeFilter(): Filter {
		return this.state.filters.find((filter) => filter.isActive) as Filter;
	}

	/*** Setters ***/
	/* Type “any” is required when getter and setter don't share the same type. */
	set activeFilter(newFilterName: any | FilterName) {
		this.activeFilter.isActive = false;
		const newFilter = this.state.filters.find((filter: Filter) => filter.name === newFilterName) as Filter;
		newFilter.isActive = true;
	}

	set title(imgFileName: string) {
		const [imgName, imgExtension] = imgFileName.split(splitFromLastDotRegExp);
		Object.assign(this.state, { name: imgName, extension: imgExtension?.toLowerCase() });
	}

	// eslint-disable-next-line accessor-pairs -- “rotationDeg” and “verticalFlip”/“horizontalFlip” are accessed separately.
	set spin(spinMode: SpinMode) {
		if (spinMode.startsWith('Rotate')) {
			const rotationDeg = spinMode === 'Rotate Right' ? rightRotationDeg : leftRotationDeg;
			this.state.rotationDeg += rotationDeg;
		} else {
			const flipMode = spinMode === 'Vertical Flip' ? 'verticalFlip' : 'horizontalFlip';
			this.state[flipMode] *= -1;
		}
	}
}

export const imgStore = new ImgStore();
