import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

import {
	updateBlockOrder,
	updateResumeName,
} from "../../../redux/slices/formDataSlice";
import PersonalDetails from "../../../components/forms/PersonalDetails";
import ProfessionalSummary from "../../../components/forms/ProfessionalSummary";
import Education from "../../../components/forms/Education";
import EmploymentHistory from "../../../components/forms/EmploymentHistory";

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

const components = {
	PersonalDetails: PersonalDetails,
	ProfessionalSummary: ProfessionalSummary,
	Education: Education,
	EmploymentHistory: EmploymentHistory,
};

const RenderBlocks = ({ formBlocks }) => {
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
	const resumeTitleRef = useRef(null);
	const dispatch = useDispatch();

	const resumeName = useSelector((state) => state.formData.resumeName);
	const handleResumeTitleChange = (e) => {
		dispatch(updateResumeName({ resumeName: e.target.value }));
	};

	const handleResumeTitleIconClick = () => {
		resumeTitleRef.current.select();
	};

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
					<PersonalDetails />
					<ProfessionalSummary />
					<DragDropContext onDragEnd={handleOnDragEndBlock}>
						<Droppable droppableId="blocks">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}>
									<RenderBlocks formBlocks={formBlocks} />
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</ResumeData>
			</ResumeFormBackground>
		</>
	);
}
