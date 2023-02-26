import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { uploadResumePreview } from "../../../../utils/firebase/storage";

export default function useSaveResumePreview(
	uid,
	resumeId,
	pageFrom,
	pageRef,
	mainBlocks,
	sideBlocks
) {
	const [timer, setTimer] = useState(null);
	const currentTemplate = useSelector((state) => state.formData.template);
	const currentColor = useSelector((state) => state.formData.color);

	useEffect(() => {
		if ((pageFrom !== "edit" && uid) || !pageRef.current) return;
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			html2canvas(pageRef.current[0], {
				useCORS: true,
				allowTaint: true,
			}).then(
				(canvas) => {
					canvas.toBlob((blob) => {
						uploadResumePreview(uid, resumeId, blob);
					});
				},
				"image/png",
				0.1
			);
		}, 3000);
		setTimer(newTimer);
	}, [currentTemplate, currentColor, pageRef, mainBlocks, sideBlocks]);
}
