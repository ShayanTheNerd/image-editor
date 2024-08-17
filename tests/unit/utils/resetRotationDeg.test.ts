import { test, expect } from 'vitest';
import { resetRotationDeg } from '@ts/utils/resetRotationDeg.ts';
import { rotationDegs as baseRotationDegs } from '@ts/constants.ts';

const rotationDegs = [-450, -360, -270, -180, -90, 0, 90, 180, 270, 360, 450];

test.each(rotationDegs)('%i° is reset to a multiple of 360°', (rotationDeg) => {
	const adjustedRotationDeg = resetRotationDeg(rotationDeg);

	expect(adjustedRotationDeg % baseRotationDegs.full).toBe(0);
});
