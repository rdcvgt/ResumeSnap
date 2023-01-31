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

const Hide = styled.div`
	opacity: 1;
	/* scale: 0.8; */
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

const RenderBlocks = ({ inputData }) => {
	return inputData.map((block, index) => {
		const BlockName = block.block;
		const data = block.content;
		const Component = components[BlockName];
		if (!Component) return null;
		return <Component data={data} key={index} />;
	});
};

export default function London({ inputData }) {
	const componentRef = useRef();
	//初始化或當 block 內容改變時，呼叫 handlePreviewChange;
	useEffect(() => {
		handlePreviewChange();
	}, [inputData]);

	useEffect(() => {
		handlePreviewChange();
	}, []);

	//將履歷內容轉換成 png 檔並儲存到 state
	const [imgUrl, setImgUrl] = useState("");
	const handlePreviewChange = () => {
		html2canvas(componentRef.current).then((canvas) => {
			let imgURL = canvas.toDataURL("image/png");
			setImgUrl(imgURL);
		});
	};

	const downloadPdf = () => {
		const doc = new jsPDF();
		const pageWidth = doc.internal.pageSize.getWidth();
		const pageHeight = doc.internal.pageSize.getHeight();
		doc.addImage(imgUrl, "PNG", 0, 0, pageWidth, pageHeight);
		doc.save("fileName.pdf");
	};

	return (
		<>
			{/* {imgUrl && <Img src={imgUrl} alt="圖片" />} */}
			<Hide>
				<Root ref={componentRef}>
					<ResumeContainer>
						<RenderBlocks inputData={inputData} />
					</ResumeContainer>
				</Root>
			</Hide>
			<button onClick={downloadPdf}>下載 pdf</button>
		</>
	);
}
