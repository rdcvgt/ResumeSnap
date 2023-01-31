import React, { useState, useEffect, useRef } from "react";
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
	scale: 0.1;
`;

const HidePages = styled.div`
	opacity: 1;
	scale: 0.4;
`;

const Root = styled.div`
	width: 210mm;
	height: 297mm;
	background-color: #fff;
	border: 1px solid #ccc;
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

const RenderBlocks = ({ inputData, handleBlockHeight }) => {
	return inputData.map((block, index) => {
		const BlockName = block.block;
		const data = block.content;
		const id = block.id;
		const Component = components[BlockName];
		if (!Component) return null;
		return (
			<Component
				data={data}
				key={index}
				handleBlockHeight={handleBlockHeight}
				blockId={id}
			/>
		);
	});
};

export default function London({ inputData }) {
	const componentRef = useRef();
	const [blockInfo, setBlockInfo] = useState(inputData);

	/*將每個組件的高度，合併至 inputData 並儲存爲新的 state*/
	const handleBlockHeight = (blockHeight) => {
		//同步 inputData 再加上 block 高度
		let updateBlock = inputData;

		//尋找該 blockHeight 與 inputData 相同 id 的索引位置，加入 height
		const index = updateBlock.findIndex((i) => i.id === blockHeight.id);
		updateBlock[index] = {
			...updateBlock[index],
			height: blockHeight.height,
		};
		setBlockInfo(updateBlock);
	};

	const [blocks, setBlocks] = useState([]);
	const currentPageRef = useRef(0);
	const maxPageHeight = 1020;

	/*計算組件、頁面高度與換頁邏輯 */
	useEffect(() => {
		//newBlocks一個索引代表一頁，
		//每頁會渲染的組件依序儲存在索引中的陣列
		let newBlocks = [];
		currentPageRef.current = 0;

		let currentHeight = 0;

		blockInfo.forEach((block, index) => {
			let blockHeight = 0;
			if (block.height) {
				blockHeight = block.height;
			}

			//當前頁面組件總高度 + 新組件高度 > 頁面高度
			//頁面 +1，當前元素高度歸零
			if (currentHeight + blockHeight > maxPageHeight) {
				currentPageRef.current++;
				currentHeight = 0;
			}

			//如果目前 newBlocks 沒有該頁數的索引內容，則新增
			//否則就在該索引的陣列新增組件資訊，並且更新 currentHeight
			if (newBlocks[currentPageRef.current] === undefined) {
				newBlocks.push([]);
			}
			newBlocks[currentPageRef.current].push(block);
			currentHeight += blockHeight;
		});
		setBlocks(newBlocks);
	}, [blockInfo]);

	return (
		<>
			{/* {imgUrl && <Img src={imgUrl} alt="圖片" />} */}
			<HidePages>
				{blocks.map((pages, index) => (
					<Root ref={componentRef} key={index}>
						<ResumeContainer>
							{pages.map((block, index) => {
								const BlockName = block.block;
								const data = block.content;
								const Component = components[BlockName];
								if (!Component) return null;

								return <Component data={data} key={index} />;
							})}
						</ResumeContainer>
					</Root>
				))}
			</HidePages>
			<HideRender>
				<Root>
					<ResumeContainer>
						<RenderBlocks
							inputData={inputData}
							handleBlockHeight={handleBlockHeight}
						/>
					</ResumeContainer>
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
// useEffect(() => {
// 	handlePreviewChange();
// }, [inputData]);

// useEffect(() => {
// 	handlePreviewChange();
// }, []);

// //將履歷內容轉換成 png 檔並儲存到 state
// const [imgUrl, setImgUrl] = useState("");
// const handlePreviewChange = () => {
// 	html2canvas(componentRef.current).then((canvas) => {
// 		let imgURL = canvas.toDataURL("image/png");
// 		setImgUrl(imgURL);
// 	});
// };
