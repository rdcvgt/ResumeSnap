import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { collection, doc, setDoc, addDoc, getDocs } from "firebase/firestore";

import { db } from "../../utils/firebase/firebase";
import { auth } from "../../utils/firebase/firebase";
import DefaultButton from "../../components/buttons/DefaultButton";
import ResumeTitleBlock from "../../components/forms/utils/ResumeTitleBlock";

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
const Resume = styled.div`
	width: 50%;
	height: 268.7px;
	display: flex;
	align-items: center;
`;
const ResumePreview = styled.div`
	width: 190px;
	height: 268.7px;
	border: 1px solid ${(props) => props.theme.color.neutral[20]};
	border-radius: 5px;
	margin-right: 30px;
`;

const ResumeFunctionArea = styled.div`
	height: 100%;
	position: relative;
`;

const MainInfoArea = styled.div`
	height: 20%;
	position: relative;
	top: 0;
	left: 0;
`;

const UpdatedAt = styled.div`
	margin-top: 5px;
	${(props) => props.theme.font.info};
	color: ${(props) => props.theme.color.neutral[40]};
`;

const FunctionButtonArea = styled.div`
	margin-top: 30px;
	height: 80%;
`;

const FunctionIcon = styled.img`
	width: 15px;
	margin-right: 10px;
`;

const FunctionButton = styled.div`
	margin-bottom: 15px;
	cursor: pointer;
	${(props) => props.theme.font.lightButton};
	transition: all 0.3s;
	&:hover {
		color: ${(props) => props.theme.color.blue[50]};
		transition: all 0.3s;
	}
`;

const NewResumeArea = styled.div`
	width: 50%;
	height: 268.7px;
	display: flex;
	align-items: center;
	cursor: pointer;
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

async function getUserResumes(resumesRef) {
	const snapshot = await getDocs(resumesRef);
	snapshot.forEach((doc) => {
		console.log(doc.id, "=>", doc.data());
	});
}

export default function IsLogin() {
	const [isHoverNewResume, setIsHoverNewResume] = useState(false);
	const [uid, setUid] = useState(null);

	useEffect(() => {
		const user = auth.currentUser;
		if (user !== null) {
			const userId = user.uid;
			setUid(userId);
			const userRef = doc(db, "users", userId); //取得父文檔
			const resumesRef = collection(userRef, "resumes"); //取得父文檔下的子集合 resumes
			getUserResumes(resumesRef);
		}
	}, []);

	const handleNewResumeClick = () => {
		const userRef = doc(db, "users", uid); //取得父文檔
	};

	return (
		<Root>
			<ResumesArea>
				<TitleBlock>
					<Title>Resumes</Title>
					<DefaultButton>Create New</DefaultButton>
				</TitleBlock>
				<ResumesDisplayArea>
					<Resume>
						<ResumePreview></ResumePreview>
						<ResumeFunctionArea>
							<MainInfoArea>
								<ResumeTitleBlock />
								<UpdatedAt>
									Updated 20 February, 19:48
								</UpdatedAt>
							</MainInfoArea>

							<FunctionButtonArea>
								<FunctionButton>
									<FunctionIcon src="/images/icon/edit.png" />
									Edit
								</FunctionButton>
								<FunctionButton>
									<FunctionIcon src="/images/icon/upload.png" />
									Share Link
								</FunctionButton>
								<FunctionButton>
									<FunctionIcon src="/images/icon/download.png" />
									Download PDF
								</FunctionButton>
								<FunctionButton>
									<FunctionIcon src="/images/icon/delete.png" />
									Delete
								</FunctionButton>
							</FunctionButtonArea>
						</ResumeFunctionArea>
					</Resume>
					<NewResumeArea
						onMouseEnter={() => {
							setIsHoverNewResume(true);
						}}
						onMouseLeave={() => {
							setIsHoverNewResume(false);
						}}
						onClick={handleNewResumeClick}>
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
		</Root>
	);
}
