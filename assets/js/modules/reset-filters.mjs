import { editedImg } from '../app.js';
import { applyFilter, spin } from './apply-filters.mjs';
import { img, imgBaseFilters } from '../imgFilters.js';

export default function resetFilters(filterBtnsContainer) {
	document.querySelector('.btn--filter--active').classList.remove('btn--filter--active');
	document.querySelector('.btn--filter').classList.add('btn--filter--active');

	filterBtnsContainer.scrollTo({ left: 0, behavior: 'smooth' });

	// reset all filters to their original values
	img.filters.forEach((filter, index) => (filter.value = imgBaseFilters.filters[index].value));

	spin();
	applyFilter();
	editedImg.addEventListener('transitionend', () => editedImg.removeAttribute('style'), { once: true });
}
