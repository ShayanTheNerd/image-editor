import { test, expect } from 'vitest';
import { imgStore } from '@ts/imgStore.ts';

const rotationDegs = [-450, -270, -90, 90, 270, 450] as const;

test.each(rotationDegs)('%i° is a multiple of 90°, but not that of 180°; so the image is landscaped', (rotationDeg) => {
	imgStore.state.rotationDeg = rotationDeg;

	expect(imgStore.isLandscape).toBeTruthy();
});
