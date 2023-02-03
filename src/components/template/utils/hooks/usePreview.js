import { useEffect } from "react";
import html2canvas from "html2canvas";

export default function usePreview(pageRef, setImgUrl, blocks, currentPage) {
	useEffect(() => {
		console.log(currentPage - 1);
		html2canvas(pageRef.current[currentPage - 1]).then((canvas) => {
			const dataUri = canvas.toDataURL("image/png", 0.4);
			setImgUrl(dataUri);
		});
	}, [blocks, currentPage, pageRef, setImgUrl]);
}
