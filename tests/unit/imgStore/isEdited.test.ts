import { test, expect } from 'vitest';
import { imgStore } from '@ts/imgStore.ts';

const rotationDegs = [-450, -270, -180, -90, 90, 180, 270, 450] as const;

test.each(rotationDegs)('%i° rotates the image', (rotationDeg) => {
	imgStore.state.rotationDeg = rotationDeg;

	expect(imgStore.isEdited).toBeTruthy();
});
