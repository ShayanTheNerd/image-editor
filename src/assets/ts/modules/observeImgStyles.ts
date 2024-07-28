import { imgStore } from '@ts/imgStore.ts';
import { DOMElements } from '@ts/domElements.ts';

const mutationObserver = new MutationObserver(toggleImgControls);

function toggleImgControls() {
	const imgIsEdited = imgStore.isEdited;
	const { resetFiltersBtn, imgSaveAnchor } = DOMElements;

	resetFiltersBtn.disabled = !imgIsEdited;
	imgSaveAnchor.setAttribute('tabindex', imgIsEdited ? '0' : '-1');
	imgSaveAnchor.setAttribute('aria-disabled', String(!imgIsEdited));
}

export function observeImgStyles(imgElement: HTMLImageElement) {
	mutationObserver.observe(imgElement, { attributeFilter: ['style'] });
}
