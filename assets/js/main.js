// an object of all selected DOM ids and elements
const domStrings = {
	editOptionsContainer: document.getElementById('editOptionsContainer'),
	filterBtns: document.querySelectorAll('#filterBtns button'),
	filterName: document.getElementById('filterName'),
	filterValue: document.getElementById('filterValue'),
	filterRangeInput: document.getElementById('filterRangeInput'),
	flipRotateBtns: document.querySelectorAll('#flipRotateBtns button'),
	resetFiltersBtn: document.getElementById('resetFiltersBtn'),
	selectImgBtn: document.getElementById('selectImageBtn'),
	imgInput: document.getElementById('imageFileInput'),
	imgPreview: document.getElementById('imagePreview'),
	saveImgBtn: document.getElementById('downloadImageBtn'),
	copyrightDate: document.getElementById('copyrightDate'),
};

const globalItems = {
	/* brightness(100%) grayscale(0%) blur(0px) hue-rotate(0deg) opacity(100%) contrast(100%) saturate(100%) invert(0%) sepia(0%) */
	cssFilterProperties: '',
	imgFileName: null,
	imgExtension: null,
	rotationDeg: 0,
	verticalFlip: 1,
	horizontalFlip: 1,
	filterOptions: {
		brightness: {
			max: 200,
			value: 100,
			unit: '%',
		},
		grayscale: {
			max: 100,
			value: 0,
			unit: '%',
		},
		blur: {
			max: 10,
			value: 0,
			unit: 'px',
		},
		'hue-rotate': {
			max: 100,
			value: 0,
			unit: 'deg',
		},
		opacity: {
			max: 100,
			value: 100,
			unit: '%',
		},
		contrast: {
			max: 200,
			value: 100,
			unit: '%',
		},
		saturate: {
			max: 200,
			value: 100,
			unit: '%',
		},
		sepia: {
			max: 100,
			value: 0,
			unit: '%',
		},
	},
};

// set copyright date
domStrings.copyrightDate.textContent = new Date().getFullYear();

// set dark/light theme
{
	// init theme switcher method
	const switchTheme = (theme) => document.documentElement.setAttribute('data-theme', theme);
	const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)'); /* true/false */
	let theme = 'light';

	theme = darkModePreference.matches ? 'dark' : 'light';
	switchTheme(theme);

	// change theme when user's 'prefers-color-scheme' changes
	darkModePreference.addEventListener('change', (event) => {
		theme = event.matches ? 'dark' : 'light';
		switchTheme(theme);
	});
}

// preview selected image and activate edit options
{
	domStrings.saveImgBtn.disabled = true; /* make sure 'save image' button is disabled (for Firefox) */
	domStrings.selectImgBtn.addEventListener('click', () => domStrings.imgInput.click());
	domStrings.imgInput.addEventListener('change', (event) => {
		// declare data & abbreviations
		const imgPreview = domStrings.imgPreview;
		const selectedFile = event.target.files[0];

		// return if user hasn't selected a file
		if (!selectedFile) return;

		// read and set the data of the imported image (if the image exists)
		if (selectedFile) {
			// reset all filters if there was already an image
			if (imgPreview.src) resetFilters();

			// load and preview selected image
			imgPreview.src = URL.createObjectURL(selectedFile);
			imgPreview.addEventListener('load', () => {
				// get the filename and extension of the imported image
				const lastDot = selectedFile.name.lastIndexOf('.');
				globalItems.imgFileName = selectedFile.name.substring(0, lastDot);
				globalItems.imgExtension = selectedFile.name.substring(lastDot + 1).toLowerCase();

				// set 'alt' and 'name' of the image
				imgPreview.title = globalItems.imgFileName;
				imgPreview.alt = selectedFile.name;

				// enable edit options
				domStrings.saveImgBtn.ariaDisabled = 'false';
				domStrings.saveImgBtn.removeAttribute('disabled');
				imgPreview.parentElement.classList.add('contains-img');
				domStrings.editOptionsContainer.classList.remove('disabled-options');
				domStrings.editOptionsContainer.querySelector('form').ariaDisabled = 'false';
			});
		}
	});
}

// apply edits and filters
{
	// declare data & abbreviations
	const imgPreview = domStrings.imgPreview;
	const filterValue = domStrings.filterValue;
	const filterBtns = domStrings.filterBtns;
	const filterRangeInput = domStrings.filterRangeInput;
	let filterOptions = structuredClone(globalItems.filterOptions); // deep copy 'filterOptions' property from globalItems Object

	// functions declarations
	function initFilter(filter) {
		const currentFilter = filterOptions[filter];

		// set correlated filter properties
		Object.keys(filterOptions).forEach((key) => {
			if (key === filter) domStrings.filterName.textContent = key;
		});
		filterValue.textContent = `${currentFilter.value}${currentFilter.unit}`;
		filterRangeInput.max = currentFilter.max;
		filterRangeInput.value = currentFilter.value;
	}

	function setFilterValue(filter, newFilterValue) {
		const currentFilter = filterOptions[filter];
		let cssFilterProperties = '';

		// save new value
		currentFilter.value = newFilterValue;

		// preview value with appropriate unit
		if (filter === 'hue-rotate') {
			const hueRotateValue = Math.round((filterOptions['hue-rotate'].value * 360) / 100); /* e.g. 50deg */
			filterValue.textContent = `${hueRotateValue}${filterOptions['hue-rotate'].unit}`;
		} else {
			filterValue.textContent = `${currentFilter.value}${currentFilter.unit}`;
		}

		// apply filter
		/* create a string out of all filter names and values (except for 'Width' & 'Height') */
		for (const filter in filterOptions) {
			cssFilterProperties += `${filter}(${filterOptions[filter].value}${filterOptions[filter].unit})` + ' ';
		}
		globalItems.cssFilterProperties = cssFilterProperties;

		imgPreview.style.filter = globalItems.cssFilterProperties;
	}

	function flipRotateImg(flipRotateBtn) {
		// add transition for smooth transformation
		imgPreview.style.transition = 'all 0.3s';

		// init methods
		const flipImg = (axis) => {
			// flip image based on given axis ('y' or 'x')
			/* if flip's value is 1, set it to -1; else set it back to 1 */
			if (axis === 'y') globalItems.verticalFlip = globalItems.verticalFlip === 1 ? -1 : 1;
			if (axis === 'x') globalItems.horizontalFlip = globalItems.horizontalFlip === 1 ? -1 : 1;
			imgPreview.style.transform = `scale(${globalItems.verticalFlip},${globalItems.horizontalFlip})`;
		};
		const rotateImg = (direction) => {
			if (direction === 'left') globalItems.rotationDeg -= 90;
			if (direction === 'right') globalItems.rotationDeg += 90;
			imgPreview.style.rotate = `${globalItems.rotationDeg}deg`;
		};

		// call correlated method
		switch (flipRotateBtn) {
			case 'vertical-flip':
				flipImg('y');
				break;
			case 'horizontal-flip':
				flipImg('x');
				break;
			case 'rotate-left':
				rotateImg('left');
				break;
			case 'rotate-right':
				rotateImg('right');
				break;
			default:
				break;
		}
	}

	function resetFilters() {
		// add transition for smooth transformation
		imgPreview.style.transition = 'all 0.4s';

		// reset 'active-filter'
		filterBtns.forEach((filterBtn) => filterBtn.classList.remove('active-filter'));
		filterBtns[0].classList.add('active-filter');
		filterBtns[0].parentElement.scrollTo({ left: 0, behavior: 'smooth' });

		// reset 'filterOptions'
		filterOptions = globalItems.filterOptions;

		// reset filters apllied to the image
		imgPreview.style.filter = 'none';
		globalItems.cssFilterProperties = '';
		globalItems.horizontalFlip = globalItems.verticalFlip = 1;
		imgPreview.style.transform = `scale(${globalItems.verticalFlip},${globalItems.horizontalFlip})`;

		// (globalItems.rotationDeg % 360 === 0) => image is already rotated back to normal
		if (globalItems.rotationDeg % 360 !== 0) globalItems.rotationDeg = 0;
		imgPreview.style.rotate = `${globalItems.rotationDeg}deg`;

		// reset filter properties (set it back to 'Width')
		initFilter(filterBtns[0].value);

		saveImg();
	}

	/* ---------------------------------------------- */

	// activate selected filter
	for (const filterBtn of filterBtns) {
		filterBtn.addEventListener('click', () => {
			// remove 'active-filter' class from the previous filter
			document.querySelector('#filterBtns button.active-filter').classList.remove('active-filter');

			// add 'active-filter' class to the selected filter
			filterBtn.classList.add('active-filter');

			// init filter properties
			initFilter(filterBtn.value);
		});
	}

	// apply filter
	filterRangeInput.addEventListener('input', () => {
		// remove transition
		imgPreview.style.transition = '';

		filterBtns.forEach(
			(filterBtn) => filterBtn.classList.contains('active-filter') && setFilterValue(filterBtn.value, filterRangeInput.value),
		);
	});

	// flip & rotate image
	for (const flipRotateBtn of domStrings.flipRotateBtns) flipRotateBtn.addEventListener('click', () => flipRotateImg(flipRotateBtn.value));

	// reset all filters
	domStrings.resetFiltersBtn.addEventListener('click', resetFilters);
}

// save and download edited image
{
	const imgPreview = domStrings.imgPreview;
	const canvas = document.createElement('canvas');

	domStrings.saveImgBtn.addEventListener('click', () => {
		saveImg();

		// create download link and download canvas image
		const link = document.createElement('a');
		link.download = `${globalItems.imgFileName} (edited).${globalItems.imgExtension}`;
		link.href = canvas.toDataURL();
		link.click(); /* download edited image */
	});

	function saveImg() {
		// declare data & abbreviations
		const ctx = canvas.getContext('2d'); /* create canvas 2d context */

		// set canvas properties based on the edited image
		canvas.width = imgPreview.naturalWidth; /* set canvas width to the image's width */
		canvas.height = imgPreview.naturalHeight; /* set canvas height to the image's height */
		ctx.filter = globalItems.cssFilterProperties; /* apply filters to the canvas image */
		// ctx.scale(globalItems.horizontalFlip, globalItems.verticalFlip); /* flip canvas (horizontally, vertically) */ /* NOT WORKING! */
		ctx.translate(canvas.width / 2, canvas.height / 2); /* translate canvas from center */
		if (globalItems.rotationDeg !== 0) ctx.rotate((globalItems.rotationDeg * Math.PI) / 180);
		ctx.drawImage(imgPreview, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
	}
}
