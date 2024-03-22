import type { FilterName, Filter, State, SpinMode } from '@ts/types.d.ts';
import { deepCopy } from '@ts/utils.ts';
import { splitFromLastDotRegExp } from '@ts/constants.ts';

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
		this.state.CSSFilters = this.state.filters.reduce((acc, { name, value, unit }) => {
			if (name === 'blur') value /= 2.5; // Visually reduce blur effect to improve UX
			return `${acc}${name}(${value}${unit}) `;
		}, '');
	}
	reset() {
		const { name, extension, rotationDeg } = this.state;
		const normalizedRotationDeg = this.#isRotated ? Math.round(rotationDeg / 360) * 360 : rotationDeg;
		this.state = {
			...deepCopy(this.#defaultState),
			name,
			extension,
			rotationDeg: normalizedRotationDeg,
		};
	}

	/*** Getters ***/
	get #isRotated() {
		return this.state.rotationDeg % 360 !== 0;
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
		return this.state.rotationDeg % 180 !== 0;
	}
	get title() {
		const { name, extension } = this.state;
		return `${name}.${extension}`;
	}
	get activeFilter(): Filter {
		return this.state.filters.find(filter => filter.isActive) as Filter;
	}

	/*** Setters ***/
	/* Type “any” is required when getter and setter don't share the same type. */
	set activeFilter(newFilterName: FilterName | any) {
		this.activeFilter.isActive = false;
		const newFilter = this.state.filters.find((filter: Filter) => filter.name === newFilterName) as Filter;
		newFilter.isActive = true;
	}
	set title(imgFileName: string) {
		const [imgName, imgExtension] = imgFileName.split(splitFromLastDotRegExp);
		Object.assign(this.state, { name: imgName, extension: imgExtension?.toLowerCase() });
	}
	set spin(spinMode: SpinMode) {
		if (spinMode.startsWith('Rotate')) {
			this.state.rotationDeg += spinMode === 'Rotate Left' ? -90 : 90;
		} else {
			const flipMode = spinMode === 'Vertical Flip' ? 'verticalFlip' : 'horizontalFlip';
			this.state[flipMode] *= -1;
		}
	}
}

const imgStore = new ImgStore();

export { type FilterName, imgStore };
