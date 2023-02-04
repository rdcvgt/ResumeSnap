import React, { useState, useRef, useCallback } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import ResumePreviewArea from "./ResumePreviewArea";
import ResumeFormArea from "./ResumeFormArea";

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

export default function EditPage() {
	const [inputData, setInputData] = useState([
		{ block: "PersonalDetails", content: {}, id: uuid() },
		{ block: "ProfessionalSummary", content: {}, id: uuid() },
		{ block: "Education", content: {}, id: uuid() },
		{ block: "EmploymentHistory", content: {}, id: uuid() },
	]);

	return (
		<Root>
			<ResumeFormArea inputData={inputData} setInputData={setInputData} />
			<ResumePreviewArea inputData={inputData} />
		</Root>
	);
}
