import { img } from '../imgFilters.js';
import { editedImg, filterName, filterValue, filterRange } from '../app.js';

export let cssFilterProperties = undefined;

export function applyFilter(updateFilterValue = false) {
	const selectedFilterName = document.querySelector('.btn--filter--active').textContent.toLocaleLowerCase();
	const activeFilter = img.filters.find(filter => filter.name === selectedFilterName);
	const { name, unit, max } = activeFilter;
	const value = (activeFilter.value = updateFilterValue === true ? +filterRange.value : activeFilter.value); // match original and filter range input value if 'updateFilterValue' is 'true'

	filterRange.max = max;
	filterName.textContent = name;
	filterValue.textContent = `${value}${unit}`;
	filterRange.value = value;
	filterRange.setAttribute('value', value);
	filterRange.style.setProperty('--value', `${(value / max) * 100}%`);

	if (name === 'hue-rotate') {
		const huerotationDeg = `${Math.round((value * 360) / 100)}${unit}`;

		filterValue.textContent = huerotationDeg;
		filterRange.setAttribute('value', huerotationDeg);
	}

	/* prettier-ignore */
	cssFilterProperties = img.filters.reduce((acc, filter) => acc + `${filter.name}(${filter.value}${filter.unit}) `, '')
	editedImg.style.filter = cssFilterProperties;
}

export function spin(spinType) {
	switch (spinType) {
		case 'vertical flip': {
			img.verticalFlip = img.verticalFlip === 1 ? -1 : 1; // verticalFlip ^= !verticalFlip;
			break;
		}
		case 'horizontal flip': {
			img.horizontalFlip = img.horizontalFlip === 1 ? -1 : 1; // horizontalFlip = -horizontalFlip;
			break;
		}
		case 'rotate right': {
			img.rotationDeg += 90;
			break;
		}
		case 'rotate left': {
			img.rotationDeg -= 90;
			break;
		}
		default: {
			img.verticalFlip = img.horizontalFlip = 1;
			if (img.rotationDeg % 360 !== 0) img.rotationDeg = 0;
			break;
		}
	}

	editedImg.style.transform = `scale(${img.verticalFlip}, ${img.horizontalFlip}) rotate(${img.rotationDeg}deg)`;
}
