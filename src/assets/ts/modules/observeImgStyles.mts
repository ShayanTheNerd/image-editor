import imgStore from '@ts/imgStore.ts';
import { DOMElements } from '@ts/app.ts';

const mutationObserver = new MutationObserver(toggleImgControls);

export default function observeImgStyles() {
	mutationObserver.observe(DOMElements.selectedImg, { attributeFilter: ['style'] });
}

function toggleImgControls() {
	const imgIsEdited: boolean = imgStore.isEdited;
	const { resetFiltersBtn, imgSaveAnchor } = DOMElements;

	resetFiltersBtn.disabled = !imgIsEdited;
	imgSaveAnchor.setAttribute('aria-disabled', String(!imgIsEdited));
	imgSaveAnchor.setAttribute('tabindex', imgIsEdited ? '0' : '-1');
}
