import { test, expect } from 'vitest';
import { deepClone } from '@ts/utils/deepClone.ts';

test('creates a deep clone of the given object', () => {
	const obj = {
		a: 1,
		b: true,
		c: 'value',
		d: { e: 'f' },
		g: [1, '2', { h: '3' }],
	};
	const clone = deepClone(obj);

	expect(clone).not.toBe(obj);
	expect(clone).toStrictEqual(obj);
});
