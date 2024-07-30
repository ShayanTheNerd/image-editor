import { rotationDegs } from '@ts/constants.ts';

const fullRotationDeg = rotationDegs.full;

export function resetRotationDeg(rotationDeg: number) {
	const rotationQuotient = Math.round(rotationDeg / fullRotationDeg);

	return Math.abs(rotationQuotient * fullRotationDeg);
}
