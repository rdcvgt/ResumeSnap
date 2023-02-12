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

const leftAreaComponents = {
	ProfessionalSummary: ProfessionalSummary,
	Education: Education,
	EmploymentHistory: EmploymentHistory,
	ECActivities: ECActivities,
	Internships: Internships,
	CustomSection: CustomSection,
	Courses: Courses,
};

const rightAreaComponents = {
	PersonalDetails: PersonalDetails,
	WebsiteLink: WebsiteLink,
	Skills: Skills,
	Languages: Languages,
};

const TemplateRoot = styled.div`
	font-family: serif;
`;

const Img = styled.img`
	width: 101%;
	height: 101%;
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
	position: relative;
`;

const Root = styled.div`
	width: 210mm;
	height: 297mm;
	position: relative;
`;

const RenderContainer = styled.div`
	width: 65%;
	height: 100%;
	padding: 0px 50px;
	position: absolute;
	top: 0;
	left: 0;
`;

const RenderBackground = styled.div`
	position: absolute;
	padding: 0px 30px;
	top: 0;
	right: 0;
	height: 100%;
	width: 35%;
	overflow-wrap: break-word;
`;

const ResumeContainer = styled.div`
	width: 65%;
	height: 100%;
	padding: 50px 40px;
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
`;

const ResumeBackground = styled.div`
	position: absolute;
	padding: 50px 30px;
	top: 0;
	right: 0;
	height: 100%;
	width: 35%;
	background-color: ${(props) => props.color};
`;

const Block = styled.div`
	display: inline;
`;

const Main = styled.div`
	display: block;
	width: 100%;
	height: 55px;
	margin-bottom: 30px;
	overflow-wrap: break-word;
`;

const Name = styled.div`
	font-family: "PT Sans Narrow", sans-serif;
	font-size: 30px;
	margin-bottom: 5px;
`;

const Position = styled.div`
	font-family: "Open Sans", sans-serif;
	font-size: 9px;
	text-transform: uppercase;
`;

const MarginTop = styled.div`
	margin-top: 85px;
	width: 100%;
`;

const RenderBlocks = ({ formBlocks, components }) => {
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
	const [leftAreaBlocks, setLeftAreaBlocks] = useState([]);
	const [rightAreaBlocks, setRightAreaBlocks] = useState([]);
	const [imgUrl, setImgUrl] = useState("");
	const pageRef = useRef([]);
	const renderContainerRef = useRef();
	const renderBackgroundRef = useRef();

	const formBlocks = useSelector((state) => state.formData.formBlocks);
	const color = useSelector((state) => state.formData.color);
	const firstName = formBlocks[0].content.inputData?.firstName;
	const lastName = formBlocks[0].content.inputData?.lastName;
	const position = formBlocks[0].content.inputData?.position;

	//實現分頁邏輯
	usePagination(renderContainerRef, setLeftAreaBlocks, formBlocks);
	usePagination(renderBackgroundRef, setRightAreaBlocks, formBlocks);
	console.log(rightAreaBlocks);

	//將履歷內容轉換成 png 檔並儲存到 state
	usePreview(
		pageRef,
		setImgUrl,
		currentPage,
		leftAreaBlocks,
		rightAreaBlocks
	);

	//下載 PDF，回傳給父層，偵測點擊事件
	const downloadPdf = useDownloadPdf(
		pageRef,
		setIsDownloading,
		leftAreaBlocks,
		rightAreaBlocks
	);

	console.log(rightAreaBlocks);

	handleGetDownLoadPdfFunc(downloadPdf);

	useEffect(() => {
		if (leftAreaBlocks.length >= rightAreaBlocks.length) {
			getTotalPage(leftAreaBlocks.length);
		} else {
			getTotalPage(rightAreaBlocks.length);
		}
	}, [leftAreaBlocks, rightAreaBlocks]);

	return (
		<TemplateRoot>
			{imgUrl && <Img src={imgUrl} alt="圖片" />}
			<HidePages>
				{leftAreaBlocks.length >= rightAreaBlocks.length &&
					leftAreaBlocks.map((pages, index) => {
						return (
							<Root
								ref={(pages) =>
									(pageRef.current[index] = pages)
								}
								key={index}>
								<ResumeContainer>
									{pages.map((block, index) => {
										return (
											<Block
												key={index}
												dangerouslySetInnerHTML={{
													__html: block,
												}}></Block>
										);
									})}
								</ResumeContainer>
								<ResumeBackground color={color}>
									{rightAreaBlocks[index] &&
										rightAreaBlocks[index].map(
											(block, index) => {
												return (
													<Block
														key={index}
														dangerouslySetInnerHTML={{
															__html: block,
														}}></Block>
												);
											}
										)}
								</ResumeBackground>
							</Root>
						);
					})}
				{leftAreaBlocks.length < rightAreaBlocks.length &&
					rightAreaBlocks.map((pages, index) => {
						return (
							<Root
								ref={(pages) =>
									(pageRef.current[index] = pages)
								}
								key={index}>
								<ResumeContainer>
									{leftAreaBlocks[index] &&
										leftAreaBlocks[index].map(
											(block, index) => {
												return (
													<Block
														key={index}
														dangerouslySetInnerHTML={{
															__html: block,
														}}></Block>
												);
											}
										)}
								</ResumeContainer>
								<ResumeBackground color={color}>
									{pages.map((block, index) => {
										return (
											<Block
												key={index}
												dangerouslySetInnerHTML={{
													__html: block,
												}}></Block>
										);
									})}
								</ResumeBackground>
							</Root>
						);
					})}
			</HidePages>

			<HideRender>
				<RenderRoot>
					<RenderContainer ref={renderContainerRef}>
						<div>
							{(firstName || lastName || position) && (
								<Main>
									<Name>
										{firstName}
										{firstName && lastName && " "}
										{lastName}
									</Name>
									<Position>{position}</Position>
								</Main>
							)}
						</div>
						<RenderBlocks
							formBlocks={formBlocks}
							components={leftAreaComponents}
						/>
					</RenderContainer>
					<RenderBackground ref={renderBackgroundRef} color={color}>
						<div>
							<MarginTop />
						</div>

						<RenderBlocks
							formBlocks={formBlocks}
							components={rightAreaComponents}
						/>
					</RenderBackground>
				</RenderRoot>
			</HideRender>
		</TemplateRoot>
	);
}
