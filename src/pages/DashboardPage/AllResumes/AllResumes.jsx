import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {
	MEDIA_QUERY_MD,
	MEDIA_QUERY_LG,
} from "../../../utils/style/breakpotins";

const Resume = styled.div`
	width: 50%;
	height: 268.7px;
	display: flex;
	align-items: center;
	margin-bottom: 50px;

	${MEDIA_QUERY_LG} {
		width: 100%;
	}

	${MEDIA_QUERY_MD} {
		align-items: flex-start;
		height: auto;
	}
`;
const ResumePreview = styled.div`
	width: 190px;
	height: 268.7px;
	border: 1px solid ${(props) => props.theme.color.neutral[20]};
	border-radius: 5px;
	margin-right: 30px;
	cursor: pointer;
	overflow: hidden;
	transition: all 0.3s;

	${MEDIA_QUERY_MD} {
		width: 125px;
		height: 176.7px;
	}
`;

const PreviewImg = styled.img`
	width: 100%;
	height: 100%;
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

const ResumeName = styled.div`
	${(props) => props.theme.font.title};
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

export default function AllResumes({
	resumesOrder,
	resumePreviewList,
	setDeleteResumeId,
	setShareResumeId,
}) {
	const navigate = useNavigate();
	const handleEditButtonClick = (resumeId) => {
		navigate(`/edit/${resumeId}`);
	};

	const handleDownloadClick = (resumeId) => {
		navigate(`/download/${resumeId}`);
	};

	if (!resumesOrder) return;
	return resumesOrder.map((resume) => {
		const id = resume.id;
		const name = resume.name;
		const timestamp = resume.updatedAt;
		const date = new Date(timestamp);
		const dateString = date.toLocaleDateString();
		const timeString = date.toLocaleTimeString();

		return (
			<Resume key={id} resumeId={id}>
				<ResumePreview
					onClick={() => {
						handleEditButtonClick(id);
					}}>
					<PreviewImg
						src={resumePreviewList ? resumePreviewList[id] : null}
					/>
				</ResumePreview>
				<ResumeFunctionArea>
					<MainInfoArea>
						<ResumeName>{name}</ResumeName>
						<UpdatedAt>
							Updated {dateString} {timeString}
						</UpdatedAt>
					</MainInfoArea>

					<FunctionButtonArea>
						<FunctionButton
							onClick={() => {
								handleEditButtonClick(id);
							}}>
							<FunctionIcon src="/images/icon/edit.png" />
							Edit
						</FunctionButton>
						<FunctionButton
							onClick={() => {
								setShareResumeId(id);
							}}>
							<FunctionIcon src="/images/icon/upload.png" />
							Share Link
						</FunctionButton>
						<FunctionButton
							onClick={() => {
								handleDownloadClick(id);
							}}>
							<FunctionIcon src="/images/icon/download.png" />
							Download PDF
						</FunctionButton>
						<FunctionButton
							onClick={() => {
								setDeleteResumeId(id);
							}}>
							<FunctionIcon src="/images/icon/delete.png" />
							Delete
						</FunctionButton>
					</FunctionButtonArea>
				</ResumeFunctionArea>
			</Resume>
		);
	});
}
