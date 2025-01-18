import type { SpinMode } from '@types';

export function spinIsRotation(spinMode: SpinMode) {
	return spinMode === 'Rotate Right' || spinMode === 'Rotate Left';
}
