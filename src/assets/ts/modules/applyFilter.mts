import { imgStore } from '@ts/imgStore.ts';
import { activeFilterValueCSSVar } from '@ts/constants.ts';
import { DOMElements, getImgElement } from '@ts/domElements.ts';

export function applyFilter({ newFilter = false }) {
	const imgElement = getImgElement();
	const { name, unit, maxValue } = imgStore.activeFilter;
	const { activeFilterName, activeFilterValue, activeFilterRangeInput } = DOMElements;

	if (!newFilter) imgStore.activeFilter.value = Number(activeFilterRangeInput.value);
	const { value } = imgStore.activeFilter;
	const newValue = name === 'hue-rotate' ? Math.round((value * 360) / 100) : value;

	activeFilterName.textContent = name;
	activeFilterValue.textContent = `${newValue}${unit}`;
	activeFilterRangeInput.max = String(maxValue);
	activeFilterRangeInput.value = String(value); // Visual value
	activeFilterRangeInput.setAttribute('value', String(value)); // Actual value
	activeFilterRangeInput.style.setProperty(activeFilterValueCSSVar, `${Math.max((value / maxValue) * 99, 5)}%`);

	imgStore.updateCSSFilters();
	imgElement.style.filter = imgStore.state.CSSFilters;
}
