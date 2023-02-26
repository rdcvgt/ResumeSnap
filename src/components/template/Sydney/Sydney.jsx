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
import useCropUserPhoto from "../utils/hooks/useCropUserPhoto";
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
		color: #fff;
	}
`;

const RenderRoot = styled.div`
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
	line-height: 1.5em;
`;

const RenderBackground = styled.div`
	position: absolute;
	padding: 0px 30px;
	top: 0;
	right: 0;
	height: 100%;
	width: 35%;
	overflow-wrap: break-word;
	line-height: 1.5em;
`;

const ResumeContainer = styled.div`
	width: 65%;
	height: 100%;
	padding: 50px 40px;
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
	line-height: 1.5em;
`;

const ResumeBackground = styled.div`
	position: absolute;
	padding: 50px 30px;
	top: 0;
	right: 0;
	height: 100%;
	width: 35%;
	background-color: ${(props) => props.color};
	line-height: 1.5em;
`;

const Block = styled.div`
	margin: auto 0;
	overflow-wrap: break-word;
`;

const Main = styled.div`
	width: 100%;
	/* height: 55px; */
	margin-bottom: 30px;
	overflow-wrap: break-word;
	display: flex;
	align-items: center;
	/* align-items: center; */
`;

const UserPhotoArea = styled.div`
	height: 55px;
	width: 55px;
	border-radius: 55px;
	margin-right: 20px;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PurePhoto = styled.img`
	width: 100%;
	height: 100%;
`;

const UserInfoArea = styled.div`
	width: ${(props) => (props.photo ? "80%" : "100%")};
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const Name = styled.div`
	font-family: "PT Sans Narrow", sans-serif;
	/* height: 30px; */
	font-size: 30px;
	width: 100%;
`;

const Position = styled.div`
	font-family: "Open Sans", sans-serif;
	font-size: 9px;
	text-transform: uppercase;
	width: 100%;
	margin-top: 5px;
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
	const [leftAreaBlocks, setLeftAreaBlocks] = useState([]);
	const [rightAreaBlocks, setRightAreaBlocks] = useState([]);
	const [imgUrl, setImgUrl] = useState("");
	const [croppedUserPhotoUrl, setCroppedUserPhotoUrl] = useState(null);
	const [uid, setUid] = useState(null);
	const pageRef = useRef([]);
	const renderContainerRef = useRef();
	const renderBackgroundRef = useRef();
	const canvasRef = useRef();

	const { resumeId } = useParams();
	const formBlocks = useSelector((state) => state.formData.formBlocks);
	const color = useSelector((state) => state.formData.color);
	const firstName = formBlocks[0].content.inputData?.firstName;
	const lastName = formBlocks[0].content.inputData?.lastName;
	const position = formBlocks[0].content.inputData?.position;
	const photoUrl = formBlocks[0].content.inputData?.photo?.url;

	//實現分頁邏輯，分爲左右欄位來計算
	usePagination(
		renderContainerRef,
		setLeftAreaBlocks,
		formBlocks,
		croppedUserPhotoUrl
	);
	usePagination(
		renderBackgroundRef,
		setRightAreaBlocks,
		formBlocks,
		croppedUserPhotoUrl
	);

	//獲取使用者登入 uid
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) return;
			const userId = user.uid;
			setUid(userId);
		});
	}, []);

	//將履歷內容轉換成 png 檔並儲存到 state
	usePreview(
		pageRef,
		setImgUrl,
		currentPage,
		leftAreaBlocks,
		rightAreaBlocks
	);

	//將履歷的首頁預覽圖存入資料庫
	useSaveResumePreview(
		uid,
		resumeId,
		pageFrom,
		pageRef,
		leftAreaBlocks,
		rightAreaBlocks
	);

	//使用 canvas 裁切使用者照片再轉回圖片
	useCropUserPhoto(photoUrl, canvasRef, setCroppedUserPhotoUrl);

	//下載 PDF，回傳給父層，偵測點擊事件
	const downloadPdf = useDownloadPdf(
		pageRef,
		setIsDownloading,
		leftAreaBlocks,
		rightAreaBlocks
	);

	if (handleGetDownLoadPdfFunc) {
		handleGetDownLoadPdfFunc(downloadPdf);
	}

	//回傳履歷頁數
	useEffect(() => {
		if (!getTotalPage) return;
		if (leftAreaBlocks.length >= rightAreaBlocks.length) {
			getTotalPage(leftAreaBlocks.length);
		} else {
			getTotalPage(rightAreaBlocks.length);
		}
	}, [leftAreaBlocks, rightAreaBlocks]);

	return (
		<TemplateRoot>
			{imgUrl && pageFrom === "edit" && <Img src={imgUrl} alt="圖片" />}
			<HidePages pageFrom={pageFrom}>
				{leftAreaBlocks.length >= rightAreaBlocks.length &&
					leftAreaBlocks.map((pages, index) => {
						return (
							<Root
								pageFrom={pageFrom}
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
							{(firstName ||
								lastName ||
								position ||
								photoUrl) && (
								<Main>
									{photoUrl && (
										<UserPhotoArea>
											<PurePhoto
												src={croppedUserPhotoUrl}
											/>
										</UserPhotoArea>
									)}
									<UserInfoArea photo={photoUrl}>
										{(firstName || lastName) && (
											<Name>
												{firstName}
												{firstName && lastName && " "}
												{lastName}
											</Name>
										)}
										{position && (
											<Position>{position}</Position>
										)}
									</UserInfoArea>
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
				<canvas ref={canvasRef}></canvas>
			</HideRender>
		</TemplateRoot>
	);
}
