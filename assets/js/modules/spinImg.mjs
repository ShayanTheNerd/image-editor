import imgStore from '../imgStore.js';
import { DOMElements } from '../app.js';

export default function spinImg(event = null) {
	if (event?.target !== event?.currentTarget) {
		const spinType = event.target.closest('button').title.toLowerCase();
		imgStore.spin = spinType;
	}

	const { verticalFlip, horizontalFlip, rotationDeg } = imgStore.state;
	DOMElements.selectedImg.style.transform = `scale(${verticalFlip}, ${horizontalFlip}) rotate(${rotationDeg}deg)`;
}
