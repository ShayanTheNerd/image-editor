import { imgStore } from '@ts/imgStore.ts';
import { spinModes } from '@ts/constants.ts';
import { it, expect, describe } from 'vitest';
import { spinIsRotation } from '@ts/utils/spinIsRotation.ts';

describe('imgStore.updateSpinValue', () => {
	it('should update the rotation degree and vertical/horizontal flip values', () => {
		spinModes.forEach((spinMode) => {
			imgStore.updateSpinValue(spinMode);

			const { rotationDeg, verticalFlip, horizontalFlip } = imgStore.state;

			if (spinIsRotation(spinMode)) {
				expect(rotationDeg === 0 || rotationDeg % 90 === 0).toBeTruthy();
			} else {
				expect([1, -1]).toContain(verticalFlip);
				expect([1, -1]).toContain(horizontalFlip);
			}
		});
	});
});
