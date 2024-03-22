import { activeFilterClass } from '@ts/constants.ts';

const DOMElements = Object.freeze({
	editOptionsContainer: document.getElementById('edit_options_container') as HTMLFieldSetElement,
	filtersContainer: document.getElementById('filters_container') as HTMLDivElement,
	activeFilterName: document.getElementById('active_filter_name') as HTMLSpanElement,
	activeFilterValue: document.getElementById('active_filter_value') as HTMLSpanElement,
	activeFilterRangeInput: document.getElementById('active_filter_range_input') as HTMLInputElement,
	spinsContainer: document.getElementById('spins_container') as HTMLDivElement,
	resetFiltersBtn: document.getElementById('reset_filters_btn') as HTMLButtonElement,
	imgDropZone: document.getElementById('img_drop_zone') as HTMLElement,
	imgSelectInput: document.getElementById('img_select_input') as HTMLInputElement,
	imgSaveAnchor: document.getElementById('img_save_anchor') as HTMLAnchorElement,
});

/* prettier-ignore */
const getActiveFilterBtn = () => DOMElements.filtersContainer.querySelector(`.${activeFilterClass}`) as HTMLButtonElement;
const getImgElement = () => document.getElementById('img') as HTMLImageElement;

export { DOMElements, getActiveFilterBtn, getImgElement };
