import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PersonalDetails from "./PersonalDetails";
import ProfessionalSummary from "./ProfessionalSummary";
import Education from "./Education";
import EmploymentHistory from "./EmploymentHistory";
import usePagination from "../utils/hooks/usePagination";
import useDownloadPdf from "../utils/hooks/useDownloadPdf";
import usePreview from "../utils/hooks/usePreview";
import "../utils/htmlElement.css";

const Img = styled.img`
	width: 100%;
	height: 100%;
	position: absolute;
`;

const HideRender = styled.div`
	opacity: 0;
`;

const HidePages = styled.div`
	opacity: 0;
	width: 100%;
`;

const RenderRoot = styled.div`
	width: 210mm;
	height: 297mm;
`;

const Root = styled.div`
	width: 210mm;
	height: 297mm;
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

London.propTypes = {
	inputData: PropTypes.array,
	handleGetDownLoadPdfFunc: PropTypes.func,
	getTotalPage: PropTypes.func,
	currentPage: PropTypes.number,
	setIsDownloading: PropTypes.func,
};

export default function London({
	inputData,
	handleGetDownLoadPdfFunc,
	getTotalPage,
	currentPage,
	setIsDownloading,
}) {
	const pageRef = useRef([]);
	const renderContainerRef = useRef();
	const [blocks, setBlocks] = useState([]);
	const [imgUrl, setImgUrl] = useState("");
	//將履歷內容轉換成 png 檔並儲存到 state
	usePreview(pageRef, setImgUrl, blocks, currentPage);

	//實現分頁邏輯
	usePagination(renderContainerRef, setBlocks, inputData);

	//下載 PDF，回傳給父層，偵測點擊事件
	const downloadPdf = useDownloadPdf(blocks, pageRef, setIsDownloading);
	handleGetDownLoadPdfFunc(downloadPdf);

	useEffect(() => {
		getTotalPage(blocks.length);
	}, [blocks]);

	return (
		<>
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
				<RenderRoot>
					<RenderContainer ref={renderContainerRef}>
						<RenderBlocks inputData={inputData} />
					</RenderContainer>
				</RenderRoot>
			</HideRender>
		</>
	);
}
