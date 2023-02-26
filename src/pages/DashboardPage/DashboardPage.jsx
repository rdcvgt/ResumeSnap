import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, doc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "../../utils/firebase/firebaseInit";
import { getUserAllResumes, deleteResume } from "../../utils/firebase/database";
import { getResumePreview } from "../../utils/firebase/storage";
import DefaultButton from "../../components/buttons/DefaultButton";
import AllResumes from "./AllResumes";
import newResumeStructure from "../../utils/misc/newResumeStructure";
import { createFirstResume } from "../../utils/firebase/database";
import ConfirmCard from "../../components/cards/ConfirmCard";
import ShareLinkCard from "../../components/cards/ShareLinkCard";

const Root = styled.div``;

const ResumesArea = styled.div`
	width: 1120px;
	margin: 80px auto 0px auto;
	padding: 48px 0 120px 0;
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

const ResumesDisplayArea = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	margin-top: 50px;
`;

const NewResumeArea = styled.div`
	width: 50%;
	height: 268.7px;
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-bottom: 50px;
`;

const AddResumeButton = styled.div`
	width: 190px;
	height: 268.7px;
	border: 1px solid ${(props) => props.theme.color.neutral[20]};
	border-radius: 5px;
	margin-right: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Round = styled.div`
	width: 70px;
	height: 70px;
	border-radius: 70px;
	background-color: ${(props) => props.theme.color.neutral[10]};
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.3s;

	${(props) =>
		props.isHoverNewResume &&
		`
		background-color: #1a91f0;
		transition: all 0.3s;
		`}
`;

const AddResumeIcon = styled.img`
	width: 30px;
	filter: brightness(1.3);
	transition: all 0.3s;

	${(props) =>
		props.isHoverNewResume &&
		`
		filter: brightness(2);
		transition: all 0.3s;
		`}
`;

const AddResumeText = styled.div`
	height: 100%;
	width: 50%;
	color: ${(props) => props.theme.color.neutral[40]};
`;

const AddResumeTitle = styled.div`
	${(props) => props.theme.font.title};
	transition: all 0.3s;
	margin-bottom: 5px;

	${(props) =>
		props.isHoverNewResume &&
		`
		color: #1a91f0;
		transition: all 0.3s;
		`}
`;

const AddResumeContent = styled.div`
	${(props) => props.theme.font.info};
`;

export default function IsLogin() {
	const [isHoverNewResume, setIsHoverNewResume] = useState(false);
	const [deleteResumeId, setDeleteResumeId] = useState(null);
	const [shareResumeId, setShareResumeId] = useState(null);
	const [uid, setUid] = useState(null);
	const [resumesOrder, setResumesOrder] = useState(null);
	const [resumePreviewList, setResumePreviewList] = useState(null);
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.userInfo);

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
		const userRef = doc(db, "users", uid);
		const resumesRef = collection(userRef, "resumes");
		const newResumeId = createFirstResume(resumesRef, resumeConfig);
		newResumeId.then((resumeId) => {
			navigate(`/edit/${resumeId}`);
		});
	};

	//使用者點擊刪除履歷按鈕，刪除資料庫資料並重新排序
	const handleDeleteButtonClick = () => {
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
	};

	return (
		<Root>
			<ResumesArea>
				<TitleBlock>
					<Title>Resumes</Title>
					<DefaultButton onClick={handleNewResumeClick}>
						Create New
					</DefaultButton>
				</TitleBlock>
				<ResumesDisplayArea>
					<AllResumes
						resumesOrder={resumesOrder}
						resumePreviewList={resumePreviewList}
						setDeleteResumeId={setDeleteResumeId}
						setShareResumeId={setShareResumeId}
					/>
					<NewResumeArea
						onClick={handleNewResumeClick}
						onMouseEnter={() => {
							setIsHoverNewResume(true);
						}}
						onMouseLeave={() => {
							setIsHoverNewResume(false);
						}}>
						<AddResumeButton>
							<Round isHoverNewResume={isHoverNewResume}>
								<AddResumeIcon
									isHoverNewResume={isHoverNewResume}
									src="/images/icon/plus_thin.png"
								/>
							</Round>
						</AddResumeButton>
						<AddResumeText>
							<AddResumeTitle isHoverNewResume={isHoverNewResume}>
								New Resume
							</AddResumeTitle>
							<AddResumeContent>
								Create a tailored resume for each job
								application. Double your chances of getting
								hired!
							</AddResumeContent>
						</AddResumeText>
					</NewResumeArea>
				</ResumesDisplayArea>
			</ResumesArea>
			{deleteResumeId && (
				<ConfirmCard
					text={{
						title: "Delete Resume",
						description:
							"Are you sure you want to delete this resume? Once deleted this resume cannot be restored.",
						leftButton: "Delete",
						rightButton: "Cancel",
					}}
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
