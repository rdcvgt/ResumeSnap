import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PersonalDetails from "./PersonalDetails";
import ProfessionalSummary from "./ProfessionalSummary";
import Education from "./Education";
import EmploymentHistory from "./EmploymentHistory";

import "../utils/htmlElement.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Img = styled.img`
	width: 100%;
	height: 100%;
`;

const HideRender = styled.div`
	opacity: 0;
`;

const HidePages = styled.div`
	opacity: 0;
	width: 100%;
`;

const Root = styled.div`
	width: 210mm;
	height: 297mm;
	background-color: #fff;
	border: 1px solid #ccc;
`;

const RenderContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: 0px 50px;
`;

const ResumeContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: 50px;
`;

London.propTypes = {
	inputData: PropTypes.array,
};

const components = {
	PersonalDetails: PersonalDetails,
	ProfessionalSummary: ProfessionalSummary,
	Education: Education,
	EmploymentHistory: EmploymentHistory,
};

const RenderBlocks = ({ inputData }) => {
	return inputData.map((block, index) => {
		const BlockName = block.block;
		const data = block.content;
		const id = block.id;
		const Component = components[BlockName];
		if (!Component) return null;
		return <Component data={data} key={id} />;
	});
};

export default function London({ inputData }) {
	const pageRef = useRef([]);
	const renderContainerRef = useRef();
	const [blocks, setBlocks] = useState([]);
	const currentPageRef = useRef(0);
	const maxPageHeight = 1020;

	/*計算組件、頁面高度與換頁邏輯 */
	useEffect(() => {
		//確認選取到 renderResume 元素
		const renderResume = renderContainerRef.current;
		if (!renderResume) return;

		//確認 renderResume 中已有子節點
		const firstChild = renderResume.children[0];
		if (!firstChild) return;

		const resumeBlock = renderResume.children;
		//每頁會渲染的 html element 會依序儲存在 newBlocks 索引中的陣列
		let newBlocks = [];
		currentPageRef.current = 0;
		let currentHeight = 0;

		//resumeBlock 爲 html collection，需使用解構，每個索引代表每個表單 block
		[...resumeBlock].forEach((block) => {
			const blockItems = block.children;

			//blockItems 爲 html collection，需使用解構，每個索引代表該表單渲染在畫面中的每個子元素
			[...blockItems].forEach((item) => {
				//計算每個 item 最底部的高度
				const itemBottomHeight =
					item.offsetTop - renderResume.offsetTop + item.offsetHeight;

				//如果超過，則頁數 +1 且 currentHeight 疊加 maxPageHeight
				if (currentHeight + maxPageHeight < itemBottomHeight) {
					currentPageRef.current++;
					currentHeight += maxPageHeight;
				}

				//爲新頁數創建陣列
				if (newBlocks[currentPageRef.current] === undefined) {
					newBlocks.push([]);
				}

				//將 item 依序加入指定頁面的陣列中，並轉換爲字串形式，以方便後續 render
				newBlocks[currentPageRef.current].push(item.outerHTML);
			});
		});
		setBlocks(newBlocks);
	}, [inputData]);

	//預覽圖片
	useEffect(() => {
		handlePreviewChange();
	}, [blocks]);

	//將履歷內容轉換成 png 檔並儲存到 state
	const [imgUrl, setImgUrl] = useState("");
	const handlePreviewChange = () => {
		html2canvas(pageRef.current[0]).then((canvas) => {
			const dataUri = canvas.toDataURL("image/jpeg", 0.5);
			setImgUrl(dataUri);
		});
	};

	//下載 PDF
	const downloadPdf = useCallback(() => {
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
					}
				})
			);
		}

		Promise.all(promises).then(() => {
			doc.save("fileName.pdf");
		});
	}, [blocks]);

	return (
		<>
			<button onClick={downloadPdf}>下載 pdf</button>
			{imgUrl && <Img src={imgUrl} alt="圖片" />}
			<HidePages>
				{blocks.map((pages, index) => {
					return (
						<Root
							ref={(pages) => (pageRef.current[index] = pages)}
							key={index}>
							<ResumeContainer>
								{pages.map((block, index) => {
									return (
										<div
											key={index}
											dangerouslySetInnerHTML={{
												__html: block,
											}}></div>
									);
								})}
							</ResumeContainer>
						</Root>
					);
				})}
			</HidePages>

			<HideRender>
				<Root>
					<RenderContainer ref={renderContainerRef}>
						<RenderBlocks inputData={inputData} />
					</RenderContainer>
				</Root>
			</HideRender>
		</>
	);
}

//按鈕可下載 pdf
{
	/* <button onClick={downloadPdf}>下載 pdf</button> */
}
// const downloadPdf = () => {
// 	const doc = new jsPDF();
// 	const pageWidth = doc.internal.pageSize.getWidth();
// 	const pageHeight = doc.internal.pageSize.getHeight();
// 	doc.addImage(imgUrl, "PNG", 0, 0, pageWidth, pageHeight);
// 	doc.save("fileName.pdf");
// };

//初始化或當 block 內容改變時，呼叫 handlePreviewChange;
