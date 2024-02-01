import imgStore from '../imgStore.js';
import { DOMElements } from '../app.js';
import resetFilters from './resetFilters.mjs';

export default function renderImg(newImg) {
	if (!newImg) return;

	const { selectedImg } = DOMElements;
	if (selectedImg.hasAttribute('src')) resetFilters();
	selectedImg.src = URL.createObjectURL(newImg);
	URL.revokeObjectURL(newImg); // Performance optimization
	selectedImg.addEventListener('load', () => updateImgDisplay(newImg), { once: true });
}

function updateImgDisplay(img) {
	const { imgDropZone, selectedImg, editOptionsContainer, filtersContainer } = DOMElements;
	imgDropZone.classList.remove('img-placeholder');
	imgStore.newNameAndExtension = extractImgNameAndExtension(img);
	selectedImg.title = selectedImg.alt = imgStore.title;
	editOptionsContainer.removeAttribute('disabled');
	filtersContainer.focus();
}

const lastDotIndex = string => string.lastIndexOf('.');
function extractImgNameAndExtension(imgFile) {
	const newImgName = imgFile.name.substring(0, lastDotIndex(imgFile.name));
	const newImgExtension = imgFile.name.substring(lastDotIndex(imgFile.name) + 1).toLowerCase();
	return { name: newImgName, extension: newImgExtension };
}
