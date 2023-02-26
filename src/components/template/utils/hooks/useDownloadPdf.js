import { useCallback } from "react";
import { useSelector } from "react-redux";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function useDownloadPdf(
	pageRef,
	setIsDownloading,
	mainBlocks,
	sideBlocks
) {
	const isDefaultData = useSelector((state) => state.formData.isDefaultData);
	const firstName = useSelector((state) => state.userInfo.firstName);
	const lastName = useSelector((state) => state.userInfo.lastName);

	const mainLength = mainBlocks.length;
	const sideLength = sideBlocks ? sideBlocks.length : 0;
	const maxLength = mainLength >= sideLength ? mainLength : sideLength;

	return useCallback(() => {
		//確保 data 是來自資料庫而不是 redux 預設值
		//確保 pageRef 的陣列長度與 Blocks 的最大長度相符（亦即畫面渲染完成）
		if (
			isDefaultData ||
			pageRef.current.length === 0 ||
			pageRef.current.length !== maxLength
		)
			return;

		//文件初始化
		const doc = new jsPDF();
		const pageWidth = doc.internal.pageSize.getWidth();
		const pageHeight = doc.internal.pageSize.getHeight();
		const promises = [];

		//如果同時存在 main, side 兩種 blocks，則以陣列長度較長（頁數較多者）作爲 pdf 下載的標準
		let renderBlocks;
		if (!sideBlocks) {
			renderBlocks = mainBlocks;
		} else {
			renderBlocks =
				mainBlocks.length >= sideBlocks.length
					? mainBlocks
					: sideBlocks;
		}

		//計算 renderBlocks 的頁數，將每頁 html 轉換成圖片並加入 pdf
		for (let i = 0; i < renderBlocks.length; i++) {
			const index = i;
			promises.push(
				html2canvas(pageRef.current[index], {
					willReadFrequently: true,
				})
					.then((canvas) => {
						console.log(pageRef.current);
						console.log(canvas);
						doc.addImage(
							canvas,
							"PNG",
							0,
							0,
							pageWidth,
							pageHeight
						);
						if (index + 1 < renderBlocks.length) {
							doc.addPage();
						}
					})
					.catch((err) => {
						console.log(err);
					})
			);
		}
		//等待前面程序完成才下載
		Promise.all(promises).then(() => {
			doc.save(`${firstName} ${lastName}_resume.pdf`);
			if (setIsDownloading) {
				setIsDownloading(false);
			}
		});
	}, [pageRef, mainBlocks, sideBlocks]);
}
