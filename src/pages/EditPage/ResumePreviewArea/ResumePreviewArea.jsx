import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	useMemo,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import London from "../../../components/template/London";
import Sydney from "../../../components/template/Sydney";

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
`;

const ResumePreviewInfo = styled.div`
	width: 80%;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const ResumePreview = styled.div`
	height: 0;
	width: ${(props) => (props.isChoosingTemp === true ? "60%" : "80%")};
	padding-bottom: ${(props) =>
		props.isChoosingTemp === true
			? "calc(60% / 0.707)"
			: "calc(80% / 0.707)"};
	background-color: #fff;
	border-radius: 10px;
	overflow: hidden;
	margin: 20px auto;
	position: relative;
`;

const BottomSpace = styled.div`
	height: 30px;
	width: 100%;
`;

const ResumePreviewTopArea = styled.div`
	width: 80%;
	margin-top: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	${(props) =>
		props.isChoosingTemp &&
		`
		position: fixed; 
		bottom: 10%; 
	`}
	z-index: 1;
`;

const SavingProgress = styled.div``;

const PaginationArea = styled.div`
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
	isChoosingTemp: PropTypes.bool,
	setIsChoosingTemp: PropTypes.func,
	handleGetDownLoadPdfFunc: PropTypes.func,
	handleDownloadPdf: PropTypes.func,
	isDownloading: PropTypes.bool,
	setIsDownloading: PropTypes.func,
	resumeStyle: PropTypes.object,
};

ResumePreviewTopFunc.propTypes = {
	handleNextPageClick: PropTypes.func,
	handlePrePageClick: PropTypes.func,
	totalPage: PropTypes.number,
	currentPage: PropTypes.number,
};

ResumePreviewBottomFunc.propTypes = {
	handleDownloadPdf: PropTypes.func,
	isDownloading: PropTypes.bool,
	setIsChoosingTemp: PropTypes.func,
};

function ResumePreviewTopFunc({
	handleNextPageClick,
	handlePrePageClick,
	totalPage,
	currentPage,
}) {
	const isChoosingTemp = useContext(TempStatusContext);
	return (
		<ResumePreviewTopArea isChoosingTemp={isChoosingTemp}>
			<SavingProgress></SavingProgress>
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
		</ResumePreviewTopArea>
	);
}

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
					選擇履歷模板
				</SelectTemplateButton>
			</SelectTemplateButtonArea>

			<OutputButtonArea>
				<DownloadPdfButton
					onClick={handleDownloadPdf}
					isDownloading={isDownloading}>
					{isDownloading === false ? "下載 PDF" : "下載中..."}
				</DownloadPdfButton>
				<ShareLinkButton onClick={handleDownloadPdf}>
					分享履歷連結
				</ShareLinkButton>
			</OutputButtonArea>
		</ResumePreviewBottomArea>
	);
}

const TempStatusContext = createContext();
const templates = {
	London,
	Sydney,
};

export default function ResumePreviewArea({
	inputData,
	isChoosingTemp,
	setIsChoosingTemp,
	handleGetDownLoadPdfFunc,
	handleDownloadPdf,
	isDownloading,
	setIsDownloading,
	resumeStyle,
}) {
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

	const Template = useMemo(() => {
		return templates[resumeStyle.template];
	}, [resumeStyle]);

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
								inputData={inputData}
								handleGetDownLoadPdfFunc={
									handleGetDownLoadPdfFunc
								}
								getTotalPage={getTotalPage}
								currentPage={currentPage}
								setIsDownloading={setIsDownloading}
								resumeStyle={resumeStyle}
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
