import imgStore from '@ts/imgStore.ts';
import { DOMElements, FILTER_VALUE_CSS_VARIABLE as filterValueCSSVariable } from '@ts/app.ts';

export default function applyFilter({ newFilter = false }) {
	const { name, unit, max: maxValue } = imgStore.activeFilter;
	const { filterName, filterValue, filterRangeInput, selectedImg } = DOMElements;
	const value = newFilter ? imgStore.activeFilter.value : (imgStore.updateFilterValue = Number(filterRangeInput.value));
	const newValue = name === 'hue-rotation' ? Math.round((value * 360) / 100) : value;

	filterName.textContent = name;
	filterValue.textContent = `${newValue}${unit}`;
	filterRangeInput.max = String(maxValue);
	filterRangeInput.value = String(value); // Visual value
	filterRangeInput.setAttribute('value', String(value)); // Actual value
	filterRangeInput.style.setProperty(filterValueCSSVariable, `${Math.max((value / maxValue) * 99, 5)}%`);

	imgStore.updateCSSFilters();
	selectedImg.style.filter = imgStore.state.CSSFilters;
}
