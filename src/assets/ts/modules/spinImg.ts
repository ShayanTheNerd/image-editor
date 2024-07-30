import { imgStore } from '@ts/imgStore.ts';
import { DOMElements, getImgElement } from '@ts/domElements.ts';

const { width: imgContainerWidth, height: imgContainerHeight } = DOMElements.imgDropZone.getBoundingClientRect();

export function spinImg() {
	const imgElement = getImgElement();
	const { verticalFlip, horizontalFlip, rotationDeg } = imgStore.state;

	imgElement.style.width = imgStore.isLandscape ? `${imgContainerHeight}px` : '100%';
	imgElement.style.height = imgStore.isLandscape ? `${imgContainerWidth}px` : '100%';
	imgElement.style.transform = `scale(${verticalFlip}, ${horizontalFlip}) rotate(${rotationDeg}deg)`;
}
