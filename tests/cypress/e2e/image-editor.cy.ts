import { activeFilterClass, imgDownloadTimeoutMS } from '@ts/constants.ts';

before(() => {
	cy.visit('/');

	cy.get('[data-test="rotate_left"]').as('rotateLeftBtn');
	cy.get('[data-test="vertical_flip"]').as('verticalFlipBtn');
	cy.get('[data-test="rotate_right"]').as('rotateRightBtn');
	cy.get('[data-test="grayscale"]').as('grayscaleFilterBtn');
	cy.get('[data-test="img_select_label"]').as('imgSelectLabel');
	cy.get('#filters_container').children().first().as('firstFilterBtn');
});

it('goes through the process of uploading, editing, and downloading multiple images', () => {
	/* Initial state */
	cy.get('#edit_options_container').should('be.disabled');
	cy.get('#img_save_anchor').should('have.attr', 'aria-disabled', 'true');

	/* Upload an image */
	cy.get('@imgSelectLabel').selectFile('tests/cypress/fixtures/sh.png').trigger('cancel');
	cy.get('@imgSelectLabel').selectFile('tests/cypress/fixtures/pickle-rick.webp');
	cy.get('#edit_options_container').should('be.enabled');
	cy.get('#reset_filters_btn').should('be.disabled');
	cy.get('#img_save_anchor').should('have.attr', 'aria-disabled', 'true');
	cy.get('#img').should('have.attr', 'alt', 'pickle-rick.webp').and('have.attr', 'title', 'pickle-rick.webp');

	/* Edit the uploaded image */
	cy.get('@grayscaleFilterBtn').click();
	cy.get('@firstFilterBtn').should('not.have.class', activeFilterClass);
	cy.get('@grayscaleFilterBtn').should('have.class', activeFilterClass);
	cy.get('#active_filter_range_input').invoke('val', 100);
	cy.get('#active_filter_range_input').trigger('input');
	cy.get('#img').should('have.css', 'filter', 'brightness(1) grayscale(1) blur(0px) hue-rotate(0deg) opacity(1) contrast(1) saturate(1) sepia(0)');
	cy.get('#reset_filters_btn').should('be.enabled');
	cy.get('#img_save_anchor').should('have.attr', 'aria-disabled', 'false');
	cy.get('@rotateRightBtn').click();
	cy.get('@verticalFlipBtn').click();
	cy.get('#img').should('have.css', 'transform', 'matrix(0, 1, 1, 0, 0, 0)');

	/* Download the edited image */
	cy.get('#img_save_anchor').click();
	cy.get('#img_save_anchor').should('have.text', 'Saving...');
	cy.get('#img_save_anchor').should('have.attr', 'aria-disabled', 'true');
	cy.wait(imgDownloadTimeoutMS);
	cy.get('#img_save_anchor').should('have.text', 'Save Image');
	cy.readFile('tests/cypress/downloads/pickle-rick (edited).webp');

	/* Upload another image */
	cy.get('#img_drop_zone').selectFile('tests/cypress/fixtures/landscape.jpg', { action: 'drag-drop' });
	cy.get('@grayscaleFilterBtn').should('not.have.class', activeFilterClass);
	cy.get('@firstFilterBtn').should('have.class', activeFilterClass);

	cy.get('#filters_container').should(({ 0: filtersContainer }) => {
		expect(filtersContainer?.scrollLeft).to.equal(0);
	});

	/* Manually reset edits */
	cy.get('@rotateLeftBtn').click();
	cy.get('#img').should('have.css', 'transform', 'matrix(0, -1, 1, 0, 0, 0)');
	cy.get('#reset_filters_btn').click();
	cy.get('#img').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
	cy.get('#reset_filters_btn').should('be.disabled');
	cy.get('#img_save_anchor').should('have.attr', 'aria-disabled', 'true');
});
