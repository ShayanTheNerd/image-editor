import { applyFilter, spin } from './apply-filters.mjs';
import { filters, clonedUnchangedFilters } from './filters.mjs';
import { IMG_TRANSITION_DURATION, editedImg } from '../app.js';

export default function resetFilters(filterBtnsContainer) {
	document.querySelector('.btn--filter--active').classList.remove('btn--filter--active');
	document.querySelector('.btn--filter').classList.add('btn--filter--active');

	filterBtnsContainer.scrollTo({ left: 0, behavior: 'smooth' });

	// reset all filters to their original values
	filters.forEach((filter, index) => (filter.value = clonedUnchangedFilters[index].value));

	spin();
	applyFilter();
	setTimeout(() => (editedImg.style.transition = ''), IMG_TRANSITION_DURATION);
}
