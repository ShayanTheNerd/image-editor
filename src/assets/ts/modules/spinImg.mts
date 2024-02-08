import imgStore from '@ts/imgStore.ts';
import { DOMElements } from '@ts/app.ts';

const { width, height } = DOMElements.selectedImg;

export default function spinImg(event: Event = null) {
	if (event?.target !== event?.currentTarget) {
		const target = event.target as HTMLButtonElement;
		const spinBtn = target.closest('button') as HTMLButtonElement;
		const spinType: string = spinBtn.title.toLowerCase().trim();
		imgStore.spin = spinType;
	}

	const { selectedImg } = DOMElements;
	const { verticalFlip, horizontalFlip, rotationDeg } = imgStore.state;
	selectedImg.style.width = imgStore.isLandscape ? `${height}px` : '100%';
	selectedImg.style.height = imgStore.isLandscape ? `${width}px` : '100%';
	selectedImg.style.transform = `scale(${verticalFlip}, ${horizontalFlip}) rotate(${rotationDeg}deg)`;
}
