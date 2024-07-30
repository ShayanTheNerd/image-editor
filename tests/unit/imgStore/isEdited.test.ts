import { imgStore } from '@ts/imgStore.ts';
import { it, expect, describe } from 'vitest';

describe('imgStore.isEdited', () => {
	it('should return “true” if the image has been rotated', () => {
		const rotationDegs = [-450, -270, -180, -90, 90, 180, 270, 450] as const;

		rotationDegs.forEach((rotationDeg) => {
			imgStore.state.rotationDeg = rotationDeg;

			expect(imgStore.isEdited).toBeTruthy();
		});
	});
});
