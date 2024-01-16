import initFilters from './modules/init-filters.mjs';
import renderImg from './modules/render-img.mjs';
import resetFilters from './modules/reset-filters.mjs';
import drawAndDownloadImg from './modules/draw-and-download-img.mjs';

export const IMG_TRANSITION_DURATION = 400;
export const editedImg = document.getElementById('edited_img');
export const filterName = document.getElementById('filter_name');
export const filterValue = document.getElementById('filter_value');
export const filterRange = document.getElementById('filter_range_input');

function initApp() {
	const spinBtnsContainer = document.getElementById('spin_btns_container');
	const filterBtnsContainer = document.getElementById('filter_btns_container');

	initFilters(filterBtnsContainer, spinBtnsContainer);

	filterRange.addEventListener('input', function () {
		this.style.setProperty('--value', `${(this.value / this.max) * 100}%`);
	});

	// process and display new image
	{
		const imgSaveBtn = document.getElementById('img_save_btn');
		const imgFileInput = document.getElementById('img_file_input');
		const imgDropZone = document.getElementById('img_drop_zone');
		const editOptionsContainer = document.getElementById('edit_options_container');

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
	document.getElementById('reset_filters_btn').addEventListener('click', () => resetFilters(filterBtnsContainer));

	// save image
	document.getElementById('img_edit_form').addEventListener('submit', event => {
		event.preventDefault();
		drawAndDownloadImg(editedImg);
	});
}

initApp();
