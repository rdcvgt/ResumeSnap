import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import usePagination from "../utils/hooks/usePagination";
import useDownloadPdf from "../utils/hooks/useDownloadPdf";
import usePreview from "../utils/hooks/usePreview";
import "../utils/htmlElement.css";

import PersonalDetails from "./PersonalDetails";
import ProfessionalSummary from "./ProfessionalSummary";
import Education from "./Education";
import EmploymentHistory from "./EmploymentHistory";
import WebsiteLink from "./WebsiteLink";
import ECActivities from "./ECActivities";
import Internships from "./Internships";
import CustomSection from "./CustomSection";
import Courses from "./Courses";
import Skills from "./Skills";
import Languages from "./Languages";

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
`;

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

London.propTypes = {
	handleGetDownLoadPdfFunc: PropTypes.func,
	getTotalPage: PropTypes.func,
	currentPage: PropTypes.number,
	setIsDownloading: PropTypes.func,
};

export default function London({
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
	usePreview(pageRef, setImgUrl, blocks, currentPage);

	//下載 PDF，回傳給父層，偵測點擊事件
	const downloadPdf = useDownloadPdf(blocks, pageRef, setIsDownloading);
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
