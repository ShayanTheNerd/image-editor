import { filters } from './filters.mjs';
import { editedImg, filterName, filterValue, filterRange, IMG_TRANSITION_DURATION } from '../app.js';

let cssFilterProperties = undefined;
let rotationDeg = 0;
let verticalFlip = 1;
let horizontalFlip = 1;

export { cssFilterProperties, rotationDeg, verticalFlip, horizontalFlip };

export function applyFilter(updateFilterValue = false) {
	const selectedFilterName = document.querySelector('.btn--filter--active').textContent.toLocaleLowerCase();
	const activeFilter = filters.find(filter => filter.name === selectedFilterName);
	const { name, unit, max } = activeFilter;
	const value = (activeFilter.value = updateFilterValue === true ? +filterRange.value : activeFilter.value); // match original and filter range input value if 'updateFilterValue' is 'true'

	filterRange.max = max;
	filterName.textContent = name;
	filterValue.textContent = `${value}${unit}`;
	filterRange.value = value;
	filterRange.setAttribute('value', value);

	if (name === 'hue-rotate') {
		const huerotationDeg = `${Math.round((value * 360) / 100)}${unit}`;

		filterValue.textContent = huerotationDeg;
		filterRange.setAttribute('value', huerotationDeg);
	}

	/* prettier-ignore */
	cssFilterProperties = filters.reduce((acc, filter) => acc + `${filter.name}(${filter.value}${filter.unit}) `, '')
	editedImg.style.filter = cssFilterProperties;
}

export function spin(spinType) {
	editedImg.style.transition = `all ${IMG_TRANSITION_DURATION}ms`;

	switch (spinType) {
		case 'verticalFlip': {
			verticalFlip = verticalFlip === 1 ? -1 : 1; // verticalFlip ^= !verticalFlip;
			break;
		}
		case 'horizontalFlip': {
			horizontalFlip = horizontalFlip === 1 ? -1 : 1; // horizontalFlip = -horizontalFlip;
			break;
		}
		case 'rotateRight': {
			rotationDeg += 90;
			break;
		}
		case 'rotateLeft': {
			rotationDeg -= 90;
			break;
		}
		default: {
			verticalFlip = horizontalFlip = 1;
			if (rotationDeg % 360 !== 0) rotationDeg = 0;
			editedImg.style.transform = `scale(${verticalFlip}, ${horizontalFlip}) rotate(${rotationDeg}deg)`;
			break;
		}
	}

	editedImg.style.transform = `scale(${verticalFlip}, ${horizontalFlip}) rotate(${rotationDeg}deg)`;
}
