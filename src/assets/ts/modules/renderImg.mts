import imgStore from '@ts/imgStore.ts';
import { DOMElements } from '@ts/app.ts';
import resetFilters from '@ts/modules/resetFilters.mts';
import extractImgInfo from '@ts/modules/extractImgInfo.mts';
import observeImgStyles from '@ts/modules/observeImgStyles.mts';

/* Note: “selectedImg” musn't be destructured from “DOMElements”. */
const { editOptionsContainer, filtersContainer } = DOMElements;

export default function renderImg(imgFile: File) {
	if (!imgFile) return;

	imgStore.newNameAndExtension = extractImgInfo(imgFile);

	const img = DOMElements.selectedImg.cloneNode() as HTMLImageElement;
	img.removeAttribute('style'); // Remove old filters
	img.style.objectFit = 'contain';
	img.title = img.alt = imgStore.title;
	img.src = URL.createObjectURL(imgFile);
	img.addEventListener('load', () => updateImgDisplay(imgFile, img), { once: true });
}

function updateImgDisplay(imgFile: File, imgElement: HTMLImageElement) {
	URL.revokeObjectURL(String(imgFile)); // Performance optimization

	DOMElements.selectedImg.replaceWith(imgElement);
	DOMElements.selectedImg = imgElement;
	observeImgStyles();

	if (DOMElements.selectedImg.title.length) resetFilters(); // Reset filters if there is already another image

	editOptionsContainer.removeAttribute('disabled');
	filtersContainer.focus();
}
