export const ACTIVE_FILTER_CLASS: string = 'btn--filter--active';

export const DOMElements = {
	editOptionsContainer: document.getElementById('edit_options_container') as HTMLFieldSetElement,
	filtersContainer: document.getElementById('filters_container') as HTMLDivElement,
	activeFilterBtn: document.querySelector(`.${ACTIVE_FILTER_CLASS}`) as HTMLButtonElement,
	filterName: document.getElementById('filter_name') as HTMLSpanElement,
	filterValue: document.getElementById('filter_value') as HTMLSpanElement,
	filterRangeInput: document.getElementById('filter_range_input') as HTMLInputElement,
	selectedImg: document.getElementById('selected_img') as HTMLImageElement,
	spinsContainer: document.getElementById('spins_container') as HTMLDivElement,
	resetFiltersBtn: document.getElementById('reset_filters_btn') as HTMLButtonElement,
	imgDropZone: document.getElementById('img_drop_zone') as HTMLElement,
	imgSelectInput: document.getElementById('img_select_input') as HTMLInputElement,
	imgSaveAnchor: document.getElementById('img_save_anchor') as HTMLAnchorElement,
};
