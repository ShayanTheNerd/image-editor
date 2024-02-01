import imgStore from './imgStore.js';
import spinImg from './modules/spinImg.mjs';
import renderImg from './modules/renderImg.mjs';
import applyFilter from './modules/applyFilter.mjs';
import resetFilters from './modules/resetFilters.mjs';
import generateButtons from './modules/generateButtons.mjs';
import createImgCanvas from './modules/createImgCanvas.mjs';

export const ACTIVE_FILTER_CLASS = 'btn--filter--active';
export const DOMElements = {
	editOptionsContainer: document.getElementById('edit_options_container'),
	filtersContainer: document.getElementById('filters_container'),
	activeFilterBtn: null,
	filterName: document.getElementById('filter_name'),
	filterValue: document.getElementById('filter_value'),
	filterRangeInput: document.getElementById('filter_range_input'),
	selectedImg: document.getElementById('selected_img'),
	spinsContainer: document.getElementById('spins_container'),
	resetFiltersBtn: document.getElementById('reset_filters_btn'),
	imgDropZone: document.getElementById('img_drop_zone'),
	imgSelectInput: document.getElementById('img_select_input'),
	imgSaveAnchor: document.getElementById('save_img_anchor'),
};
const {
	filtersContainer,
	filterRangeInput,
	selectedImg,
	spinsContainer,
	resetFiltersBtn,
	imgDropZone,
	imgSelectInput,
	imgSaveAnchor,
} = DOMElements;

generateButtons();

new MutationObserver(toggleImgEditControls).observe(selectedImg, { attributeFilter: ['style'] });

filtersContainer.addEventListener('click', activateSelectedFilter);
filterRangeInput.addEventListener('input', applyFilter);
spinsContainer.addEventListener('click', spinImg);
resetFiltersBtn.addEventListener('click', resetFilters);
imgSelectInput.addEventListener('change', () => renderImg(imgSelectInput.files[0]));
imgSaveAnchor.addEventListener('click', downloadImg);
['dragover', 'drop'].forEach(event => imgDropZone.addEventListener(event, catchAndRenderImg));

function toggleImgEditControls() {
	const { isEdited: imgIsEdited } = imgStore;
	resetFiltersBtn.disabled = !imgIsEdited;
	imgSaveAnchor.setAttribute('aria-disabled', !imgIsEdited);
	imgSaveAnchor.setAttribute('tabindex', imgIsEdited ? 0 : -1);
}
function activateSelectedFilter({ target, currentTarget }) {
	if (target === currentTarget) return;

	imgStore.activeFilterIndex = target.textContent.toLocaleLowerCase();
	DOMElements.activeFilterBtn.classList.remove(ACTIVE_FILTER_CLASS);
	DOMElements.activeFilterBtn = target;
	DOMElements.activeFilterBtn.classList.add(ACTIVE_FILTER_CLASS);
	DOMElements.activeFilterBtn.scrollIntoView({ inline: 'center', behavior: 'smooth' });
	applyFilter({ newFilter: true });
}
function catchAndRenderImg(event) {
	event.preventDefault();
	renderImg(event.dataTransfer.files[0]);
}
function downloadImg() {
	const { name, extension } = imgStore.state;
	imgSaveAnchor.href = createImgCanvas().toDataURL();
	imgSaveAnchor.download = `${name} (edited).${extension}`;
}
