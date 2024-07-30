import { imgStore } from '@ts/imgStore.ts';
import { it, expect, describe } from 'vitest';

describe('imgStore.activeFilter', () => {
	it('should update the active filter based on the given name, and allow access to its properties', () => {
		const activeFilterName = 'grayscale';
		imgStore.activeFilter = activeFilterName;

		expect(imgStore.activeFilter.name).toBe(activeFilterName);
	});
});
