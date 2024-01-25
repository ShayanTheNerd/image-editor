import resetFilters from './reset-filters.mjs';

let imgFileName = undefined;
let imgFileExtension = undefined;

export { imgFileName, imgFileExtension };

export default function renderImg(newImg, filtersContainer, imgDropZone, filterBtnsContainer) {
	if (!newImg) return;

	const imgElem = imgDropZone.querySelector('img');

	// load and display the selected image
	imgElem.src = URL.createObjectURL(newImg);
	URL.revokeObjectURL(newImg); // performance optimization

	imgElem.addEventListener(
		'load',
		() => {
			imgDropZone.classList.remove('img-placeholder');

			imgElem.title = imgElem.alt = newImg.name;

			// extract filename and file extension of the selected image
			const lastDotIndex = string => string.lastIndexOf('.');
			imgFileName = newImg.name.substring(0, lastDotIndex(newImg.name));
			imgFileExtension = newImg.name.substring(lastDotIndex(newImg.name) + 1).toLowerCase();

			resetFilters(filterBtnsContainer);

			// enable edit and save options
			filtersContainer.removeAttribute('disabled');
			filterBtnsContainer.focus();
		},
		{ once: true },
	);
}
