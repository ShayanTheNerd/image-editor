import resetFilters from './reset-filters.mjs';

export let imgFileName = undefined;
export let imgFileExtension = undefined;
const imgElement = document.getElementById('edited_img');
const loadingSpinner = document.getElementById('loading_spinner');

export default function renderImg(newImg, filtersContainer, imgDropZone, filterBtnsContainer) {
	if (!newImg) return;

	loadingSpinner.setAttribute('aria-hidden', 'false');
	imgElement.removeAttribute('src');
	imgDropZone.classList.remove('img-placeholder');
	resetFilters(filterBtnsContainer); // reset filters in case there was already an image

	// load and display the selected image
	imgElement.src = URL.createObjectURL(newImg);
	URL.revokeObjectURL(newImg); // performance optimization
	imgElement.addEventListener('load', () => loadImg(newImg, filtersContainer, filterBtnsContainer), {
		once: true,
	});
}

function loadImg(newImg, filtersContainer, filterBtnsContainer) {
	imgElement.title = imgElement.alt = newImg.name;

	// extract filename and file extension of the selected image
	const lastDotIndex = string => string.lastIndexOf('.');
	imgFileName = newImg.name.substring(0, lastDotIndex(newImg.name));
	imgFileExtension = newImg.name.substring(lastDotIndex(newImg.name) + 1).toLowerCase();

	// enable edit and save options
	filtersContainer.removeAttribute('disabled');
	filterBtnsContainer.focus();

	loadingSpinner.setAttribute('aria-hidden', 'true');
}
