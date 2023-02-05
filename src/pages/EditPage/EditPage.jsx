import React, { useState, useEffect } from "react";
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

const templatesColorOrder = {
	London: [null],
	Sydney: ["#082A4D", "#581010", "#1D473A", "#32084D", "#1B212F"],
};

export default function EditPage() {
	const [inputData, setInputData] = useState([
		{ block: "PersonalDetails", content: {}, id: uuid() },
		{ block: "ProfessionalSummary", content: {}, id: uuid() },
		{ block: "Education", content: {}, id: uuid() },
		{ block: "EmploymentHistory", content: {}, id: uuid() },
	]);
	const [isChoosingTemp, setIsChoosingTemp] = useState(true);
	const [isDownloading, setIsDownloading] = useState(false);
	const [tempColors, setTempColors] = useState([]);
	const [resumeStyle, setResumeStyle] = useState({
		template: "London",
		color: "#ccc",
	});

	useEffect(() => {
		const temp = resumeStyle.template;
		setTempColors(templatesColorOrder[temp]);
	}, [resumeStyle]);

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
					resumeStyle={resumeStyle}
					tempColors={tempColors}
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
						setResumeStyle={setResumeStyle}
						resumeStyle={resumeStyle}
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
					resumeStyle={resumeStyle}
				/>
			</Body>
		</Root>
	);
}
