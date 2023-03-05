import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc } from "firebase/firestore";

import NavbarArea from "./NavbarArea";
import ResumeFormArea from "./ResumeFormArea";
import ResumePreviewArea from "./ResumePreviewArea";
import ResumeTemplateArea from "./ResumeTemplateArea";
import useUpdateResumeData from "./hooks/useUpdateResumeData";

import { getResume } from "../../utils/firebase/database";
import { auth, db } from "../../utils/firebase/firebaseInit";
import { addResumeData } from "../../redux/reducers/formDataReducer";
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

const FileIcon = styled.img`
	width: 20px;
	margin-left: 10px;
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

	//驗證使用者身份，未登入導回首頁
	//若 resumeId 不屬於該使用者，則導回 /dashboard
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				navigate("/");
				return;
			}
			const userId = user.uid;
			setUid(userId);
			const userRef = doc(db, "users", userId);
			const resumesRef = collection(userRef, "resumes");
			const resumeData = getResume(resumesRef, resumeId);
			resumeData.then((data) => {
				if (!data) {
					navigate("/dashboard");
					return;
				}
				dispatch(addResumeData({ resumeData: data }));
			});
		});
	}, [dispatch, navigate, resumeId]);

	//若履歷資料更動，更新到 database
	useUpdateResumeData(uid, resumeId);

	//根據履歷所選擇模板更換可選顏色
	const template = useSelector((state) => state.formData.template);
	useEffect(() => {
		setTempColors(templatesColorOrder[template]);
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
						<FileIcon src="/images/icon/file.png" />
					</PreviewButton>
				)}
			</Body>
		</Root>
	);
}
