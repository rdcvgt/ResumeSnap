import React, { useState, useContext, createContext, useMemo } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";

import London from "../../../components/template/London";
import Sydney from "../../../components/template/Sydney";
import OutputButtonArea from "../../../components/buttons/OutputButtonArea";

import {
	MEDIA_QUERY_MD,
	MEDIA_QUERY_LG,
} from "../../../utils/style/breakpotins";

const ResumePreviewBackground = styled.div`
	position: fixed;
	top: 0px;
	right: 0px;
	width: ${(props) => (props.isChoosingTemp === true ? "85%" : "50%")};
	height: 100%;
	background-color: ${(props) =>
		props.isChoosingTemp === true
			? props.theme.color.neutral[70]
			: props.theme.color.neutral[60]};
	padding-top: ${(props) => (props.isChoosingTemp === true ? "60px" : "0")};
	padding-bottom: 20px;
	overflow-y: auto;
	scrollbar-gutter: stable;

	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-track {
		background: none;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}

	${MEDIA_QUERY_LG} {
		width: ${(props) => (props.isChoosingTemp === true ? "80%" : "0%")};
	}

	${MEDIA_QUERY_MD} {
		width: ${(props) => (props.isChoosingTemp === true ? "100%" : "0%")};
	}
`;

const ResumePreviewInfo = styled.div`
	width: 100%;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	@media screen and (min-width: 1440px) {
		width: 80%;
	}
`;

const ResumePreview = styled.div`
	height: 0;
	width: ${(props) => (props.isChoosingTemp === true ? "928px" : "80%")};
	padding-bottom: ${(props) =>
		props.isChoosingTemp === true ? "1312px" : "calc(80% / 0.707)"};
	background-color: #fff;
	border-radius: 10px;
	overflow: hidden;
	margin: 20px auto;
	position: relative;

	@media screen and (max-width: 1440px) {
		width: ${(props) => (props.isChoosingTemp === true ? "80%" : "80%")};
		padding-bottom: ${(props) =>
			props.isChoosingTemp === true
				? "calc(80% / 0.707)"
				: "calc(80% / 0.707)"};
	}
`;

const BottomSpace = styled.div`
	height: 30px;
	width: 100%;
`;

const ResumePreviewTopArea = styled.div`
	width: 80%;
	margin-top: 20px;
	position: relative;
	${(props) =>
		props.isChoosingTemp &&
		`
		position: fixed; 
		bottom: 10%; 
	`}
	z-index: 1;
`;

const SavingProgress = styled.div`
	position: absolute;
	top: 50%;
	transform: translate(0%, -50%);
`;

const fadeIn = keyframes` 
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const SaveArea = styled.div`
	display: flex;
	align-items: center;
	color: #fff;
	animation: ${fadeIn} 0.3s both;
`;

const SavedIcon = styled.img`
	width: 20px;
	margin-right: 5px;
`;

const LoadingRingArea = styled.div`
	display: flex;
	justify-content: center;
	z-index: 1;
	margin-right: 5px;
`;

const spin = keyframes` 
  0% { 
		transform: rotate(0deg); 
	}
  100% { transform: rotate(360deg); }
`;

const LoadingRing = styled.div`
	border: 3px solid ${(props) => props.theme.color.neutral[20]};
	border-top: 3px solid ${(props) => props.theme.color.neutral[30]}; /* Blue */
	border-radius: 50%;
	width: 15px;
	height: 15px;
	animation: ${spin} 0.3s linear infinite;
`;

const PaginationArea = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	align-items: center;
	${(props) =>
		props.isChoosingTemp &&
		`
		border-radius: 30px; 
		background-color: rgb(0, 0, 0, 0.7); 
		height: 30px;
	`}
`;

const PrePage = styled.div`
	width: 25px;
	height: 25px;
	border-radius: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: background-color 0.3s;
	opacity: ${(props) => (props.currentPage === 1 ? "0.3" : "1")};
	cursor: ${(props) => (props.currentPage === 1 ? "default" : "pointer")};
	&:hover {
		background-color: ${(props) =>
			props.currentPage === 1 ? "none" : props.theme.color.neutral[70]};
		transition: background-color 0.3s;
	}
`;
const NextPage = styled.div`
	width: 25px;
	height: 25px;
	border-radius: 30px;
	cursor: ${(props) =>
		props.currentPage === props.totalPage ? "default" : "pointer"};
	opacity: ${(props) => (props.currentPage === props.totalPage ? "0.3" : "1")};
	display: flex;
	justify-content: center;
	align-items: center;
	transition: background-color 0.3s;
	&:hover {
		background-color: ${(props) =>
			props.currentPage === props.totalPage
				? "none"
				: props.theme.color.neutral[70]};
		transition: background-color 0.3s;
	}
`;

const PrePageIcon = styled.img`
	width: 10px;
`;

const NextPageIcon = styled.img`
	width: 10px;
`;

const Pages = styled.div`
	margin: 0 5px;
	color: #fff;
	${(props) => props.theme.font.content};
	cursor: default;
`;

const ResumePreviewBottomArea = styled.div`
	width: 80%;
	margin: 0px auto;
	margin-bottom: 20px;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const SelectTemplateButtonArea = styled.div`
	width: 180px;
	height: 40px;
	border-radius: 20px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s;

	&:hover {
		background-color: ${(props) => props.theme.color.neutral[70]};
		transition: background-color 0.3s;
	}
`;

const SelectTemplateIcon = styled.img`
	width: 15px;
	margin-right: 10px;
`;

const SelectTemplateButton = styled.div`
	color: #fff;
	${(props) => props.theme.font.content};
	font-size: 16px;
	transition: background-color 0.3s;
	display: flex;
	align-items: center;
	justify-content: center;
`;

ResumePreviewTopFunc.propTypes = {
	handleNextPageClick: PropTypes.func,
	handlePrePageClick: PropTypes.func,
	totalPage: PropTypes.number,
	currentPage: PropTypes.number,
};

function ResumePreviewTopFunc({
	handleNextPageClick,
	handlePrePageClick,
	totalPage,
	currentPage,
}) {
	const isChoosingTemp = useContext(TempStatusContext);
	const isUploadingData = useSelector(
		(state) => state.dataStatus.isUploadingData
	);
	const isMakingPreview = useSelector(
		(state) => state.dataStatus.isMakingPreview
	);

	return (
		<ResumePreviewTopArea isChoosingTemp={isChoosingTemp}>
			{!isChoosingTemp && (
				<SavingProgress>
					{!isUploadingData && !isMakingPreview && (
						<SaveArea>
							<SavedIcon src="/images/icon/cloud.png" />
							Saved
						</SaveArea>
					)}
					{(isUploadingData || isMakingPreview) && (
						<SaveArea>
							<LoadingRingArea>
								<LoadingRing />
							</LoadingRingArea>
							Saving...
						</SaveArea>
					)}
				</SavingProgress>
			)}
			<PaginationArea isChoosingTemp={isChoosingTemp}>
				<PrePage onClick={handlePrePageClick} currentPage={currentPage}>
					<PrePageIcon src="/images/icon/left.png" />
				</PrePage>
				<Pages>
					{currentPage} / {totalPage}
				</Pages>
				<NextPage
					onClick={handleNextPageClick}
					currentPage={currentPage}
					totalPage={totalPage}>
					<NextPageIcon src="/images/icon/right.png" />
				</NextPage>
			</PaginationArea>
			<div></div>
		</ResumePreviewTopArea>
	);
}

ResumePreviewBottomFunc.propTypes = {
	handleDownloadPdf: PropTypes.func,
	isDownloading: PropTypes.bool,
	isChoosingTemp: PropTypes.bool,
	setIsChoosingTemp: PropTypes.func,
};

function ResumePreviewBottomFunc({
	handleDownloadPdf,
	isDownloading,
	setIsChoosingTemp,
}) {
	return (
		<ResumePreviewBottomArea>
			<SelectTemplateButtonArea>
				<SelectTemplateIcon src="/images/icon/menu.png" />
				<SelectTemplateButton
					onClick={() => {
						setIsChoosingTemp(true);
					}}>
					Select Template
				</SelectTemplateButton>
			</SelectTemplateButtonArea>
			<OutputButtonArea
				handleDownloadPdf={handleDownloadPdf}
				isDownloading={isDownloading}
				isChoosingTemp={false}
			/>
		</ResumePreviewBottomArea>
	);
}

ResumePreviewArea.propTypes = {
	choosingTempState: PropTypes.object,
	handleGetDownLoadPdfFunc: PropTypes.func,
	handleDownloadPdf: PropTypes.func,
	isDownloadingState: PropTypes.object,
};

const TempStatusContext = createContext();
const templates = {
	London,
	Sydney,
};

export default function ResumePreviewArea({
	choosingTempState,
	handleGetDownLoadPdfFunc,
	handleDownloadPdf,
	isDownloadingState,
}) {
	const { isChoosingTemp, setIsChoosingTemp } = choosingTempState;
	const { isDownloading, setIsDownloading } = isDownloadingState;

	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const getTotalPage = (count) => {
		setTotalPage(count);
	};
	const handleNextPageClick = () => {
		if (currentPage === totalPage) return;
		setCurrentPage((prevPage) => prevPage + 1);
	};
	const handlePrePageClick = () => {
		if (currentPage === 1) return;
		setCurrentPage((prevPage) => prevPage - 1);
	};

	const currentTemplate = useSelector((state) => state.formData.template);
	const Template = useMemo(() => {
		return templates[currentTemplate];
	}, [currentTemplate]);

	return (
		<>
			<TempStatusContext.Provider value={isChoosingTemp}>
				<ResumePreviewBackground isChoosingTemp={isChoosingTemp}>
					<ResumePreviewInfo isChoosingTemp={isChoosingTemp}>
						<ResumePreviewTopFunc
							handleNextPageClick={handleNextPageClick}
							handlePrePageClick={handlePrePageClick}
							totalPage={totalPage}
							currentPage={currentPage}
						/>
						<ResumePreview isChoosingTemp={isChoosingTemp}>
							<Template
								pageFrom="edit"
								handleGetDownLoadPdfFunc={handleGetDownLoadPdfFunc}
								getTotalPage={getTotalPage}
								currentPage={currentPage}
								setIsDownloading={setIsDownloading}
							/>
						</ResumePreview>
						{isChoosingTemp && <BottomSpace></BottomSpace>}

						{!isChoosingTemp && (
							<ResumePreviewBottomFunc
								handleDownloadPdf={handleDownloadPdf}
								isDownloading={isDownloading}
								setIsChoosingTemp={setIsChoosingTemp}
							/>
						)}
					</ResumePreviewInfo>
				</ResumePreviewBackground>
			</TempStatusContext.Provider>
		</>
	);
}
