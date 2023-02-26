import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc } from "firebase/firestore";

import London from "../../components/template/London";
import Sydney from "../../components/template/Sydney";
import { auth, db } from "../../utils/firebase/firebaseInit";
import { getResume } from "../../utils/firebase/database";
import { addResumeData } from "../../redux/reducers/formDataReducer";

const Root = styled.div`
	width: 100%;
	height: auto;
	background-color: ${(props) => props.theme.color.neutral[10]};
`;

const Hide = styled.div`
	opacity: 0;
	position: absolute;
	left: -200%;
`;

const fadeIn = keyframes` 
  0% { 
		opacity: 0;
	}
  100% { 		opacity: 1;
}
`;

const LoadingArea = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: ${fadeIn} 0.5s both;
`;

const LoadingRingArea = styled.div`
	display: flex;
	justify-content: center;
`;

const spin = keyframes` 
  0% { 
		transform: rotate(0deg); 
	}
  100% { transform: rotate(360deg); }
`;

const LoadingRing = styled.div`
	border: 4px solid ${(props) => props.theme.color.blue[10]};
	border-top: 4px solid ${(props) => props.theme.color.blue[50]}; /* Blue */
	border-radius: 50%;
	width: 50px;
	height: 50px;
	animation: ${spin} 0.4s linear infinite;
`;

const LoadingText = styled.div`
	${(props) => props.theme.font.title};
	margin-top: 30px;
`;

const templates = {
	London,
	Sydney,
};

export default function DownloadPage() {
	const [isDownloading, setIsDownloading] = useState(true);
	const { resumeId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentTemplate = useSelector((state) => state.formData.template);
	const Template = useMemo(() => {
		return templates[currentTemplate];
	}, [currentTemplate]);

	//查詢 resumeId 是否存在，若存在則直接更新 redux 資料，否則導回首頁
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				navigate("/");
				return;
			}
			const userId = user.uid;
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

	//取得 downloadPdfFunc
	let downloadPdfFunc = null;
	const handleGetDownLoadPdfFunc = (func) => {
		downloadPdfFunc = func;
	};

	//執行下載 pdf
	useEffect(() => {
		setTimeout(() => {
			if (downloadPdfFunc) {
				downloadPdfFunc();
			}
		}, 1000);
	}, [downloadPdfFunc]);

	useEffect(() => {
		if (!isDownloading) {
			navigate("/dashboard");
		}
	}, [isDownloading]);

	return (
		<Root>
			<LoadingArea>
				<LoadingRingArea>
					<LoadingRing />
				</LoadingRingArea>
				<LoadingText>
					Hang tight, we are downloading your resume PDF
				</LoadingText>
			</LoadingArea>
			<Hide>
				<Template
					pageFrom="download"
					handleGetDownLoadPdfFunc={handleGetDownLoadPdfFunc}
					setIsDownloading={setIsDownloading}
				/>
			</Hide>
		</Root>
	);
}
