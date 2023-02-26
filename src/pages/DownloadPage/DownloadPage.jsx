import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc } from "firebase/firestore";

import London from "../../components/template/London";
import Sydney from "../../components/template/Sydney";
import { auth, db } from "../../utils/firebase/firebaseInit";
import { getResume } from "../../utils/firebase/database";
import { addResumeData } from "../../redux/slices/formDataSlice";

const Root = styled.div`
	width: 100%;
	height: auto;
	background-color: ${(props) => props.theme.color.neutral[10]};
`;

const Body = styled.div`
	display: flex;
	height: auto;
	justify-content: center;
	padding: 80px;
`;

const templates = {
	London,
	Sydney,
};

export default function DownloadPage() {
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

	//執行下載 pdf

	return (
		<Root>
			<Body>
				<Template
					pageFrom="download"
					handleGetDownLoadPdfFunc={handleGetDownLoadPdfFunc}
				/>
			</Body>
		</Root>
	);
}
