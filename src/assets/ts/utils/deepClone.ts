export function deepClone<T = object>(obj: T) {
	const clone = structuredClone(obj) || JSON.parse(JSON.stringify(obj)) as T;

	return clone;
}
