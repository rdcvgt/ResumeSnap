import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

import {
	addBlock,
	deleteBlock,
	updateBlockOrder,
	updateResumeName,
} from "../../../redux/slices/formDataSlice";
import PersonalDetails from "../../../components/forms/PersonalDetails";
import ProfessionalSummary from "../../../components/forms/ProfessionalSummary";
import Education from "../../../components/forms/Education";
import EmploymentHistory from "../../../components/forms/EmploymentHistory";
import WebsiteLink from "../../../components/forms/WebsiteLink";
import ECActivities from "../../../components/forms/ECActivities";
import Internships from "../../../components/forms/Internships";
import CustomSection from "../../../components/forms/CustomSection";
import Courses from "../../../components/forms/Courses";
import Skills from "../../../components/forms/Skills";
import Languages from "../../../components/forms/Languages";

const ResumeFormBackground = styled.div`
	width: ${(props) => (props.isChoosingTemp === true ? "0%" : "100%")};
	height: 100%;
	overflow-y: auto;
	scrollbar-gutter: stable;
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

const AddSection = styled.div`
	width: 90%;
	margin: 0 auto;
`;
const AddSectionTitle = styled.div`
	${(props) => props.theme.font.blockTitle};
	margin-bottom: 30px;
`;
const SectionRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
`;
const Section = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		color: ${(props) => props.theme.color.blue[50]};
		transition: all 0.3s;
	}

	${(props) =>
		(props.isUsingECActivities ||
			props.isUsingInternships ||
			props.isUsingCustomSection ||
			props.isUsingCourses ||
			props.isUsingSkills ||
			props.isUsingLanguages) &&
		`
		opacity: 0.4;
		cursor: default;
		&:hover {color: #000}
		`}
`;

const Icon = styled.img`
	width: 30px;
	margin-right: 10px;
`;

const SectionName = styled.div`
	${(props) => props.theme.font.content};
`;

const components = {
	PersonalDetails: PersonalDetails,
	ProfessionalSummary: ProfessionalSummary,
	Education: Education,
	EmploymentHistory: EmploymentHistory,
	WebsiteLink: WebsiteLink,
	ECActivities: ECActivities,
	Internships: Internships,
	CustomSection: CustomSection,
	Courses: Courses,
	Skills: Skills,
	Languages: Languages,
};

const blockData = {
	ECActivities: {
		blockName: "ECActivities",
		blockTitle: "Extra-curricular Activities",
	},
	Internships: {
		blockName: "Internships",
		blockTitle: "Internships",
	},
	CustomSection: {
		blockName: "CustomSection",
		blockTitle: "Custom Section",
	},
	Courses: {
		blockName: "Courses",
		blockTitle: "Courses",
	},
	Hobbies: {
		blockName: "Skills",
		blockTitle: "Skills",
	},
	Languages: {
		blockName: "Languages",
		blockTitle: "Languages",
	},
};

const RenderBlocks = ({ formBlocks, handleDeleteButtonClick }) => {
	return formBlocks.map((block, index) => {
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
							dragHandleProps={{
								...provided.dragHandleProps,
							}}
							blockId={id}
							handleDeleteButtonClick={handleDeleteButtonClick}
						/>
					</div>
				)}
			</Draggable>
		);
	});
};

React.memo(RenderBlocks);

ResumeFormArea.propTypes = {
	isChoosingTemp: PropTypes.bool,
};

export default function ResumeFormArea({ isChoosingTemp }) {
	const [isUsingECActivities, setIsUsingECActivities] = useState(false);
	const [isUsingInternships, setIsUsingInternships] = useState(false);
	const [isUsingCourses, setIsUsingCourses] = useState(false);
	const [isUsingSkills, setIsUsingSkills] = useState(false);
	const [isUsingLanguages, setIsUsingLanguages] = useState(false);

	const dispatch = useDispatch();
	const resumeTitleRef = useRef(null);
	const resumeName = useSelector((state) => state.formData.resumeName);
	const handleResumeTitleChange = (e) => {
		dispatch(updateResumeName({ resumeName: e.target.value }));
	};

	//block 調整順序後重新排序資料陣列
	const formBlocks = useSelector((state) => state.formData.formBlocks);
	const handleOnDragEndBlock = useCallback(
		(result) => {
			if (!result.destination) return;
			const blocks = Array.from(formBlocks);
			const [reorderBlock] = blocks.splice(result.source.index, 1);
			blocks.splice(result.destination.index, 0, reorderBlock);
			dispatch(updateBlockOrder({ newBlockOrder: blocks }));
		},
		[formBlocks, dispatch]
	);

	//點選編輯按鈕，標題全選
	const handleResumeTitleIconClick = () => {
		resumeTitleRef.current.select();
	};

	//點擊刪除 block 按鈕後，最下方各 block 狀態恢復可點選新增
	const handleDeleteButtonClick = (blockId, blockName) => {
		dispatch(deleteBlock({ blockId }));
		switch (blockName) {
			case "ECActivities": {
				setIsUsingECActivities(false);
				break;
			}
			case "Internships": {
				setIsUsingInternships(false);
				break;
			}
			case "Courses": {
				setIsUsingCourses(false);
				break;
			}
			case "Skills": {
				setIsUsingSkills(false);
				break;
			}
			case "Languages": {
				setIsUsingLanguages(false);
				break;
			}
			default: {
				return;
			}
		}
	};

	return (
		<>
			<ResumeFormBackground isChoosingTemp={isChoosingTemp}>
				<ResumeData>
					<TitleBlock>
						<ResumeTitle
							type="text"
							value={resumeName}
							onChange={handleResumeTitleChange}
							ref={resumeTitleRef}
						/>
						<ResumeTitleIcon
							src="/images/icon/edit.png"
							onClick={handleResumeTitleIconClick}
						/>
					</TitleBlock>
					<PersonalDetails blockId={formBlocks[0].id} />
					<ProfessionalSummary blockId={formBlocks[1].id} />
					<DragDropContext onDragEnd={handleOnDragEndBlock}>
						<Droppable droppableId="blocks">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}>
									<RenderBlocks
										formBlocks={formBlocks}
										handleDeleteButtonClick={
											handleDeleteButtonClick
										}
									/>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
					<AddSection>
						<AddSectionTitle>Add Section</AddSectionTitle>
						<SectionRow>
							<Section
								onClick={() => {
									dispatch(
										addBlock({
											blockData: blockData.CustomSection,
										})
									);
								}}>
								<Icon src="/images/icon/custom.png" />
								<SectionName>Custom Section</SectionName>
							</Section>
							<Section
								isUsingCourses={isUsingCourses}
								onClick={() => {
									!isUsingCourses &&
										dispatch(
											addBlock({
												blockData: blockData.Courses,
											})
										);
									setIsUsingCourses(true);
								}}>
								<Icon src="/images/icon/courses.png" />
								<SectionName>Courses</SectionName>
							</Section>
						</SectionRow>
						<SectionRow>
							<Section
								isUsingECActivities={isUsingECActivities}
								onClick={() => {
									!isUsingECActivities &&
										dispatch(
											addBlock({
												blockData:
													blockData.ECActivities,
											})
										);
									setIsUsingECActivities(true);
								}}>
								<Icon src="/images/icon/activity.png" />
								<SectionName>
									Extra-curricular Activities
								</SectionName>
							</Section>
							<Section
								isUsingInternships={isUsingInternships}
								onClick={() => {
									!isUsingInternships &&
										dispatch(
											addBlock({
												blockData:
													blockData.Internships,
											})
										);
									setIsUsingInternships(true);
								}}>
								<Icon src="/images/icon/internship.png" />
								<SectionName>Internships</SectionName>
							</Section>
						</SectionRow>
						<SectionRow>
							<Section
								isUsingSkills={isUsingSkills}
								onClick={() => {
									!isUsingSkills &&
										dispatch(
											addBlock({
												blockData: blockData.Hobbies,
											})
										);
									setIsUsingSkills(true);
								}}>
								<Icon src="/images/icon/hobby.png" />
								<SectionName>Skills</SectionName>
							</Section>
							<Section
								isUsingLanguages={isUsingLanguages}
								onClick={() => {
									!isUsingLanguages &&
										dispatch(
											addBlock({
												blockData: blockData.Languages,
											})
										);
									setIsUsingLanguages(true);
								}}>
								<Icon src="/images/icon/language.png" />
								<SectionName>Languages</SectionName>
							</Section>
						</SectionRow>
					</AddSection>
				</ResumeData>
			</ResumeFormBackground>
		</>
	);
}
