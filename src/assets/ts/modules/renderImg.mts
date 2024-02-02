import imgStore from '@ts/imgStore.ts';
import { DOMElements } from '@ts/app.ts';
import resetFilters from '@ts/modules/resetFilters.mts';

const { imgDropZone, selectedImg, editOptionsContainer, filtersContainer } = DOMElements;

export default function renderImg(newImg: File | null) {
	if (!newImg) return;

	selectedImg.src = URL.createObjectURL(newImg);
	URL.revokeObjectURL(String(newImg)); // Performance optimization
	selectedImg.addEventListener('load', () => updateImgDisplay(newImg), { once: true });
}

function updateImgDisplay(img: File) {
	selectedImg.title.length ? resetFilters() : imgDropZone.classList.remove('img-placeholder');
	imgStore.newNameAndExtension = extractImgNameAndExtension(img);
	selectedImg.title = selectedImg.alt = imgStore.title;
	editOptionsContainer.removeAttribute('disabled');
	filtersContainer.focus();
}

const lastDotIndex: Function = (string: string) => string.lastIndexOf('.');
function extractImgNameAndExtension(imgFile: File) {
	const newImgName: string = imgFile.name.substring(0, lastDotIndex(imgFile.name));
	const newImgExtension: string = imgFile.name.substring(lastDotIndex(imgFile.name) + 1).toLowerCase();
	return { name: newImgName, extension: newImgExtension };
}
