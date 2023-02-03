import { useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function useDownloadPdf(blocks, pageRef) {
	return useCallback(() => {
		const doc = new jsPDF();
		const pageWidth = doc.internal.pageSize.getWidth();
		const pageHeight = doc.internal.pageSize.getHeight();
		const promises = [];

		for (let i = 0; i < blocks.length; i++) {
			promises.push(
				html2canvas(pageRef.current[i]).then((canvas) => {
					doc.addImage(canvas, "PNG", 0, 0, pageWidth, pageHeight);
					if (i + 1 < blocks.length) {
						doc.addPage();

						console.log(i);
					}
				})
			);
		}

		Promise.all(promises).then(() => {
			doc.save("fileName.pdf");
		});
	}, [blocks, pageRef]);
}
