import { it, expect, describe } from 'vitest';
import { resetRotationDeg } from '@ts/utils/resetRotationDeg.ts';

describe('resetRotationDeg', () => {
	it('should reset the rotation degree to a multiple of 360 degrees', () => {
		const fullRotationDeg = 360;
		const rotationDegs = [-450, -360, -270, -180, -90, 0, 90, 180, 270, 360, 450];

		rotationDegs.forEach((rotationDeg) => {
			const adjustedRotationDeg = resetRotationDeg(rotationDeg);

			expect(adjustedRotationDeg % fullRotationDeg).toBe(0);
		});
	});
});
