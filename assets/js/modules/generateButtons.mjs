import imgStore from '../imgStore.js';
import { ACTIVE_FILTER_CLASS, DOMElements } from '../app.js';

export default function generateButtons() {
	generateFilterButtons();
	generateRotateAndFlipButtons();
	DOMElements.activeFilterBtn = document.querySelector(`.${ACTIVE_FILTER_CLASS}`);
}

function generateFilterButtons() {
	imgStore.state.filters.forEach((filter, index) => {
		const activeFilterClass = index === 0 ? ACTIVE_FILTER_CLASS : '';
		const filterBtnHTML = `<button type="button" class="btn btn--filter ${activeFilterClass}">${filter.name}</button>`;
		DOMElements.filtersContainer.insertAdjacentHTML('beforeend', filterBtnHTML);
	});
}

function generateRotateAndFlipButtons() {
	const spinTypes = ['Rotate right', 'Rotate left', 'Vertical flip', 'Horizontal flip'];

	spinTypes.forEach(spinType => {
		/* prettier-ignore */
		const spinBtnHTML = `
         <button
            type="button"
            title="${spinType}"
            class="btn focus-visible:btn--tab-focus flex-auto px-3 ring-0 ring-offset-0 md:px-2.5 lg:px-3">
            <svg class="m-auto size-5 ${spinType.startsWith('Rotate') ? 'fill-current stroke-none' : 'fill-none stroke-current'}">
               <use href="./assets/icons.svg#${spinType.toLocaleLowerCase().replace(' ', '_')}" />
            </svg>
         </button>
      `;
		DOMElements.spinsContainer.insertAdjacentHTML('beforeend', spinBtnHTML);
	});
}
