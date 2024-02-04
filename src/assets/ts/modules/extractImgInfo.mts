const lastDotIndex: Function = (string: string) => string.lastIndexOf('.');

export default function extractImgInfo(imgFile: File) {
	const fileName: string = imgFile.name;
	const imgName: string = fileName.substring(0, lastDotIndex(fileName));
	const imgExtension: string = fileName.substring(lastDotIndex(fileName) + 1).toLowerCase();

	return { name: imgName, extension: imgExtension };
}
