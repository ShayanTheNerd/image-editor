import spinImg from './spinImg.mjs';
import imgStore from '../imgStore.js';
import applyFilter from './applyFilter.mjs';
import { ACTIVE_FILTER_CLASS, DOMElements } from '../app.js';

export default function resetFilters() {
	const firstFilterBtn = DOMElements.filtersContainer.children[0];
	DOMElements.activeFilterBtn.classList.remove(ACTIVE_FILTER_CLASS);
	DOMElements.activeFilterBtn = firstFilterBtn;
	DOMElements.activeFilterBtn.classList.add(ACTIVE_FILTER_CLASS);
	DOMElements.filtersContainer.scrollTo({ left: 0, behavior: 'smooth' });

	imgStore.reset();
	spinImg();
	applyFilter({ newFilter: true });
}
