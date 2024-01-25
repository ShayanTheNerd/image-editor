import { img as image } from '../imgFilters.js';
import { imgFileName, imgFileExtension } from './render-img.mjs';
import { cssFilterProperties } from './apply-filters.mjs';

export default function drawAndDownloadImg(editedImg) {
	const canvas = drawCanvas(editedImg, cssFilterProperties);

	downloadCanvasImg(canvas);
}

// draw a canvas image based on filters and spins applied to the image
function drawCanvas(img, filters) {
	const canvas = document.createElement('canvas');
	const ctx2d = canvas.getContext('2d');

	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;
	ctx2d.filter = filters;

	const cx = canvas.width / 2;
	const cy = canvas.height / 2;
	const radians = (image.rotationDeg * Math.PI) / 180;

	// flip vertically
	if (image.verticalFlip === -1) {
		ctx2d.translate(canvas.width, 0);
		ctx2d.scale(-1, 1);
	}

	// flip horizontally
	if (image.horizontalFlip === -1) {
		ctx2d.translate(0, canvas.height);
		ctx2d.scale(1, -1);
	}

	// rotate and draw
	ctx2d.translate(cx, cy);
	ctx2d.rotate(radians);
	ctx2d.drawImage(img, -cx, -cy, canvas.width, canvas.height);

	return canvas;
}

// create a link and download the canvas image
const link = document.getElementById('img_save_btn');
function downloadCanvasImg(canvas) {
	link.download = `${imgFileName} (edited).${imgFileExtension}`;
	link.href = canvas.toDataURL();
}
