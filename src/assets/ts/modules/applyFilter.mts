import imgStore from '@ts/imgStore.ts';
import { DOMElements } from '@ts/app.ts';

export default function applyFilter({ newFilter = false }) {
	const { name, unit, max: maxValue } = imgStore.activeFilter;
	const { filterName, filterValue, filterRangeInput, selectedImg } = DOMElements;
	const value = newFilter ? imgStore.activeFilter.value : (imgStore.updateFilterValue = +filterRangeInput.value);
	const newValue = name === 'hue-rotation' ? Math.round((value * 360) / 100) : value;

	filterName.textContent = name;
	filterValue.textContent = `${newValue}${unit}`;
	filterRangeInput.max = maxValue;
	filterRangeInput.value = String(value); // Visual value
	filterRangeInput.setAttribute('value', String(value)); // Actual value
	filterRangeInput.style.setProperty('--value', `${Math.max((value / maxValue) * 100, 5)}%`);

	imgStore.updateCSSFilters();
	selectedImg.style.filter = imgStore.state.CSSFilters;
}
