import React, { useState, useRef, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "react-uuid";
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

const ResumePreviewInfo = styled.div`
	width: 80%;
	height: 100%;
	margin: auto auto;
	position: relative;
`;

const ResumePreviewTopFunc = styled.div`
	width: 100%;
	height: auto;
	position: absolute;
	top: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const SavingProgress = styled.div``;

const PaginationArea = styled.div`
	display: flex;
	align-items: center;
`;

const PrePage = styled.div``;
const NextPage = styled.div``;

const PageIconBox = styled.div`
	width: 25px;
	height: 25px;
	border-radius: 30px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: background-color 0.3s;
	&:hover {
		background-color: ${(props) => props.theme.color.neutral[70]};
		transition: background-color 0.3s;
	}
`;

const PrePageIcon = styled.img`
	width: 10px;
`;

const NextPageIcon = styled.img`
	width: 10px;
`;

const Pages = styled.div`
	margin: 0 5px;
	color: #fff;
	${(props) => props.theme.font.content};
	cursor: default;
`;

const ResumePreviewBottomFunc = styled.div`
	width: 100%;
	height: auto;
	position: absolute;
	bottom: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const SelectTemplateButtonArea = styled.div`
	width: 150px;
	height: 40px;
	border-radius: 20px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s;

	&:hover {
		background-color: ${(props) => props.theme.color.neutral[70]};
		transition: background-color 0.3s;
	}
`;

const SelectTemplateIcon = styled.img`
	width: 15px;
	margin-right: 10px;
`;

const SelectTemplateButton = styled.div`
	color: #fff;
	${(props) => props.theme.font.content};
	font-size: 16px;
	transition: background-color 0.3s;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const OutputButtonArea = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
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

const OutputButton = styled.div`
	width: 120px;
	height: 40px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.color.blue[50]};
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	${(props) => props.theme.font.itemBold};
	margin-left: 20px;
	transition: background-color 0.3s;

	&:hover {
		transition: background-color 0.3s;
		background-color: ${(props) => props.theme.color.blue[60]};
	}
`;

const components = {
	PersonalDetails: PersonalDetails,
	ProfessionalSummary: ProfessionalSummary,
	Education: Education,
	EmploymentHistory: EmploymentHistory,
};

const RenderBlocks = ({ inputData, handleInputData }) => {
	return inputData.map((block, index) => {
		const blockName = block.block;
		if (
			blockName === "PersonalDetails" ||
			blockName === "ProfessionalSummary"
		)
			return null;
		const id = block.id;
		const Component = components[blockName];
		if (!Component) return null;
		return (
			<Draggable key={id} draggableId={id} index={index}>
				{(provided) => (
					<div {...provided.draggableProps} ref={provided.innerRef}>
						<Component
							handleInputData={handleInputData}
							dragHandleProps={{
								...provided.dragHandleProps,
							}}
						/>
					</div>
				)}
			</Draggable>
		);
	});
};

React.memo(RenderBlocks);

export default function EditPage() {
	const [inputData, setInputData] = useState([
		{ block: "PersonalDetails", content: {}, id: uuid() },
		{ block: "ProfessionalSummary", content: {}, id: uuid() },
		{ block: "Education", content: {}, id: uuid() },
		{ block: "EmploymentHistory", content: {}, id: uuid() },
	]);
	const [resumeTitle, setResumeTitle] = useState("我的第一份履歷");
	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const resumeTitleRef = useRef(null);

	const handleOnDragEndBlock = useCallback(
		(result) => {
			if (!result.destination) return;
			const blocks = Array.from(inputData);
			const [reorderBlock] = blocks.splice(result.source.index, 1);
			blocks.splice(result.destination.index, 0, reorderBlock);
			setInputData(blocks);
		},
		[inputData]
	);

	//更新各個 block 的資料
	const handleInputData = (blockInput) => {
		let newBlockData = [...inputData];
		const index = newBlockData.findIndex(
			(i) => i.block === blockInput.block
		);
		newBlockData[index] = {
			...newBlockData[index],
			content: blockInput.content,
		};
		setInputData(newBlockData);
	};

	const handleResumeTitleChange = (e) => {
		setResumeTitle(e.target.value);
	};

	const handleResumeTitleIconClick = () => {
		resumeTitleRef.current.select();
	};

	let downloadPdfFunc = null;
	const handleGetDownLoadPdfFunc = (func) => {
		downloadPdfFunc = func;
	};

	const handleDownloadPdf = () => {
		if (downloadPdfFunc) {
			downloadPdfFunc();
		}
	};

	const getTotalPage = (count) => {
		setTotalPage(count);
	};

	const handleNextPageClick = () => {
		if (currentPage === totalPage) return;
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const handlePrePageClick = () => {
		if (currentPage === 1) return;
		setCurrentPage((prevPage) => prevPage - 1);
	};

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
					<PersonalDetails handleInputData={handleInputData} />
					<ProfessionalSummary handleInputData={handleInputData} />
					<DragDropContext onDragEnd={handleOnDragEndBlock}>
						<Droppable droppableId="blocks">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}>
									<RenderBlocks
										inputData={inputData}
										handleInputData={handleInputData}
									/>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</ResumeData>
			</ResumeDataArea>
			<ResumePreviewArea>
				<ResumePreviewInfo>
					<ResumePreviewTopFunc>
						<SavingProgress></SavingProgress>
						<PaginationArea>
							<PrePage onClick={handlePrePageClick}>
								<PageIconBox>
									<PrePageIcon src="/images/icon/left.png" />
								</PageIconBox>
							</PrePage>
							<Pages>
								{currentPage} / {totalPage}
							</Pages>
							<NextPage onClick={handleNextPageClick}>
								<PageIconBox>
									<NextPageIcon src="/images/icon/right.png" />
								</PageIconBox>
							</NextPage>
						</PaginationArea>
					</ResumePreviewTopFunc>
					<ResumePreview>
						<London
							inputData={inputData}
							handleGetDownLoadPdfFunc={handleGetDownLoadPdfFunc}
							getTotalPage={getTotalPage}
							currentPage={currentPage}
						/>
					</ResumePreview>
					<ResumePreviewBottomFunc>
						<SelectTemplateButtonArea>
							<SelectTemplateIcon src="/images/icon/menu.png" />
							<SelectTemplateButton>
								選擇履歷模板
							</SelectTemplateButton>
						</SelectTemplateButtonArea>

						<OutputButtonArea>
							<OutputButton onClick={handleDownloadPdf}>
								下載 PDF
							</OutputButton>
							<OutputButton onClick={handleDownloadPdf}>
								分享履歷連結
							</OutputButton>
						</OutputButtonArea>
					</ResumePreviewBottomFunc>
				</ResumePreviewInfo>
			</ResumePreviewArea>
		</Root>
	);
}
