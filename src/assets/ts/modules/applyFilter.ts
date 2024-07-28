import { imgStore } from '@ts/imgStore.ts';
import { DOMElements, getImgElement } from '@ts/domElements.ts';
import { rotationDegs, activeFilterValueCSSVar } from '@ts/constants.ts';

const MIN_FILTER_RANGE = 5;
const MAX_FILTER_RANGE = 99;

export function applyFilter({ newFilter = false }) {
	const imgElement = getImgElement();
	const { name, unit, maxValue } = imgStore.activeFilter;
	const { activeFilterName, activeFilterValue, activeFilterRangeInput } = DOMElements;

	if (!newFilter) {
		imgStore.activeFilter.value = Number(activeFilterRangeInput.value);
	}

	const { value } = imgStore.activeFilter;
	const newValue = name === 'hue-rotate' ? Math.round((value * rotationDegs.full) / 100) : value;
	const activeFilterRange = Math.max((value / maxValue) * MAX_FILTER_RANGE, MIN_FILTER_RANGE);

	activeFilterName.textContent = name;
	activeFilterValue.textContent = `${newValue}${unit}`;
	activeFilterRangeInput.max = String(maxValue);
	activeFilterRangeInput.value = String(value); // Visual value
	activeFilterRangeInput.setAttribute('value', String(value)); // Actual value
	activeFilterRangeInput.style.setProperty(activeFilterValueCSSVar, `${activeFilterRange}%`);

	imgStore.updateCSSFilters();
	imgElement.style.filter = imgStore.state.CSSFilters;
}
