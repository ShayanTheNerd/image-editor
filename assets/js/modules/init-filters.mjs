import { filters } from './filters.mjs';
import { filterRange } from '../app.js';
import { applyFilter, spin } from './apply-filters.mjs';

export default function initFilters(filtersContainer, spinBtnsContainer) {
	// generate filter buttons
	filters.forEach((filter, index) => {
		/* prettier-ignore */
		const filterButtonHTML = /* html */ `
         <button type="button" class="btn btn--filter ${index === 0 && 'btn--filter--active'}">${filter.name}</button>
      `;

		filtersContainer.insertAdjacentHTML('beforeend', filterButtonHTML);
	});

	// activate selected filter
	filtersContainer.addEventListener('click', event => {
		if (event.target === event.currentTarget) return;

		document.querySelector('.btn--filter--active').classList.remove('btn--filter--active');
		event.target.classList.add('btn--filter--active');

		applyFilter();
	});

	// update filter value and apply it to the image
	filterRange.addEventListener('input', () => applyFilter(true));

	// apply the selected spin type to the image
	spinBtnsContainer.addEventListener('click', event => {
		if (event.target === event.currentTarget) return;

		spin(event.target.closest('button[type="button"]').dataset.spinType);
	});
}
