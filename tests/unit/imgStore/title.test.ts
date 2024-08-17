import { test, expect } from 'vitest';
import { imgStore } from '@ts/imgStore.ts';

test('sets the name and the extension of the image file, then returns “name.extension”', () => {
	Object.assign(imgStore.state, { name: 'New Image', extension: 'png' });

	expect(imgStore.title).toMatchInlineSnapshot(`"New Image.png"`);
});
