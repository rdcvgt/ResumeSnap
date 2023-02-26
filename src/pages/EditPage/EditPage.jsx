import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc } from "firebase/firestore";

import ResumePreviewArea from "./ResumePreviewArea";
import ResumeFormArea from "./ResumeFormArea";
import ResumeTemplateArea from "./ResumeTemplateArea";
import NavbarArea from "./NavbarArea";
import useUpdateResumeData from "./hooks/useUpdateResumeData";
import { auth, db } from "../../utils/firebase/firebaseInit";
import { getResume } from "../../utils/firebase/database";
import { addResumeData } from "../../redux/reducers/formDataReducer";

const Root = styled.div`
	width: 100%;
	height: 100%;
`;

const Body = styled.div`
	display: flex;
`;

const templatesColorOrder = {
	London: [null],
	Sydney: ["#082A4D", "#581010", "#1D473A", "#32084D", "#1B212F"],
};

export default function EditPage() {
	const [isChoosingTemp, setIsChoosingTemp] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [tempColors, setTempColors] = useState([]);
	const [uid, setUid] = useState(null);
	const { resumeId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
				<ResumeFormArea isChoosingTemp={isChoosingTemp} />

				{isChoosingTemp && <ResumeTemplateArea />}
				<ResumePreviewArea
					choosingTempState={{ isChoosingTemp, setIsChoosingTemp }}
					handleGetDownLoadPdfFunc={handleGetDownLoadPdfFunc}
					handleDownloadPdf={handleDownloadPdf}
					isDownloadingState={{ isDownloading, setIsDownloading }}
				/>
			</Body>
		</Root>
	);
}
