import type { SpinMode } from '@types';

export function spinIsRotation(spinMode: SpinMode) {
	return spinMode.toLowerCase().includes('rotate');
}
