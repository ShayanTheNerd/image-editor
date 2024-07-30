import type { State, Filter, SpinMode, FilterName } from '@types';

import { deepClone } from '@ts/utils/deepClone.ts';
import { spinIsRotation } from '@ts/utils/spinIsRotation.ts';
import { resetRotationDeg } from '@ts/utils/resetRotationDeg.ts';
import { rotationDegs, splitFromLastDotRegExp } from '@ts/constants.ts';

const { left: leftRotationDeg, right: rightRotationDeg, half: halfRotationDeg, full: fullRotationDeg } = rotationDegs;

class ImgStore {
	/*** State ***/
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
	}; /* “satisfies” vs. type annotation: “satisfies” fixes “verticalFlip” and “horizontalFlip” to 1, causing problem in createImgCanvas. */

	#defaultState = deepClone(this.state);

	/*** Methods ***/
	updateSpinValue(spinMode: SpinMode) {
		if (spinIsRotation(spinMode)) {
			const rotationDeg = spinMode === 'Rotate Right' ? rightRotationDeg : leftRotationDeg;
			this.state.rotationDeg += rotationDeg;
		} else {
			const flipMode = spinMode === 'Vertical Flip' ? 'verticalFlip' : 'horizontalFlip';
			this.state[flipMode] *= -1;
		}
	}

	updateCSSFilters() {
		const BLUR_REDUCTION_FACTOR = 2.5;

		const filtersString = this.state.filters.reduce((acc, { name, value, unit }) => {
			if (name === 'blur') {
				value /= BLUR_REDUCTION_FACTOR; // Visually reduce blur effect
			}

			return `${acc}${name}(${value}${unit})`;
		}, '');

		this.state.CSSFilters = filtersString;

		return filtersString;
	}

	reset() {
		const initialState = deepClone(this.#defaultState);
		const { name, extension, rotationDeg } = this.state;
		const adjustedRotationDeg = this.#isRotated ? resetRotationDeg(rotationDeg) : rotationDeg;

		this.state = {
			...initialState,
			name,
			extension,
			rotationDeg: adjustedRotationDeg,
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
	set title(imgFileName: string) {
		const [imgName, imgExtension] = imgFileName.split(splitFromLastDotRegExp);

		Object.assign(this.state, { name: imgName, extension: imgExtension?.toLowerCase() });
	}

	/* Type “any” is required when getter and setter don't share the same type. */
	set activeFilter(newFilterName: any | FilterName) {
		this.activeFilter.isActive = false;
		const newFilter = this.state.filters.find((filter: Filter) => filter.name === newFilterName) as Filter;
		newFilter.isActive = true;
	}
}

export const imgStore = new ImgStore();
