import { imgStore } from '@ts/imgStore.ts';
import { resetFilters } from '@ts/modules/resetFilters.mts';
import { DOMElements, getImgElement } from '@ts/domElements.ts';
import { observeImgStyles } from '@ts/modules/observeImgStyles.mts';

export function renderImg(imgFile: File) {
	imgStore.title = imgFile.name;

	const imgElement = getImgElement();
	const newImgElement = generateNewImgElement(imgFile, imgElement);

	/* prettier-ignore */
	newImgElement.addEventListener('load', () => {
      URL.revokeObjectURL(String(imgFile)); // Performance optimization
		updateImgPreview(imgElement, newImgElement);
	}, { once: true });
}

function generateNewImgElement(imgFile: File, baseImgElement: HTMLImageElement) {
	const newImgElement = baseImgElement.cloneNode() as HTMLImageElement;
	newImgElement.removeAttribute('style'); // Remove old filters
	newImgElement.style.objectFit = 'contain';
	newImgElement.title = imgStore.title;
	newImgElement.src = URL.createObjectURL(imgFile);

	return newImgElement;
}

function updateImgPreview(oldImgElement: HTMLImageElement, newImgElement: HTMLImageElement) {
	oldImgElement.replaceWith(newImgElement);
	observeImgStyles(newImgElement);

	if (newImgElement.title.length) resetFilters(); // Reset filters if there is already another image

	const { editOptionsContainer, filtersContainer } = DOMElements;
	editOptionsContainer.removeAttribute('disabled');
	filtersContainer.focus();
}
