import 'context-filter-polyfill';

import { imgStore } from '@ts/imgStore.ts';
import { rotationDegs } from '@ts/constants.ts';
import { getImgElement } from '@ts/domElements.ts';

export function createImgCanvas() {
	const imgElement = getImgElement();
	const { naturalWidth, naturalHeight } = imgElement;
	const imgIsLandscape = imgStore.isLandscape;
	const { rotationDeg, CSSFilters, verticalFlip, horizontalFlip } = imgStore.state;
	const rotationRadian = (rotationDeg * Math.PI) / rotationDegs.half;

	const canvas = document.createElement('canvas');
	canvas.width = imgIsLandscape ? naturalHeight : naturalWidth;
	canvas.height = imgIsLandscape ? naturalWidth : naturalHeight;

	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;
	const destinationX = -(naturalWidth / 2);
	const destinationY = -(naturalHeight / 2);
	const context = canvas.getContext('2d') as CanvasRenderingContext2D;

	/* Do not change the order of “context” methods and properties. */
	context.translate(verticalFlip === -1 ? canvas.width : 0, horizontalFlip === -1 ? canvas.height : 0);
	context.filter = CSSFilters;
	context.scale(verticalFlip, horizontalFlip);
	context.translate(centerX, centerY); // Translate canvas from the center
	context.rotate(rotationRadian);
	context.drawImage(imgElement, destinationX, destinationY, naturalWidth, naturalHeight);

	return canvas;
}
