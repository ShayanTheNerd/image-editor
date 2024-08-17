import { test, expect } from 'vitest';
import { imgStore } from '@ts/imgStore.ts';

test('updates the active filter based on the given name, and allows access to its properties', () => {
	const activeFilterName = 'grayscale';
	imgStore.activeFilter = activeFilterName;

	expect(imgStore.activeFilter.name).toBe(activeFilterName);
});
