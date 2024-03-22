export const deepCopy = <TObj = object>(obj: TObj): TObj => structuredClone(obj) || JSON.parse(JSON.stringify(obj));
