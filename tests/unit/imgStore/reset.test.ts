import { test, expect } from 'vitest';
import { imgStore } from '@ts/imgStore.ts';
import { deepClone } from '@ts/utils/deepClone.ts';
import { resetRotationDeg } from '@ts/utils/resetRotationDeg.ts';

test('resets the state', () => {
	const initialState = deepClone(imgStore.state);
	const [name, extension, rotationDeg] = ['New Image', 'png', 180];
	const adjustedRotationDeg = resetRotationDeg(rotationDeg);

	Object.assign(imgStore.state, { name, extension, rotationDeg, verticalFlip: -1 });
	imgStore.reset();

	expect(imgStore.state).toStrictEqual({ ...initialState, name, extension, rotationDeg: adjustedRotationDeg });
});
