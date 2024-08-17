import { activeFilterClass, imgDownloadTimeoutMS } from '@ts/constants.ts';

const FIXTURES_PATH = 'tests/cypress/fixtures';
const DOWNLOADS_PATH = 'tests/cypress/downloads';
const INITIAL_CSS_MATRIX = 'matrix(1, 0, 0, 1, 0, 0)';
const INITIAL_CSS_FILTERS = 'brightness(1) grayscale(0) blur(0px) hue-rotate(0deg) opacity(1) contrast(1) saturate(1) sepia(0)';

beforeEach(() => {
	cy.visit('/');

	cy.get('[data-test="vertical_flip"]').as('verticalFlipBtn');
	cy.get('[data-test="rotate_right"]').as('rotateRightBtn');
	cy.get('[data-test="grayscale"]').as('grayscaleFilterBtn');
	cy.get('[data-test="img_select_label"]').as('imgSelectLabel');
	cy.get('#filters_container').children().first().as('firstFilterBtn');
});

it('initial UI state', () => {
	cy.get('#edit_options_container').should('be.disabled');
	cy.get('#img_save_anchor').should('have.attr', 'aria-disabled', 'true');
});

it('upload, edit, and download multiple images', () => {
	/* Upload an image. */
	cy.get('@imgSelectLabel').selectFile(`${FIXTURES_PATH}/pickle-rick.webp`).trigger('cancel');
	cy.get('@imgSelectLabel').selectFile(`${FIXTURES_PATH}/pickle-rick.webp`);
	cy.get('#edit_options_container').should('be.enabled');
	cy.get('#reset_filters_btn').should('be.disabled');
	cy.get('#img_save_anchor').should('have.attr', 'aria-disabled', 'true');
	cy.get('#img').should('have.attr', 'alt', 'pickle-rick.webp').and('have.attr', 'title', 'pickle-rick.webp');

	/* Edit the uploaded image. */
	cy.get('@verticalFlipBtn').click();
	cy.get('@rotateRightBtn').click();
	cy.get('@grayscaleFilterBtn').click();
	cy.get('#active_filter_range_input').invoke('val', 100);
	cy.get('#active_filter_range_input').trigger('input');
	cy.get('#reset_filters_btn').should('be.enabled');
	cy.get('#img_save_anchor').should('have.attr', 'aria-disabled', 'false');
	cy.get('@firstFilterBtn').should('not.have.class', activeFilterClass);
	cy.get('@grayscaleFilterBtn').should('have.class', activeFilterClass);
	cy.get('#img').should('have.css', 'transform', 'matrix(0, 1, 1, 0, 0, 0)');
	cy.get('#img').should('have.css', 'filter', 'brightness(1) grayscale(1) blur(0px) hue-rotate(0deg) opacity(1) contrast(1) saturate(1) sepia(0)');

	/* Download the edited image. */
	cy.get('#img_save_anchor').click();
	cy.get('#img_save_anchor').should('have.text', 'Saving...');
	cy.get('#img_save_anchor').should('have.attr', 'aria-disabled', 'true');
	cy.wait(imgDownloadTimeoutMS);
	cy.get('#img_save_anchor').should('have.text', 'Save Image');
	cy.readFile(`${DOWNLOADS_PATH}/pickle-rick (edited).webp`).should('exist');

	/* Upload another image. */
	cy.get('#img_drop_zone').selectFile(`${FIXTURES_PATH}/landscape.jpg`, { action: 'drag-drop' });
	cy.get('@firstFilterBtn').should('have.class', activeFilterClass);
	cy.get('@grayscaleFilterBtn').should('not.have.class', activeFilterClass);
	cy.get('#filters_container').should(({ 0: filtersContainer }) => {
		expect(filtersContainer?.scrollLeft).to.equal(0);
	});

	/* Manually reset applied edits. */
	cy.get('@rotateRightBtn').click();
	cy.get('@grayscaleFilterBtn').click();
	cy.get('#active_filter_range_input').invoke('val', 100);
	cy.get('#active_filter_range_input').trigger('input');
	cy.get('#reset_filters_btn').click();
	cy.get('#reset_filters_btn').should('be.disabled');
	cy.get('#img_save_anchor').should('have.attr', 'aria-disabled', 'true');
	cy.get('#img').should('have.css', 'transform', INITIAL_CSS_MATRIX);
	cy.get('#img').should('have.css', 'filter', INITIAL_CSS_FILTERS);
});
