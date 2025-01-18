import { test, expect } from 'vitest';
import { imgStore } from '@ts/imgStore.ts';
import { spinModes } from '@ts/constants.ts';
import { spinIsRotation } from '@ts/utils/spinIsRotation.ts';

const rotationModes = spinModes.filter(spinIsRotation);
const flipModes = spinModes.filter((mode) => !spinIsRotation(mode));

test.each(rotationModes)('“%s” updates the rotation degree', (spinMode) => {
	imgStore.updateSpinValue(spinMode);

	const { rotationDeg } = imgStore.state;

	expect(rotationDeg === 0 || rotationDeg % 90 === 0).toBeTruthy();
});

test.each(flipModes)('“%s” updates the flip mode', (spinMode) => {
	imgStore.updateSpinValue(spinMode);

	const { verticalFlip, horizontalFlip } = imgStore.state;

	expect([1, -1]).toContain(verticalFlip);
	expect([1, -1]).toContain(horizontalFlip);
});
