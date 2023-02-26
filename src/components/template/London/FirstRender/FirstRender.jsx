import React, { useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import "../../utils/htmlElement.css";
import Skills from "../resumeBlocks/Skills";
import Courses from "../resumeBlocks/Courses";
import Education from "../resumeBlocks/Education";
import Languages from "../resumeBlocks/Languages";
import WebsiteLink from "../resumeBlocks/WebsiteLink";
import Internships from "../resumeBlocks/Internships";
import ECActivities from "../resumeBlocks/ECActivities";
import CustomSection from "../resumeBlocks/CustomSection";
import PersonalDetails from "../resumeBlocks/PersonalDetails";
import EmploymentHistory from "../resumeBlocks/EmploymentHistory";
import ProfessionalSummary from "../resumeBlocks/ProfessionalSummary";

import usePagination from "../../utils/hooks/usePagination";
import {
	HideRenderStyle,
	RenderRootStyle,
	RenderContainerStyle,
} from "../../utils/template.style";

const components = {
	Skills: Skills,
	Courses: Courses,
	Education: Education,
	Languages: Languages,
	WebsiteLink: WebsiteLink,
	Internships: Internships,
	ECActivities: ECActivities,
	CustomSection: CustomSection,
	PersonalDetails: PersonalDetails,
	EmploymentHistory: EmploymentHistory,
	ProfessionalSummary: ProfessionalSummary,
};

const HideRender = styled.div`
	${HideRenderStyle}
`;

const RenderRoot = styled.div`
	${RenderRootStyle}
`;

const RenderContainer = styled.div`
	${RenderContainerStyle}
`;

const RenderBlocks = ({ formBlocks }) => {
	return formBlocks.map((block) => {
		const BlockName = block.block;
		const content = block.content;
		const id = block.id;
		const Component = components[BlockName];
		if (!Component) return null;
		return <Component content={content} key={id} />;
	});
};

FirstRender.propTypes = {
	setBlocks: PropTypes.func,
};

export default function FirstRender({ setBlocks }) {
	const renderContainerRef = useRef();
	const formBlocks = useSelector((state) => state.formData.formBlocks);

	//實現分頁邏輯
	usePagination(renderContainerRef, setBlocks, formBlocks);

	return (
		<HideRender>
			<RenderRoot>
				<RenderContainer ref={renderContainerRef}>
					<RenderBlocks formBlocks={formBlocks} />
				</RenderContainer>
			</RenderRoot>
		</HideRender>
	);
}
