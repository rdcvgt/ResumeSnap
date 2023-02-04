import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import London from "../../../components/template/London";

const ResumePreviewBackground = styled.div`
	position: fixed;
	top: 0px;
	right: 0px;
	width: 50%;
	height: 100%;
	background-color: rgb(101, 110, 131);
	/* padding: 80px 70px 80px 70px; */
`;

const ResumePreviewInfo = styled.div`
	width: 80%;
	height: 100%;
	margin: auto auto;
	position: relative;
`;

const ResumePreviewTopFunc = styled.div`
	width: 100%;
	height: auto;
	position: absolute;
	top: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const SavingProgress = styled.div``;

const PaginationArea = styled.div`
	display: flex;
	align-items: center;
`;

const PrePage = styled.div`
	width: 25px;
	height: 25px;
	border-radius: 30px;
	cursor: ${(props) => (props.currentPage === 1 ? "default" : "pointer")};
	opacity: ${(props) => (props.currentPage === 1 ? "0.3" : "1")};
	display: flex;
	justify-content: center;
	align-items: center;
	transition: background-color 0.3s;
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
	opacity: ${(props) =>
		props.currentPage === props.totalPage ? "0.3" : "1"};
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

const ResumePreviewBottomFunc = styled.div`
	width: 100%;
	height: auto;
	position: absolute;
	bottom: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const SelectTemplateButtonArea = styled.div`
	width: 150px;
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

const OutputButtonArea = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ResumePreview = styled.div`
	width: 50vw;
	height: calc((297 / 210) * 50vw);
	max-height: 85vh;
	max-width: calc((210 / 297) * 85vh);
	background-color: #fff;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	border-radius: 10px;
	overflow: hidden;
`;

const DownloadPdfButton = styled.div`
	width: 120px;
	height: 40px;
	border-radius: 5px;
	cursor: ${(props) =>
		props.isDownloading === true ? "default" : "pointer"};
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	${(props) => props.theme.font.itemBold};
	margin-left: 20px;
	background-color: ${(props) =>
		props.isDownloading === true
			? props.theme.color.blue[60]
			: props.theme.color.blue[50]};
	transition: background-color 0.3s;

	&:hover {
		transition: background-color 0.3s;
		background-color: ${(props) => props.theme.color.blue[60]};
	}
`;

const ShareLinkButton = styled.div`
	width: 120px;
	height: 40px;
	border-radius: 5px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	${(props) => props.theme.font.itemBold};
	margin-left: 20px;
	background-color: ${(props) => props.theme.color.blue[50]};
	transition: background-color 0.3s;

	&:hover {
		transition: background-color 0.3s;
		background-color: ${(props) => props.theme.color.blue[60]};
	}
`;

ResumePreviewArea.propTypes = {
	inputData: PropTypes.array,
};

export default function ResumePreviewArea({ inputData }) {
	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [isDownloading, setIsDownloading] = useState(false);

	let downloadPdfFunc = null;
	const handleGetDownLoadPdfFunc = (func) => {
		downloadPdfFunc = func;
	};

	const handleDownloadPdf = () => {
		if (isDownloading) return;
		if (downloadPdfFunc) {
			setIsDownloading(true);
			downloadPdfFunc();
		}
	};

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

	return (
		<>
			<ResumePreviewBackground>
				<ResumePreviewInfo>
					<ResumePreviewTopFunc>
						<SavingProgress></SavingProgress>
						<PaginationArea>
							<PrePage
								onClick={handlePrePageClick}
								currentPage={currentPage}>
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
					</ResumePreviewTopFunc>
					<ResumePreview>
						<London
							inputData={inputData}
							handleGetDownLoadPdfFunc={handleGetDownLoadPdfFunc}
							getTotalPage={getTotalPage}
							currentPage={currentPage}
							setIsDownloading={setIsDownloading}
						/>
					</ResumePreview>
					<ResumePreviewBottomFunc>
						<SelectTemplateButtonArea>
							<SelectTemplateIcon src="/images/icon/menu.png" />
							<SelectTemplateButton>
								選擇履歷模板
							</SelectTemplateButton>
						</SelectTemplateButtonArea>

						<OutputButtonArea>
							<DownloadPdfButton
								onClick={handleDownloadPdf}
								isDownloading={isDownloading}>
								{isDownloading === false
									? "下載 PDF"
									: "下載中..."}
							</DownloadPdfButton>
							<ShareLinkButton onClick={handleDownloadPdf}>
								分享履歷連結
							</ShareLinkButton>
						</OutputButtonArea>
					</ResumePreviewBottomFunc>
				</ResumePreviewInfo>
			</ResumePreviewBackground>
		</>
	);
}
