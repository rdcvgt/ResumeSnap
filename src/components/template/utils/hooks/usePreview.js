import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";

export default function usePreview(
	pageRef,
	setImgUrl,
	currentPage,
	mainBlocks,
	sideBlocks
) {
	const [timer, setTimer] = useState(null);
	const currentTemplate = useSelector((state) => state.formData.template);
	const currentColor = useSelector((state) => state.formData.color);

	useEffect(() => {
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			html2canvas(pageRef.current[currentPage - 1], {
				useCORS: true,
				allowTaint: true,
			}).then((canvas) => {
				const dataUri = canvas.toDataURL("image/png", 0.4);
				setImgUrl(dataUri);
			});
		}, 700);
		setTimer(newTimer);
	}, [
		currentTemplate,
		currentColor,
		pageRef,
		setImgUrl,
		currentPage,
		mainBlocks,
		sideBlocks,
	]);
}
