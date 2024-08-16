import { imgStore } from '@ts/imgStore.ts';
import { resetFilters } from '@ts/modules/resetFilters.ts';
import { DOMElements, getImgElement } from '@ts/domElements.ts';
import { observeImgStyles } from '@ts/modules/observeImgStyles.ts';

export function renderImg(imgFile: File) {
	imgStore.title = imgFile.name;

	const imgElement = getImgElement();
	const newImgElement = generateNewImgElement(imgFile, imgElement);

	newImgElement.addEventListener('load', () => {
		URL.revokeObjectURL(String(imgFile)); // Performance optimization
		updateImgPreview(imgElement, newImgElement);
	}, { once: true });
}

function generateNewImgElement(imgFile: File, baseImgElement: HTMLImageElement) {
	const newImgElement = baseImgElement.cloneNode() as HTMLImageElement;
	newImgElement.removeAttribute('style'); // Remove old filters
	newImgElement.style.objectFit = 'contain';
	newImgElement.title = newImgElement.alt = imgStore.title;
	newImgElement.src = URL.createObjectURL(imgFile);

	return newImgElement;
}

function updateImgPreview(oldImgElement: HTMLImageElement, newImgElement: HTMLImageElement) {
	oldImgElement.replaceWith(newImgElement);
	observeImgStyles(newImgElement);

	// Reset filters if there is already another image.
	if (newImgElement.title.length) {
		resetFilters();
	}

	const { editOptionsContainer, filtersContainer } = DOMElements;
	editOptionsContainer.removeAttribute('disabled');
	filtersContainer.focus();
}
