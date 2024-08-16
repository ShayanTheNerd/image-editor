import fs from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';
import { activeFilterClass } from '@ts/constants.ts';

const activeFilterClassRegExp = new RegExp(activeFilterClass, 'u');
const TESTS_DIR = 'tests/e2e';
const IMG_SWAP_DURATION = 250;
const BASE_CSS_MATRIX = 'matrix(1, 0, 0, 1, 0, 0)';
const BASE_CSS_FILTERS = 'brightness(1) grayscale(0) blur(0px) hue-rotate(0deg) opacity(1) contrast(1) saturate(1) sepia(0)';

test.beforeEach(async ({ page }) => {
	await page.goto('/image-editor');
});

test.afterAll(() => {
	const dirsToRemove = ['downloads', 'reports', 'results'];

	dirsToRemove.forEach((dir) => {
		fs.rmSync(`${TESTS_DIR}/${dir}`, { recursive: true, force: true });
	});
});

test('accessibility', async ({ page }) => {
	const a11yScanResult = await new AxeBuilder({ page }).exclude('footer').exclude('#filters_container').analyze();

	expect(a11yScanResult.violations).toHaveLength(0);
});

test('goes through the process of uploading, editing, and downloading multiple images', async ({ page }) => {
	const img = page.locator('#img');
	const imgDropZone = page.locator('#img_drop_zone');
	const imgSelectLabel = page.getByText('Select Image');
	const imgSaveAnchor = page.getByRole('link', { name: 'Save Image' });
	const firstFilterBtn = page.getByRole('button', { name: 'brightness' });
	const verticalFlipBtn = page.getByRole('button', { name: 'Vertical Flip' });
	const grayscaleFilterBtn = page.getByRole('button', { name: 'grayscale' });
	const rotateRightBtn = page.getByRole('button', { name: 'Rotate Right' });
	const resetFiltersBtn = page.getByRole('button', { name: 'Reset Filters' });
	const activeFilterRangeInput = page.locator('#active_filter_range_input');
	const editOptionsContainer = page.getByRole('group', { name: 'Edit Options' });

	/* Initial state */
	await expect(imgSaveAnchor).toBeDisabled();
	await expect(editOptionsContainer).toHaveAttribute('disabled'); // “expect(editOptionsContainer).toBeDisabled()” doesn't work

	/* Upload an image by clicking on the "Select Image" label */
	await imgSelectLabel.setInputFiles(`${TESTS_DIR}/images/pickle-rick.webp`);
	await page.waitForTimeout(IMG_SWAP_DURATION);
	await expect(editOptionsContainer).toBeEnabled();
	await expect(resetFiltersBtn).toBeDisabled();
	await expect(imgSaveAnchor).toBeDisabled();
	await expect(img).toHaveAttribute('alt', 'pickle-rick.webp');
	await expect(img).toHaveAttribute('title', 'pickle-rick.webp');

	/* Edit the uploaded image */
	await verticalFlipBtn.click();
	await rotateRightBtn.click();
	await grayscaleFilterBtn.click();
	await activeFilterRangeInput.fill('100');
	await expect(imgSaveAnchor).toBeEnabled();
	await expect(resetFiltersBtn).toBeEnabled();
	await expect(firstFilterBtn).not.toHaveClass(activeFilterClassRegExp);
	await expect(grayscaleFilterBtn).toHaveClass(activeFilterClassRegExp);
	await expect(img).toHaveCSS('transform', 'matrix(0, 1, 1, 0, 0, 0)');
	await expect(img).toHaveCSS('filter', 'brightness(1) grayscale(1) blur(0px) hue-rotate(0deg) opacity(1) contrast(1) saturate(1) sepia(0)');

	/* Download the edited image */
	const downloadPromise = page.waitForEvent('download');
	await imgSaveAnchor.click();
	// await expect(imgSaveAnchor).toBeDisabled();
	// await expect(imgSaveAnchor).toContainText('Saving...');
	// await page.waitForTimeout(imgDownloadTimeoutMS);
	// await expect(imgSaveAnchor).toBeEnabled();
	// await expect(imgSaveAnchor).toContainText('Save Image');
	const download = await downloadPromise;
	const downloadPath = `${TESTS_DIR}/downloads/${download.suggestedFilename()}`;
	await download.saveAs(downloadPath);
	expect(fs.existsSync(downloadPath)).toBeTruthy();

	/* Upload another image by clicking on the image drop-zone */
	const fileChooserPromise = page.waitForEvent('filechooser');
	await imgDropZone.click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(`${TESTS_DIR}/images/landscape.jpg`);
	await page.waitForTimeout(IMG_SWAP_DURATION);
	// await expect(img).toHaveAttribute('alt', 'landscape.jpg');
	// await expect(img).toHaveAttribute('title', 'landscape.jpg');
	await expect(firstFilterBtn).toHaveClass(activeFilterClassRegExp);
	await expect(grayscaleFilterBtn).not.toHaveClass(activeFilterClassRegExp);
	await expect(img).toHaveCSS('filter', BASE_CSS_FILTERS);
	await expect(img).toHaveCSS('transform', BASE_CSS_MATRIX);
	await expect(resetFiltersBtn).toBeDisabled();
	// await expect(imgSaveAnchor).toBeDisabled();

	/* Manually reset applied edits */
	await verticalFlipBtn.click();
	await activeFilterRangeInput.fill('150');
	await resetFiltersBtn.click();
	await expect(img).toHaveCSS('filter', BASE_CSS_FILTERS);
	await expect(img).toHaveCSS('transform', BASE_CSS_MATRIX);
	await expect(imgSaveAnchor).toBeDisabled();
	await expect(resetFiltersBtn).toBeDisabled();
});

/* Only works on non-iOS devices. */
test('drag & drop image upload', async ({ page }) => {
	const editOptionsContainer = page.getByRole('group', { name: 'Edit Options' });
	const imageBuffer = fs.readFileSync(`${TESTS_DIR}/images/pickle-rick.webp`);
	const dataTransfer = await page.evaluateHandle((data) => {
		const dt = new DataTransfer();
		const file = new File([data.toString('hex')], 'pickle-rick.webp', { type: 'image/webp' });
		dt.items.add(file);

		return dt;
	}, imageBuffer);

	await page.dispatchEvent('#img_drop_zone', 'drop', { dataTransfer }, { strict: true });
	await expect(editOptionsContainer).toBeEnabled();
});
