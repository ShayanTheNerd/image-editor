import { test, expect } from 'vitest';
import { imgStore } from '@ts/imgStore.ts';
import { spinModes } from '@ts/constants.ts';
import { spinIsRotation } from '@ts/utils/spinIsRotation.ts';

test.each(spinModes)('“%s” updates the rotation degree or vertical/horizontal flip', (spinMode) => {
	imgStore.updateSpinValue(spinMode);

	const { rotationDeg, verticalFlip, horizontalFlip } = imgStore.state;

	// eslint-disable-next-line test/no-conditional-in-test
	if (spinIsRotation(spinMode)) {
		expect(rotationDeg === 0 || rotationDeg % 90 === 0).toBeTruthy();
	} else {
		expect([1, -1]).toContain(verticalFlip);
		expect([1, -1]).toContain(horizontalFlip);
	}
});
