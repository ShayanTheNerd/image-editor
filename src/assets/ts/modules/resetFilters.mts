import imgStore from '@ts/imgStore.ts';
import spinImg from '@ts/modules/spinImg.mts';
import applyFilter from '@ts/modules/applyFilter.mts';
import { ACTIVE_FILTER_CLASS, DOMElements } from '../app.ts';

export default function resetFilters() {
	const firstFilterBtn = DOMElements.filtersContainer.children[0] as HTMLButtonElement;
	DOMElements.activeFilterBtn.classList.remove(ACTIVE_FILTER_CLASS);
	DOMElements.activeFilterBtn = firstFilterBtn;
	DOMElements.activeFilterBtn.classList.add(ACTIVE_FILTER_CLASS);
	DOMElements.filtersContainer.scrollTo({ left: 0, behavior: 'smooth' });

	imgStore.reset();
	spinImg();
	applyFilter({ newFilter: true });
}
