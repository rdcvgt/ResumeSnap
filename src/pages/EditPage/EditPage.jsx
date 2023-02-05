import React, { useState } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import ResumePreviewArea from "./ResumePreviewArea";
import ResumeFormArea from "./ResumeFormArea";
import ResumeTemplateArea from "./ResumeTemplateArea";
import NavbarArea from "./NavbarArea";

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
`;

const Body = styled.div`
	display: flex;
`;

export default function EditPage() {
	const [inputData, setInputData] = useState([
		{ block: "PersonalDetails", content: {}, id: uuid() },
		{ block: "ProfessionalSummary", content: {}, id: uuid() },
		{ block: "Education", content: {}, id: uuid() },
		{ block: "EmploymentHistory", content: {}, id: uuid() },
	]);
	const [resumeStyle, setResumeStyle] = useState({
		template: null,
		color: null,
	});
	const [tempDefaultColor, setTempDefaultColor] = useState([]);

	const [isChoosingTemp, setIsChoosingTemp] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);

	let downloadPdfFunc = null;
	const handleGetDownLoadPdfFunc = (func) => {
		downloadPdfFunc = func;
	};

	const handleDownloadPdf = () => {
		if (isDownloading.current) return;
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
					setResumeStyle={setResumeStyle}
				/>
			)}
			<Body isChoosingTemp={isChoosingTemp}>
				<ResumeFormArea
					inputData={inputData}
					setInputData={setInputData}
					isChoosingTemp={isChoosingTemp}
				/>

				{isChoosingTemp && (
					<ResumeTemplateArea
						isChoosingTemp={isChoosingTemp}
						setResumeStyle={setResumeStyle}
					/>
				)}
				<ResumePreviewArea
					inputData={inputData}
					isChoosingTemp={isChoosingTemp}
					setIsChoosingTemp={setIsChoosingTemp}
					handleGetDownLoadPdfFunc={handleGetDownLoadPdfFunc}
					handleDownloadPdf={handleDownloadPdf}
					isDownloading={isDownloading}
					setIsDownloading={setIsDownloading}
				/>
			</Body>
		</Root>
	);
}
