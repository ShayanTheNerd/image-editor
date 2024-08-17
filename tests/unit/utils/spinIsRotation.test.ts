import { test, expect } from 'vitest';
import { spinIsRotation } from '@ts/utils/spinIsRotation.ts';

const rotationModes = ['Rotate Right', 'Rotate Left'] as const;

test.each(rotationModes)('“%s” is a rotation', (rotationMode) => {
	expect(spinIsRotation(rotationMode)).toBeTruthy();
});
