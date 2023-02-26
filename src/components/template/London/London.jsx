import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import usePagination from "../utils/hooks/usePagination";
import useDownloadPdf from "../utils/hooks/useDownloadPdf";
import usePreview from "../utils/hooks/usePreview";
import useSaveResumePreview from "../utils/hooks/useSaveResumePreview";
import "../utils/htmlElement.css";
import { auth } from "../../../utils/firebase/firebaseInit";

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
	top: 0;
	right: 0;
	position: absolute;
	scale: 0.1;
`;

const HidePages = styled.div`
	opacity: ${(props) => (props.pageFrom === "share" ? "1" : "0")};
	width: 100%;
`;

const Root = styled.div`
	width: 210mm;
	height: 297mm;
	position: relative;
	margin-bottom: 50px;
	background-color: ${(props) =>
		props.pageFrom === "share" ? "#fff" : "none"};
	box-shadow: ${(props) =>
		props.pageFrom === "share"
			? "5px 5px 20px rgba(43, 49, 108, 0.2);"
			: "none"};

	& a {
		color: #000;
	}
`;

const RenderRoot = styled.div`
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
	pageFrom: PropTypes.string,
	handleGetDownLoadPdfFunc: PropTypes.func,
	getTotalPage: PropTypes.func,
	currentPage: PropTypes.number,
	setIsDownloading: PropTypes.func,
};

export default function RenderTemplate({
	pageFrom,
	handleGetDownLoadPdfFunc,
	getTotalPage,
	currentPage,
	setIsDownloading,
}) {
	const [blocks, setBlocks] = useState([]);
	const [imgUrl, setImgUrl] = useState("");
	const [uid, setUid] = useState(null);
	const pageRef = useRef([]);
	const renderContainerRef = useRef();

	const { resumeId } = useParams();
	const formBlocks = useSelector((state) => state.formData.formBlocks);

	//實現分頁邏輯
	usePagination(renderContainerRef, setBlocks, formBlocks);

	//獲取使用者登入 uid
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) return;
			const userId = user.uid;
			setUid(userId);
		});
	}, []);

	//將履歷的首頁預覽圖存入資料庫
	useSaveResumePreview(uid, resumeId, pageFrom, pageRef, blocks);

	//將履歷內容轉換成 png 檔並儲存到 state
	usePreview(pageRef, setImgUrl, currentPage, blocks);

	//下載 PDF，回傳給父層，偵測點擊事件
	const downloadPdf = useDownloadPdf(pageRef, setIsDownloading, blocks);
	if (handleGetDownLoadPdfFunc) {
		handleGetDownLoadPdfFunc(downloadPdf);
	}

	useEffect(() => {
		if (!getTotalPage) return;
		getTotalPage(blocks.length);
	}, [blocks]);

	return (
		<TemplateRoot>
			{imgUrl && pageFrom && <Img src={imgUrl} alt="圖片" />}
			<HidePages pageFrom={pageFrom}>
				{blocks.map((pages, index) => {
					return (
						<Root
							pageFrom={pageFrom}
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
