interface ImgStore {
	state: {
		name: null | string;
		extension: null | string;
		activeFilterIndex: number;
		rotationDeg: number;
		verticalFlip: number;
		horizontalFlip: number;
		CSSFilters: string;
		filters: Filter[];
	};
	_defaultState: null | ImgStore;
	_cloneState: Function;
	updateCSSFilters: Function;
	reset: Function;
	title: string;
	activeFilter: Filter;
	_hasFilter: boolean;
	_isRotated: boolean;
	isLandscape: boolean;
	_isFlipped: boolean;
	isEdited: boolean;
	activeFilterIndex: string;
	updateFilterValue: number;
	newNameAndExtension: { name: string; extension: string };
	spin: string;
}
interface Filter {
	name: string;
	max: number;
	value: number;
	unit: string;
}

const deepCopy: Function = (obj: object) => structuredClone(obj) || JSON.parse(JSON.stringify(obj));

const imgStore: ImgStore = {
	state: {
		name: null,
		extension: null,
		activeFilterIndex: 0,
		rotationDeg: 0,
		verticalFlip: 1,
		horizontalFlip: 1,
		CSSFilters: '',
		filters: [
			{
				name: 'brightness',
				max: 200,
				value: 100,
				unit: '%',
			},
			{
				name: 'grayscale',
				max: 100,
				value: 0,
				unit: '%',
			},
			{
				name: 'blur',
				max: 10,
				value: 0,
				unit: 'px',
			},
			{
				name: 'hue-rotation',
				max: 100,
				value: 0,
				unit: 'deg',
			},
			{
				name: 'opacity',
				max: 100,
				value: 100,
				unit: '%',
			},
			{
				name: 'contrast',
				max: 200,
				value: 100,
				unit: '%',
			},
			{
				name: 'saturation',
				max: 200,
				value: 100,
				unit: '%',
			},
			{
				name: 'sepia',
				max: 100,
				value: 0,
				unit: '%',
			},
		],
	},
	_defaultState: null,

	/* Methods */
	_cloneState() {
		this._defaultState = deepCopy(this.state);
	},
	updateCSSFilters() {
		this.state.CSSFilters = this.state.filters.reduce((acc: string, { name, value, unit }) => {
			if (name === 'blur') value /= 2.5;
			if (name === 'saturation') name = 'saturate';
			if (name === 'hue-rotation') name = 'hue-rotate';
			return `${acc}${name}(${value}${unit}) `;
		}, '');
	},
	reset() {
		const { name, extension, rotationDeg } = this.state;
		const normalizedRotationDeg: number = this._isRotated ? Math.round(rotationDeg / 360) * 360 : rotationDeg;
		this.state = { ...deepCopy(this._defaultState), name, extension, rotationDeg: normalizedRotationDeg };
	},

	/* Getters */
	get title() {
		const { name, extension } = this.state;
		return `${name}.${extension}`;
	},
	get activeFilter() {
		const { filters, activeFilterIndex } = this.state;
		return filters[activeFilterIndex];
	},
	get _hasFilter() {
		const isFilterValueChanged = (filter: Filter, index: number) => {
			const defaultFilterValue = this._defaultState.filters[index].value;
			return filter.value !== defaultFilterValue;
		};

		return this.state.filters.some(isFilterValueChanged);
	},
	get _isRotated() {
		return this.state.rotationDeg % 360 !== 0;
	},
	get isLandscape() {
		return this.state.rotationDeg % 180 !== 0;
	},
	get _isFlipped() {
		const { verticalFlip, horizontalFlip } = this.state;
		const { verticalFlip: defaultVerticalFlip, horizontalFlip: defaultHorizontalFlip } = this._defaultState;
		return verticalFlip !== defaultVerticalFlip || horizontalFlip !== defaultHorizontalFlip;
	},
	get isEdited() {
		return this._hasFilter || this._isRotated || this._isFlipped;
	},

	/* Setters */
	set activeFilterIndex(filterName: string) {
		this.state.activeFilterIndex = this.state.filters.findIndex((filter: Filter) => filter.name === filterName);
	},
	set updateFilterValue(newValue: number) {
		/* @ts-ignore */
		return (this.activeFilter.value = newValue);
	},
	set newNameAndExtension({ name, extension }) {
		Object.assign(this.state, { name, extension });
	},
	set spin(spinType: string) {
		switch (spinType) {
			case 'rotate left':
			case 'rotate right': {
				this.state.rotationDeg += spinType === 'rotate left' ? -90 : 90;
				break;
			}
			case 'vertical flip':
			case 'horizontal flip': {
				spinType = spinType === 'vertical flip' ? 'verticalFlip' : 'horizontalFlip';
				this.state[spinType] *= -1;
				break;
			}
		}
	},
};
imgStore._cloneState();

export default imgStore;
