import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PersonalDetails from "../../components/forms/PersonalDetails";
import ProfessionalSummary from "../../components/forms/ProfessionalSummary";

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
	max-width: 40%;
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
	width: 60%;
	height: 100%;
	background-color: rgb(101, 110, 131);
`;

export default function EditPage() {
	return (
		<Root>
			<ResumeDataArea>
				<ResumeData>
					<ResumeTitle>我的第一份履歷</ResumeTitle>
					<PersonalDetails />
					<ProfessionalSummary />
				</ResumeData>
			</ResumeDataArea>
			<ResumePreviewArea>hemll</ResumePreviewArea>
		</Root>
	);
}
