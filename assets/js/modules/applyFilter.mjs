import imgStore from '../imgStore.js';
import { DOMElements } from '../app.js';

export default function applyFilter({ newFilter = false }) {
	const { name, unit, max: maxValue } = imgStore.activeFilter;
	const { filterName, filterValue, filterRangeInput, selectedImg } = DOMElements;
	const value = newFilter ? imgStore.activeFilter.value : (imgStore.updateFilterValue = +filterRangeInput.value);

	filterName.textContent = name;
	filterValue.textContent = `${value}${unit}`;
	filterRangeInput.max = maxValue;
	filterRangeInput.value = value; // Visual value
	filterRangeInput.setAttribute('value', value); // Actual value
	filterRangeInput.style.setProperty('--value', `${(value / maxValue) * 100}%`);

	if (name === 'hue-rotation') {
		const huerotationDeg = `${Math.round((value * 360) / 100)}${unit}`;
		filterValue.textContent = huerotationDeg;
		filterRangeInput.setAttribute('value', huerotationDeg);
	}

	imgStore.updateCSSFilters();
	selectedImg.style.filter = imgStore.state.CSSFilters;
}
