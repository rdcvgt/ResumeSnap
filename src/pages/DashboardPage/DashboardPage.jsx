import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc } from "firebase/firestore";

import AllResumes from "./AllResumes";
import NewResume from "./NewResume";

import {
	getResumePreview,
	deleteResumePreview,
} from "../../utils/firebase/storage";
import { db, auth } from "../../utils/firebase/firebaseInit";
import { createFirstResume } from "../../utils/firebase/database";
import { getUserAllResumes, deleteResume } from "../../utils/firebase/database";
import { MEDIA_QUERY_LG } from "../../utils/style/breakpotins";
import newResumeStructure from "../../utils/misc/newResumeStructure";

import NavForDashboard from "../../components/navbar/NavForDashboard";
import ConfirmCard from "../../components/cards/ConfirmCard";
import ShareLinkCard from "../../components/cards/ShareLinkCard";
import { DefaultButtonStyle } from "../../components/buttons/button.style";

const Root = styled.div``;

const ResumesArea = styled.div`
	width: 1120px;
	margin: 80px auto 0px auto;
	padding: 48px 0 120px 0;

	${MEDIA_QUERY_LG} {
		width: 90%;
	}
`;

const TitleBlock = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100px;
	border-bottom: 1px solid #ccc;
	padding: 15px 0;
`;

const Title = styled.div`
	${(props) => props.theme.font.pageTitle};
`;

const CreateNewButton = styled.div`
	${DefaultButtonStyle}
`;

const NewResumeAButton = styled.div`
	${DefaultButtonStyle}
	width: 100%;
	margin-top: 40px;
`;

const ResumesDisplayArea = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	margin-top: 50px;
`;

const MediaQuery = styled.div`
	display: none;

	@media (min-width: ${({ minWidth }) => minWidth}px) {
		display: initial;
	}

	@media (max-width: ${({ maxWidth }) => maxWidth}px) {
		display: initial;
	}
`;

const confirmCardText = {
	title: "Delete Resume",
	description:
		"Are you sure you want to delete this resume? Once deleted this resume cannot be restored.",
	leftButton: "Delete",
	rightButton: "Cancel",
};

export default function DashboardPage() {
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.userInfo);

	const [uid, setUid] = useState(null);
	const [resumesOrder, setResumesOrder] = useState(null);
	const [shareResumeId, setShareResumeId] = useState(null);
	const [deleteResumeId, setDeleteResumeId] = useState(null);
	const [resumePreviewList, setResumePreviewList] = useState(null);

	//驗證使用者身份，未登入導回首頁
	//登入後取得該使用者所有履歷資料
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				navigate("/");
				return;
			}
			const userId = user.uid;
			setUid(userId);
			//取得履歷基本資訊
			const userRef = doc(db, "users", userId); //取得父文檔
			const resumesRef = collection(userRef, "resumes"); //取得父文檔下的子集合 resumes
			const resumesOrderPromise = getUserAllResumes(resumesRef);
			resumesOrderPromise.then((data) => {
				setResumesOrder(data);
			});

			//取得履歷預覽圖
			const resumePreviewList = getResumePreview(userId);
			resumePreviewList.then((data) => {
				setResumePreviewList(data);
			});
		});
	}, [navigate]);

	//使用者點擊新增履歷按鈕，導向新履歷的 /edit 頁面
	const handleNewResumeClick = () => {
		const resumeConfig = newResumeStructure(userInfo);
		console.log(resumeConfig, "resumeConfig");
		const userRef = doc(db, "users", uid);
		const resumesRef = collection(userRef, "resumes");
		const newResumeId = createFirstResume(resumesRef, resumeConfig);
		newResumeId.then((resumeId) => {
			navigate(`/edit/${resumeId}`);
		});
	};

	//使用者點擊刪除履歷按鈕，刪除資料庫資料並重新排序
	const handleDeleteButtonClick = () => {
		//刪除履歷
		const userRef = doc(db, "users", uid);
		const resumesRef = collection(userRef, "resumes");
		const resultPromise = deleteResume(resumesRef, deleteResumeId);
		resultPromise.then((result) => {
			if (result) {
				const oldResumesOrder = resumesOrder;
				const newResumesOrder = oldResumesOrder.filter(
					(resume) => deleteResumeId !== resume.id
				);
				setResumesOrder(newResumesOrder);
				setDeleteResumeId(null);
			}
		});

		//刪除履歷預覽圖
		deleteResumePreview(uid, deleteResumeId);
	};

	return (
		<Root>
			<Helmet>
				<title>Resume Builder ∙ ResumeSnap</title>
			</Helmet>
			<NavForDashboard />
			<ResumesArea>
				<TitleBlock>
					<Title>Resumes</Title>
					<MediaQuery minWidth={768}>
						<CreateNewButton onClick={handleNewResumeClick}>
							Create New
						</CreateNewButton>
					</MediaQuery>
				</TitleBlock>
				<MediaQuery maxWidth={767}>
					<NewResumeAButton onClick={handleNewResumeClick}>
						Create New Resume
					</NewResumeAButton>
				</MediaQuery>
				<ResumesDisplayArea>
					<AllResumes
						resumesOrder={resumesOrder}
						resumePreviewList={resumePreviewList}
						setDeleteResumeId={setDeleteResumeId}
						setShareResumeId={setShareResumeId}
					/>
					<NewResume handleNewResumeClick={handleNewResumeClick} />
				</ResumesDisplayArea>
			</ResumesArea>
			{deleteResumeId && (
				<ConfirmCard
					text={confirmCardText}
					setIsClickDelete={setDeleteResumeId}
					handleDeleteButtonClick={handleDeleteButtonClick}
				/>
			)}
			{shareResumeId && (
				<ShareLinkCard
					shareResumeId={shareResumeId}
					setShareResumeId={setShareResumeId}
				/>
			)}
		</Root>
	);
}
