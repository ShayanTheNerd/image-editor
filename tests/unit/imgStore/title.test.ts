import { imgStore } from '@ts/imgStore.ts';
import { it, expect, describe } from 'vitest';

describe('imgStore.title', () => {
	it('should set the name and extension of the image file, and return its full name (name.extension)', () => {
		Object.assign(imgStore.state, { name: 'New Image', extension: 'png' });

		expect(imgStore.title).toMatchInlineSnapshot(`"New Image.png"`);
	});
});
