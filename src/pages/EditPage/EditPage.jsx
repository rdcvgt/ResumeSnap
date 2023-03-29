import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import NavbarArea from "./NavbarArea";
import ResumeFormArea from "./ResumeFormArea";
import ResumePreviewArea from "./ResumePreviewArea";
import ResumeTemplateArea from "./ResumeTemplateArea";
import useUpdateResumeData from "./hooks/useUpdateResumeData";

import { auth } from "../../utils/firebase/firebaseInit";
import {
	getResumeData,
	addResumeData,
	initState,
} from "../../redux/reducers/formDataReducer";
import UserMenu from "../../components/navbar/UserMenu";
import { MEDIA_QUERY_LG } from "../../utils/style/breakpotins";

const Root = styled.div`
	width: 100%;
	height: 100%;
`;

const Body = styled.div`
	display: flex;
`;

const NavArea = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	padding-top: 22px;
	padding-right: 32px;
	z-index: 10;

	${MEDIA_QUERY_LG} {
		position: absolute;
	}
`;

const PreviewButton = styled.div`
	display: none;
	position: fixed;
	bottom: 20px;
	right: 20px;
	width: 220px;
	height: 50px;
	border-radius: 50px;
	background-color: ${(props) => props.theme.color.blue[50]};
	${(props) => props.theme.font.itemBold};
	align-items: center;
	justify-content: center;
	color: #fff;
	cursor: pointer;

	${MEDIA_QUERY_LG} {
		display: flex;
	}
`;

const fadeIn = keyframes` 
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const FileIcon = styled.img`
	width: 20px;
	margin-left: 10px;
	animation: ${fadeIn} 0.3s both;
`;

const LoadingRingArea = styled.div`
	display: flex;
	justify-content: center;
	margin-left: 10px;
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
	width: 20px;
	height: 20px;
	animation: ${spin} 0.3s linear infinite;
`;

const templatesColorOrder = {
	London: [null],
	Sydney: ["#082A4D", "#581010", "#1D473A", "#32084D", "#1B212F"],
};

export default function EditPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { resumeId } = useParams();

	const [uid, setUid] = useState(null);
	const [tempColors, setTempColors] = useState([]);
	const [isDownloading, setIsDownloading] = useState(false);
	const [isChoosingTemp, setIsChoosingTemp] = useState(false);

	const isUploadingData = useSelector(
		(state) => state.dataStatus.isUploadingData
	);
	const isMakingPreview = useSelector(
		(state) => state.dataStatus.isMakingPreview
	);

	//驗證使用者身份，未登入導回首頁
	//若 resumeId 不屬於該使用者，則導回 /dashboard
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				navigate("/");
				return;
			}
			dispatch(addResumeData({ resumeData: initState }));
			const userId = user.uid;
			setUid(userId);
		});
	}, [dispatch, navigate]);

	useEffect(() => {
		if (uid && resumeId) {
			dispatch(getResumeData(uid, resumeId));
		}
	}, [dispatch, uid, resumeId]);

	//若履歷資料更動，更新到 database
	useUpdateResumeData(uid, resumeId);

	//根據履歷所選擇模板更換可選顏色
	const template = useSelector((state) => state.formData.template);
	useEffect(() => {
		if (template) {
			setTempColors(templatesColorOrder[template]);
		}
	}, [template]);

	//取得 downloadPdfFunc
	let downloadPdfFunc = null;
	const handleGetDownLoadPdfFunc = (func) => {
		downloadPdfFunc = func;
	};

	//執行下載 pdf
	const handleDownloadPdf = () => {
		if (isDownloading) return;
		if (downloadPdfFunc) {
			setIsDownloading(true);
			downloadPdfFunc();
		}
	};

	return (
		<Root>
			<Helmet>
				<title>Resume Builder ∙ ResumeSnap</title>
			</Helmet>
			{isChoosingTemp && (
				<NavbarArea
					handleDownloadPdf={handleDownloadPdf}
					isDownloading={isDownloading}
					setIsChoosingTemp={setIsChoosingTemp}
					tempColors={tempColors}
				/>
			)}
			<Body isChoosingTemp={isChoosingTemp}>
				{!isChoosingTemp && (
					<NavArea>
						<UserMenu pageFrom="edit" />
					</NavArea>
				)}

				<ResumeFormArea isChoosingTemp={isChoosingTemp} />

				{isChoosingTemp && <ResumeTemplateArea />}
				<ResumePreviewArea
					choosingTempState={{ isChoosingTemp, setIsChoosingTemp }}
					handleGetDownLoadPdfFunc={handleGetDownLoadPdfFunc}
					handleDownloadPdf={handleDownloadPdf}
					isDownloadingState={{ isDownloading, setIsDownloading }}
				/>
				{!isChoosingTemp && (
					<PreviewButton
						onClick={() => {
							setIsChoosingTemp(true);
						}}>
						Preview & Download
						{!isUploadingData && !isMakingPreview && (
							<FileIcon src="/images/icon/file.png" />
						)}
						{(isUploadingData || isMakingPreview) && (
							<LoadingRingArea>
								<LoadingRing />
							</LoadingRingArea>
						)}
					</PreviewButton>
				)}
			</Body>
		</Root>
	);
}
