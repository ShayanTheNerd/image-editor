import { it, expect, describe } from 'vitest';
import { spinIsRotation } from '@ts/utils/spinIsRotation.ts';

describe('spinIsRotation', () => {
	it('should return “true” if the given spin mode is a rotation', () => {
		const rotationModes = ['Rotate Right', 'Rotate Left'] as const;

		rotationModes.forEach((rotationMode) => {
			expect(spinIsRotation(rotationMode)).toBeTruthy();
		});
	});
});
