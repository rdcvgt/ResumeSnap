import React, {
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
	createContext,
} from "react";
import styled from "styled-components";
import PersonalDetails from "../../components/forms/PersonalDetails";
import ProfessionalSummary from "../../components/forms/ProfessionalSummary";
import Education from "../../components/forms/Education";
import EmploymentHistory from "../../components/forms/EmploymentHistory";
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
	max-width: 50%;
	height: 100%;
	padding: 20px;
`;

const TitleBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 25px;
	&:hover {
	}
`;

const ResumeTitle = styled.input`
	width: 150px;
	height: 25px;
	min-width: 30ch;
	max-width: 80%;
	font-size: 20px;
	margin: 20px 0;
	text-align: center;
	outline: none;
	border: none;
	min-width: 1px;
	${(props) => props.theme.font.title};
	color: ${(props) => props.theme.color.neutral[90]};
	caret-color: ${(props) => props.theme.color.blue[50]};
`;

const ResumeTitleIcon = styled.img`
	max-height: 15px;
	opacity: 0;
	transition: opacity 0.3s;
	cursor: pointer;
	&:hover {
		opacity: 1;
	}
`;

const ResumePreviewArea = styled.div`
	position: fixed;
	top: 0px;
	right: 0px;
	width: 50%;
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
	/* overflow: hidden; */
`;

const RenderBlocks = ({ inputData, components, handleInputData }) => {
	return inputData.map((block, index) => {
		const blockName = block.block;
		const Component = components[blockName];
		if (!Component) return null;
		return <Component key={index} handleInputData={handleInputData} />;
	});
};

export default function EditPage() {
	const [inputData, setInputData] = useState([
		{ block: "PersonalDetails", content: {} },
		{ block: "ProfessionalSummary", content: {} },
		{ block: "Education", content: {} },
		{ block: "EmploymentHistory", content: {} },
	]);

	const components = {
		PersonalDetails: PersonalDetails,
		ProfessionalSummary: ProfessionalSummary,
		Education: Education,
		EmploymentHistory: EmploymentHistory,
	};

	const [resumeTitle, setResumeTitle] = useState("我的第一份履歷");
	const resumeTitleRef = useRef(null);

	const handleResumeTitleChange = (e) => {
		setResumeTitle(e.target.value);
	};

	const handleResumeTitleIconClick = () => {
		resumeTitleRef.current.select();
	};

	//更新各個 block 的資料

	const handleInputData = useCallback(
		(blockInput) => {
			console.log(blockInput);
			let newBlockData = [...inputData];
			const index = newBlockData.findIndex(
				(i) => i.block === blockInput.block
			);
			newBlockData[index] = {
				...newBlockData[index],
				content: blockInput.content,
			};
			setInputData(newBlockData);
		},
		[inputData]
	);

	return (
		<Root>
			<ResumeDataArea>
				<ResumeData>
					<TitleBlock>
						<ResumeTitle
							type="text"
							value={resumeTitle}
							onChange={handleResumeTitleChange}
							ref={resumeTitleRef}
						/>
						<ResumeTitleIcon
							src="/images/icon/edit.png"
							onClick={handleResumeTitleIconClick}
						/>
					</TitleBlock>

					<RenderBlocks
						inputData={inputData}
						handleInputData={handleInputData}
						components={components}
					/>
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
