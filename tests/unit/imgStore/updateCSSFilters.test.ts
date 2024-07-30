import { imgStore } from '@ts/imgStore.ts';
import { it, expect, describe } from 'vitest';

describe('imgStore.updateCSSFilters', () => {
	it('should create and/or update the CSS filters string corresponding with filter values', () => {
		imgStore.state.filters.find(({ name }) => name === 'grayscale')!.value = 50;
		imgStore.updateCSSFilters();
		const { CSSFilters } = imgStore.state;

		expect(CSSFilters).toMatchInlineSnapshot(`"brightness(100%)grayscale(50%)blur(0px)hue-rotate(0deg)opacity(100%)contrast(100%)saturate(100%)sepia(0%)"`);
	});
});
