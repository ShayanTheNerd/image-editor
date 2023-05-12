import resetFilters from './reset-filters.mjs';

let imgFileName = undefined;
let imgFileExtension = undefined;

export { imgFileName, imgFileExtension };

export default function renderImg(newImg, filtersContainer, imgSaveBtn, imgDropZone) {
	if (!newImg) return;

	const imgElem = imgDropZone.querySelector('img');

	// reset filters if there is already an image
	if (imgElem.src) resetFilters(filtersContainer);

	// load and display the selected image
	imgElem.src = URL.createObjectURL(newImg);

	imgElem.addEventListener('load', () => {
		imgDropZone.classList.remove('image-placeholder');

		imgElem.title = imgElem.alt = newImg.name;

		// extract filename and file extension of the selected image
		const lastDotIndex = string => string.lastIndexOf('.');
		imgFileName = newImg.name.substring(0, lastDotIndex(newImg.name));
		imgFileExtension = newImg.name.substring(lastDotIndex(newImg.name) + 1).toLowerCase();

		// enable edit and save options
		imgSaveBtn.removeAttribute('disabled');
		filtersContainer.classList.remove('filter-options--disabled');
		filtersContainer.setAttribute('aria-disabled', 'false');
	});
}
