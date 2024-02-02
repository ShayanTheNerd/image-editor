import imgStore from '@ts/imgStore.ts';
import { DOMElements } from '@ts/app.ts';

export default function spinImg(event: Event = null) {
	if (event?.target !== event?.currentTarget) {
		const target = event.target as HTMLButtonElement;
		const spinBtn = target.closest('button') as HTMLButtonElement;
		const spinType: string = spinBtn.title.toLowerCase();
		imgStore.spin = spinType;
	}

	const { verticalFlip, horizontalFlip, rotationDeg } = imgStore.state;
	DOMElements.selectedImg.style.transform = `scale(${verticalFlip}, ${horizontalFlip}) rotate(${rotationDeg}deg)`;
}
