import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import usePagination from "../utils/hooks/usePagination";
import useDownloadPdf from "../utils/hooks/useDownloadPdf";
import usePreview from "../utils/hooks/usePreview";
import "../utils/htmlElement.css";

import PersonalDetails from "./resumeBlocks/PersonalDetails";
import ProfessionalSummary from "./resumeBlocks/ProfessionalSummary";
import Education from "./resumeBlocks/Education";
import EmploymentHistory from "./resumeBlocks/EmploymentHistory";
import WebsiteLink from "./resumeBlocks/WebsiteLink";
import ECActivities from "./resumeBlocks/ECActivities";
import Internships from "./resumeBlocks/Internships";
import CustomSection from "./resumeBlocks/CustomSection";
import Courses from "./resumeBlocks/Courses";
import Skills from "./resumeBlocks/Skills";
import Languages from "./resumeBlocks/Languages";

const components = {
	PersonalDetails: PersonalDetails,
	ProfessionalSummary: ProfessionalSummary,
	Education: Education,
	EmploymentHistory: EmploymentHistory,
	WebsiteLink: WebsiteLink,
	ECActivities: ECActivities,
	Internships: Internships,
	CustomSection: CustomSection,
	Courses: Courses,
	Skills: Skills,
	Languages: Languages,
};

const TemplateRoot = styled.div`
	font-family: serif;
`;

const Img = styled.img`
	width: 100%;
	height: 100%;
	position: absolute;
	opacity: 1;
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
	position: relative;
	/* background-color: #fff; */
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
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
`;

const ResumeBackground = styled.div``;

const RenderBlocks = ({ formBlocks }) => {
	return formBlocks.map((block) => {
		const BlockName = block.block;
		const content = block.content;
		const id = block.id;
		const Component = components[BlockName];
		if (!Component) return null;
		return <Component content={content} key={id} />;
	});
};

RenderTemplate.propTypes = {
	handleGetDownLoadPdfFunc: PropTypes.func,
	getTotalPage: PropTypes.func,
	currentPage: PropTypes.number,
	setIsDownloading: PropTypes.func,
};

export default function RenderTemplate({
	handleGetDownLoadPdfFunc,
	getTotalPage,
	currentPage,
	setIsDownloading,
}) {
	const [blocks, setBlocks] = useState([]);
	const [imgUrl, setImgUrl] = useState("");
	const pageRef = useRef([]);
	const renderContainerRef = useRef();

	const formBlocks = useSelector((state) => state.formData.formBlocks);

	//實現分頁邏輯
	usePagination(renderContainerRef, setBlocks, formBlocks);

	//將履歷內容轉換成 png 檔並儲存到 state
	usePreview(pageRef, setImgUrl, currentPage, blocks);

	//下載 PDF，回傳給父層，偵測點擊事件
	const downloadPdf = useDownloadPdf(pageRef, setIsDownloading, blocks);
	handleGetDownLoadPdfFunc(downloadPdf);

	useEffect(() => {
		getTotalPage(blocks.length);
	}, [blocks]);

	return (
		<TemplateRoot>
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
							<ResumeBackground />
						</Root>
					);
				})}
			</HidePages>

			<HideRender>
				<RenderRoot>
					<RenderContainer ref={renderContainerRef}>
						<RenderBlocks formBlocks={formBlocks} />
					</RenderContainer>
				</RenderRoot>
			</HideRender>
		</TemplateRoot>
	);
}
