import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PersonalDetails from "../../components/forms/PersonalDetails";
import ProfessionalSummary from "../../components/forms/ProfessionalSummary";
import London from "../../components/template/London";

// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { db } from "../../index";
// import {
// 	collection,
// 	addDoc,
// 	query,
// 	orderBy,
// 	getDocs,
// 	deleteDoc,
// 	doc,
// 	serverTimestamp,
// } from "firebase/firestore";

const Root = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

const ResumeDataArea = styled.div`
	width: 100%;
	height: 100%;
`;

const ResumeData = styled.div`
	max-width: 45%;
	height: 100%;
	padding: 20px;
`;

const ResumeTitle = styled.div`
	max-width: 100%;
	font-size: 20px;
	margin: 20px auto;
	text-align: center;
	${(props) => props.theme.font.title};
	color: ${(props) => props.theme.color.neutral[90]};
`;

const ResumePreviewArea = styled.div`
	position: fixed;
	top: 0px;
	right: 0px;
	width: 55%;
	height: 100%;
	background-color: rgb(101, 110, 131);
	/* padding: 80px 70px 80px 70px; */
`;

const ResumePreview = styled.div`
	width: 50vw;
	height: calc((297 / 210) * 50vw);
	max-height: 85vh;
	max-width: calc((210 / 297) * 85vh);
	background-color: #fff;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	border-radius: 10px;
	overflow: hidden;
`;

export default function EditPage() {
	const [inputData, setInputData] = useState({});
	const handleInputData = (blockInput) => {
		setInputData(blockInput);
	};

	return (
		<Root>
			<ResumeDataArea>
				<ResumeData>
					<ResumeTitle>我的第一份履歷</ResumeTitle>
					<PersonalDetails handleInputData={handleInputData} />
					<ProfessionalSummary handleInputData={handleInputData} />
				</ResumeData>
			</ResumeDataArea>
			<ResumePreviewArea>
				<ResumePreview>
					<London inputData={inputData} />
				</ResumePreview>
			</ResumePreviewArea>
		</Root>
	);
}
