import initFilters from './modules/init-filters.mjs';
import renderImg from './modules/render-img.mjs';
import resetFilters from './modules/reset-filters.mjs';
import determineAndApplyTheme from './modules/theme-handler.mjs';
import drawAndDownloadImg from './modules/draw-and-download-img.mjs';

export const IMG_TRANSITION_DURATION = 400;
export const editedImg = document.getElementById('editedImg');
export const filterName = document.getElementById('filterName');
export const filterValue = document.getElementById('filterValue');
export const filterRange = document.getElementById('filterRangeInput');

function initApp() {
	const spinBtnsContainer = document.getElementById('spinBtnsContainer');
	const filterBtnsContainer = document.getElementById('filterBtnsContainer');

	initFilters(filterBtnsContainer, spinBtnsContainer);
	determineAndApplyTheme();
	matchMedia('(prefers-color-scheme: dark)').addEventListener('change', determineAndApplyTheme);

	// process and display new image
	{
		const imgSaveBtn = document.getElementById('imgSaveBtn');
		const imgFileInput = document.getElementById('imgFileInput');
		const imgDropZone = document.getElementById('imgDropZone');
		const editOptionsContainer = document.getElementById('editOptionsContainer');

		// drag & drop or select image, then parse and display it
		['dragover', 'drop'].forEach(event =>
			imgDropZone.addEventListener(event, e => {
				e.preventDefault();
				renderImg(e.dataTransfer.files[0], editOptionsContainer, imgSaveBtn, imgDropZone, filterBtnsContainer);
			}),
		);

		imgFileInput.addEventListener('change', () => {
			renderImg(imgFileInput.files[0], editOptionsContainer, imgSaveBtn, imgDropZone, filterBtnsContainer);
		});
	}

	// reset all filters
	document.getElementById('resetFiltersBtn').addEventListener('click', () => resetFilters(filterBtnsContainer));

	// save image
	document.getElementById('imgEditForm').addEventListener('submit', event => {
		event.preventDefault();
		drawAndDownloadImg(editedImg);
	});
}

initApp();
