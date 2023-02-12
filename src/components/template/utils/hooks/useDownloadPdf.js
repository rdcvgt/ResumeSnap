import { useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function useDownloadPdf(
	pageRef,
	setIsDownloading,
	mainBlocks,
	sideBlocks
) {
	return useCallback(() => {
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
			promises.push(
				html2canvas(pageRef.current[i]).then((canvas) => {
					doc.addImage(canvas, "PNG", 0, 0, pageWidth, pageHeight);
					if (i + 1 < renderBlocks.length) {
						doc.addPage();
					}
				})
			);
		}

		//等待前面程序完成才下載
		Promise.all(promises).then(() => {
			doc.save("fileName.pdf");
			setIsDownloading(false);
		});
	}, [mainBlocks, pageRef]);
}
