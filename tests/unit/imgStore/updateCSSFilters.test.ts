import type { Filter } from '@types';

import { test, expect } from 'vitest';
import { imgStore } from '@ts/imgStore.ts';

test('creates the CSS filters string corresponding with filter values', () => {
	const grayscaleFilter = imgStore.state.filters.find(({ name }) => name === 'grayscale') as Filter;
	grayscaleFilter.value = 50;
	imgStore.updateCSSFilters();

	const { CSSFilters } = imgStore.state;

	expect(CSSFilters).toMatchInlineSnapshot(`"brightness(100%)grayscale(50%)blur(0px)hue-rotate(0deg)opacity(100%)contrast(100%)saturate(100%)sepia(0%)"`);
});
