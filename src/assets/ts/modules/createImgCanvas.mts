import imgStore from '@ts/imgStore.ts';
import { DOMElements } from '@ts/app.ts';

export default function createImgCanvas() {
	const { selectedImg } = DOMElements;
	const { rotationDeg, verticalFlip, horizontalFlip, CSSFilters } = imgStore.state;
	const rotationRadian: number = (rotationDeg * Math.PI) / 180;

	const canvas = document.createElement('canvas') as HTMLCanvasElement;
	canvas.width = selectedImg.naturalWidth;
	canvas.height = selectedImg.naturalHeight;
	const centerX: number = canvas.width / 2;
	const centerY: number = canvas.height / 2;
	const context: CanvasRenderingContext2D = canvas.getContext('2d');
	context.filter = CSSFilters;

	/* Note: Do not change the order of calling “context” methods. */
	context.translate(verticalFlip === -1 ? canvas.width : 0, horizontalFlip === -1 ? canvas.height : 0);
	context.scale(verticalFlip, horizontalFlip);
	context.translate(centerX, centerY);
	context.rotate(rotationRadian);
	context.drawImage(selectedImg, -centerX, -centerY, canvas.width, canvas.height);

	return canvas;
}
