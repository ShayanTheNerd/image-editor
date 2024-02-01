import imgStore from '../imgStore.js';
import { DOMElements } from '../app.js';

export default function createImgCanvas() {
	const { selectedImg } = DOMElements;
	const { rotationDeg, verticalFlip, horizontalFlip, CSSFilters } = imgStore.state;
	const rotationRadian = (rotationDeg * Math.PI) / 180;

	const canvas = document.createElement('canvas');
	canvas.width = selectedImg.naturalWidth;
	canvas.height = selectedImg.naturalHeight;
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;
	const context = canvas.getContext('2d');
	context.filter = CSSFilters;

	/* Note: Do not change the order of calling “context” methods. */
	context.translate(verticalFlip === -1 ? canvas.width : 0, horizontalFlip === -1 ? canvas.height : 0);
	context.scale(verticalFlip, horizontalFlip);
	context.translate(centerX, centerY);
	context.rotate(rotationRadian);
	context.drawImage(selectedImg, -centerX, -centerY, canvas.width, canvas.height);

	return canvas;
}
