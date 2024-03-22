import { imgStore } from '@ts/imgStore.ts';
import { spinImg } from '@ts/modules/spinImg.mts';
import { activeFilterClass } from '@ts/constants.ts';
import { applyFilter } from '@ts/modules/applyFilter.mts';
import { DOMElements, getActiveFilterBtn } from '@ts/domElements.ts';

export function resetFilters() {
	const { filtersContainer } = DOMElements;
	const activeFilterBtn = getActiveFilterBtn();
	const firstFilterBtn = filtersContainer.children[0] as HTMLButtonElement;
	activeFilterBtn.classList.remove(activeFilterClass);
	firstFilterBtn.classList.add(activeFilterClass);
	filtersContainer.scrollTo({ left: 0, behavior: 'smooth' });

	imgStore.reset();
	spinImg();
	applyFilter({ newFilter: true });
}
