import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

import {
	addBlock,
	deleteBlock,
	updateBlockOrder,
} from "../../../redux/reducers/formDataReducer";

import Skills from "../../../components/forms/Skills";
import Courses from "../../../components/forms/Courses";
import Languages from "../../../components/forms/Languages";
import Education from "../../../components/forms/Education";
import Internships from "../../../components/forms/Internships";
import WebsiteLink from "../../../components/forms/WebsiteLink";
import ECActivities from "../../../components/forms/ECActivities";
import CustomSection from "../../../components/forms/CustomSection";
import PersonalDetails from "../../../components/forms/PersonalDetails";
import EmploymentHistory from "../../../components/forms/EmploymentHistory";
import ProfessionalSummary from "../../../components/forms/ProfessionalSummary";
import ResumeTitleBlock from "../../../components/forms/utils/ResumeTitleBlock";

import {
	MEDIA_QUERY_MD,
	MEDIA_QUERY_LG,
} from "../../../utils/style/breakpotins";

const ResumeFormBackground = styled.div`
	width: ${(props) => (props.isChoosingTemp === true ? "0%" : "100%")};
	height: 100%;
	overflow-y: auto;
	scrollbar-gutter: stable;
`;

const ResumeData = styled.div`
	max-width: 50%;
	height: 100%;
	padding: 40px 20px 60px 20px;

	${MEDIA_QUERY_LG} {
		max-width: 100%;
	}
`;

const TitleArea = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 40px;
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
	flex-wrap: wrap;
	margin-bottom: 30px;

	${MEDIA_QUERY_MD} {
		margin-bottom: 0;
	}
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

	${MEDIA_QUERY_MD} {
		width: 100%;
		margin-bottom: 30px;
	}
`;

const Icon = styled.img`
	width: 30px;
	margin-right: 10px;
`;

const SectionName = styled.div`
	${(props) => props.theme.font.content};
`;

const components = {
	Skills: Skills,
	Courses: Courses,
	Languages: Languages,
	Education: Education,
	Internships: Internships,
	WebsiteLink: WebsiteLink,
	ECActivities: ECActivities,
	CustomSection: CustomSection,
	PersonalDetails: PersonalDetails,
	EmploymentHistory: EmploymentHistory,
	ProfessionalSummary: ProfessionalSummary,
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
		if (blockName === "PersonalDetails" || blockName === "ProfessionalSummary")
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

	//載入資料後檢查可刪除的 block 是否存在於 formData，以判斷最下方 block 狀態
	useEffect(() => {
		formBlocks.forEach((block) => {
			const blockName = block.block;
			switch (blockName) {
				case "ECActivities": {
					setIsUsingECActivities(true);
					break;
				}
				case "Internships": {
					setIsUsingInternships(true);
					break;
				}
				case "Courses": {
					setIsUsingCourses(true);
					break;
				}
				case "Skills": {
					setIsUsingSkills(true);
					break;
				}
				case "Languages": {
					setIsUsingLanguages(true);
					break;
				}
				default: {
					setIsUsingECActivities(false);
					setIsUsingInternships(false);
					setIsUsingCourses(false);
					setIsUsingSkills(false);
					setIsUsingLanguages(false);
					return;
				}
			}
		});
	}, [formBlocks]);

	return (
		<>
			<ResumeFormBackground isChoosingTemp={isChoosingTemp}>
				<ResumeData>
					<TitleArea>
						<ResumeTitleBlock />
					</TitleArea>

					<PersonalDetails blockId={formBlocks[0].id} />
					<ProfessionalSummary blockId={formBlocks[1].id} />
					<DragDropContext onDragEnd={handleOnDragEndBlock}>
						<Droppable droppableId="blocks">
							{(provided) => (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									<RenderBlocks
										formBlocks={formBlocks}
										handleDeleteButtonClick={handleDeleteButtonClick}
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
												blockData: blockData.ECActivities,
											})
										);
								}}>
								<Icon src="/images/icon/activity.png" />
								<SectionName>Extra-curricular Activities</SectionName>
							</Section>
							<Section
								isUsingInternships={isUsingInternships}
								onClick={() => {
									!isUsingInternships &&
										dispatch(
											addBlock({
												blockData: blockData.Internships,
											})
										);
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
