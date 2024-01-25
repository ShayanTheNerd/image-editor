import initFilters from './modules/init-filters.mjs';
import renderImg from './modules/render-img.mjs';
import { img, imgBaseFilters } from './imgFilters.js';
import resetFilters from './modules/reset-filters.mjs';
import drawAndDownloadImg from './modules/draw-and-download-img.mjs';

export const editedImg = document.getElementById('edited_img');
export const filterName = document.getElementById('filter_name');
export const filterValue = document.getElementById('filter_value');
export const filterRange = document.getElementById('filter_range_input');

function initApp() {
	const imgSaveBtn = document.getElementById('img_save_btn');
	const spinBtnsContainer = document.getElementById('spin_btns_container');
	const filterBtnsContainer = document.getElementById('filter_btns_container');

	initFilters(filterBtnsContainer, spinBtnsContainer);

	filterRange.addEventListener('input', function () {
		this.style.setProperty('--value', `${(this.value / this.max) * 100}%`);
	});

	// process and display new image
	{
		const imgFileInput = document.getElementById('img_file_input');
		const imgDropZone = document.getElementById('img_drop_zone');
		const editOptionsContainer = document.getElementById('edit_options_container');

		// drag & drop or select image, then parse and display it
		['dragover', 'drop'].forEach(event =>
			imgDropZone.addEventListener(event, e => {
				e.preventDefault();
				renderImg(e.dataTransfer.files[0], editOptionsContainer, imgDropZone, filterBtnsContainer);
			}),
		);

		imgFileInput.addEventListener('change', () => {
			renderImg(imgFileInput.files[0], editOptionsContainer, imgDropZone, filterBtnsContainer);
		});
	}

	// reset all filters
	document.getElementById('reset_filters_btn').addEventListener('click', () => resetFilters(filterBtnsContainer));

	// toggle "Save Image" button
	const observer = new MutationObserver(() => {
		if (!editedImg.getAttribute('style')) return;

		const imageIsEdited =
			img.verticalFlip !== 1 ||
			img.horizontalFlip !== 1 ||
			img.rotationDeg % 360 !== 0 ||
			img.filters.some((filter, index) => filter.value !== imgBaseFilters.filters[index].value);

		imgSaveBtn.setAttribute('aria-disabled', !imageIsEdited);
		imgSaveBtn.setAttribute('tabindex', imageIsEdited ? 0 : -1);
	});
	observer.observe(editedImg, { attributeFilter: ['style'] });

	// save image
	document.getElementById('img_save_btn').addEventListener('click', () => drawAndDownloadImg(editedImg));
}

initApp();
