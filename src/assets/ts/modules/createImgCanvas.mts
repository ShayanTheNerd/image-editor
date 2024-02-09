import 'context-filter-polyfill';
import imgStore from '@ts/imgStore.ts';
import { DOMElements } from '@ts/app.ts';

export default function createImgCanvas() {
	const { selectedImg } = DOMElements;
	const { naturalWidth, naturalHeight } = selectedImg;
	const imgIsLandscape = imgStore.isLandscape;
	const { rotationDeg, CSSFilters, verticalFlip, horizontalFlip } = imgStore.state;
	const rotationRadian: number = (rotationDeg * Math.PI) / 180;

	const canvas = document.createElement('canvas') as HTMLCanvasElement;
	canvas.width = imgIsLandscape ? naturalHeight : naturalWidth;
	canvas.height = imgIsLandscape ? naturalWidth : naturalHeight;

	const centerX: number = canvas.width / 2;
	const centerY: number = canvas.height / 2;
	const destinationX: number = -(naturalWidth / 2);
	const destinationY: number = -(naturalHeight / 2);
	const context: CanvasRenderingContext2D = canvas.getContext('2d');

	/* Note: Do not change the order of “context” methods and “filter” property. */
	context.translate(verticalFlip === -1 ? canvas.width : 0, horizontalFlip === -1 ? canvas.height : 0);
	context.filter = CSSFilters;
	context.scale(verticalFlip, horizontalFlip);
	context.translate(centerX, centerY); // translate canvas from the center
	context.rotate(rotationRadian);
	context.drawImage(selectedImg, destinationX, destinationY, naturalWidth, naturalHeight);

	return canvas;
}
