export const img = {
	rotationDeg: 0,
	verticalFlip: 1,
	horizontalFlip: 1,
	filters: [
		{
			name: 'brightness',
			max: 200,
			value: 100,
			unit: '%',
		},
		{
			name: 'grayscale',
			max: 100,
			value: 0,
			unit: '%',
		},
		{
			name: 'blur',
			max: 10,
			value: 0,
			unit: 'px',
		},
		{
			name: 'hue-rotate',
			max: 100,
			value: 0,
			unit: 'deg',
		},
		{
			name: 'opacity',
			max: 100,
			value: 100,
			unit: '%',
		},
		{
			name: 'contrast',
			max: 200,
			value: 100,
			unit: '%',
		},
		{
			name: 'saturate',
			max: 200,
			value: 100,
			unit: '%',
		},
		{
			name: 'sepia',
			max: 100,
			value: 0,
			unit: '%',
		},
	],
};

export const imgBaseFilters = structuredClone(img);
