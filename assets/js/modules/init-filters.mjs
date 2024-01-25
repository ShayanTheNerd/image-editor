import { img } from '../imgFilters.js';
import { filterRange } from '../app.js';
import { applyFilter, spin } from './apply-filters.mjs';

const rotateFlipItems = ['rotate right', 'rotate left', 'vertical flip', 'horizontal flip'];

export default function initFilters(filtersContainer, spinBtnsContainer) {
	// generate filter buttons
	img.filters.forEach((filter, index) => {
		/* prettier-ignore */
		const filterButtonHTML = /* html */ `
         <button type="button" class="btn btn--filter ${index === 0 && 'btn--filter--active'}">${filter.name}</button>
      `;

		filtersContainer.insertAdjacentHTML('beforeend', filterButtonHTML);
	});

	// generate rotate and flip buttons
	rotateFlipItems.forEach(item => {
		/* prettier-ignore */
		const rotateFlipButtonHTML = `
         <button
            type="button"
            title="${item}"
            class="btn focus-visible:btn--tab-focus flex-auto px-3 ring-0 ring-offset-0 md:px-2.5 lg:px-3">
            <svg class="m-auto size-5 ${item.startsWith('rotate') ? 'fill-current stroke-none' : 'fill-none stroke-current'}">
               <use href="./assets/icons.svg#${item.replace(' ', '_')}"></use>
            </svg>
         </button>
      `;

		spinBtnsContainer.insertAdjacentHTML('beforeend', rotateFlipButtonHTML);
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

		spin(event.target.closest('button[type="button"]').title);
	});
}
