import { useEffect, useState } from "react";
import html2canvas from "html2canvas";

export default function usePreview(
	pageRef,
	setImgUrl,
	blocks,
	currentPage,
	resumeStyle
) {
	const [timer, setTimer] = useState(null);

	useEffect(() => {
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			html2canvas(pageRef.current[currentPage - 1]).then((canvas) => {
				const dataUri = canvas.toDataURL("image/png", 0.4);
				setImgUrl(dataUri);
			});
		}, 1000);
		setTimer(newTimer);
	}, [blocks, currentPage, pageRef, setImgUrl, resumeStyle]);
}
