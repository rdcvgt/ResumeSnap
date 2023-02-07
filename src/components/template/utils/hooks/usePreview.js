import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";

export default function usePreview(pageRef, setImgUrl, blocks, currentPage) {
	const [timer, setTimer] = useState(null);
	const currentTemplate = useSelector((state) => state.formData.template);
	const currentColor = useSelector((state) => state.formData.color);

	useEffect(() => {
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			html2canvas(pageRef.current[currentPage - 1]).then((canvas) => {
				const dataUri = canvas.toDataURL("image/png", 0.4);
				setImgUrl(dataUri);
			});
		}, 500);
		setTimer(newTimer);
	}, [
		blocks,
		currentPage,
		pageRef,
		setImgUrl,
		currentTemplate,
		currentColor,
	]);
}
