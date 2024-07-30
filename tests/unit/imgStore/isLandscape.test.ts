import { imgStore } from '@ts/imgStore.ts';
import { it, expect, describe } from 'vitest';

describe('imgStore.isLandscape', () => {
	it('should return “true” if the image has been rotated only by multiples of 90 degrees and not 180 degrees', () => {
		const rotationDegs = [-450, -270, -90, 90, 270, 450] as const;

		rotationDegs.forEach((rotationDeg) => {
			imgStore.state.rotationDeg = rotationDeg;

			expect(imgStore.isLandscape).toBeTruthy();
		});
	});
});
