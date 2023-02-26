import React, { useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const leftAreaComponents = {
	Courses: Courses,
	Education: Education,
	Internships: Internships,
	ECActivities: ECActivities,
	CustomSection: CustomSection,
	EmploymentHistory: EmploymentHistory,
	ProfessionalSummary: ProfessionalSummary,
};

const rightAreaComponents = {
	Skills: Skills,
	Languages: Languages,
	WebsiteLink: WebsiteLink,
	PersonalDetails: PersonalDetails,
};

const HideRender = styled.div`
	${HideRenderStyle}
`;

const RenderRoot = styled.div`
	${RenderRootStyle}
	position: relative;
`;

const RenderContainer = styled.div`
	${RenderContainerStyle}
	width: 65%;
	position: absolute;
	top: 0;
	left: 0;
	line-height: 1.5em;
`;

const RenderBackground = styled.div`
	position: absolute;
	padding: 0px 30px;
	top: 0;
	right: 0;
	height: 100%;
	width: 35%;
	overflow-wrap: break-word;
	line-height: 1.5em;
`;

const Main = styled.div`
	width: 100%;
	margin-bottom: 30px;
	overflow-wrap: break-word;
	display: flex;
	align-items: center;
`;

const UserPhotoArea = styled.div`
	height: 55px;
	width: 55px;
	border-radius: 55px;
	margin-right: 20px;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PurePhoto = styled.img`
	width: 100%;
	height: 100%;
`;

const UserInfoArea = styled.div`
	width: ${(props) => (props.photo ? "80%" : "100%")};
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const Name = styled.div`
	font-family: "PT Sans Narrow", sans-serif;
	font-size: 30px;
	width: 100%;
`;

const Position = styled.div`
	font-family: "Open Sans", sans-serif;
	font-size: 9px;
	text-transform: uppercase;
	width: 100%;
	margin-top: 5px;
`;

const MarginTop = styled.div`
	margin-top: 85px;
	width: 100%;
`;

const RenderBlocks = ({ formBlocks, components }) => {
	return formBlocks.map((block) => {
		const BlockName = block.block;
		const content = block.content;
		const id = block.id;
		const Component = components[BlockName];
		if (!Component) return null;
		return <Component content={content} key={id} />;
	});
};

RenderTemplate.propTypes = {
	setLeftAreaBlocks: PropTypes.func,
	setRightAreaBlocks: PropTypes.func,
	croppedUserPhotoUrl: PropTypes.string,
};

export default function RenderTemplate({
	setLeftAreaBlocks,
	setRightAreaBlocks,
	croppedUserPhotoUrl,
}) {
	const renderContainerRef = useRef();
	const renderBackgroundRef = useRef();

	const formBlocks = useSelector((state) => state.formData.formBlocks);
	const firstName = formBlocks[0].content.inputData?.firstName;
	const lastName = formBlocks[0].content.inputData?.lastName;
	const position = formBlocks[0].content.inputData?.position;
	const photoUrl = formBlocks[0].content.inputData?.photo?.url;

	//實現分頁邏輯，分爲左右欄位來計算
	usePagination(
		renderContainerRef,
		setLeftAreaBlocks,
		formBlocks,
		croppedUserPhotoUrl
	);
	usePagination(
		renderBackgroundRef,
		setRightAreaBlocks,
		formBlocks,
		croppedUserPhotoUrl
	);

	return (
		<HideRender>
			<RenderRoot>
				<RenderContainer ref={renderContainerRef}>
					<div>
						{(firstName || lastName || position || photoUrl) && (
							<Main>
								{photoUrl && (
									<UserPhotoArea>
										<PurePhoto src={croppedUserPhotoUrl} />
									</UserPhotoArea>
								)}
								<UserInfoArea photo={photoUrl}>
									{(firstName || lastName) && (
										<Name>
											{firstName}
											{firstName && lastName && " "}
											{lastName}
										</Name>
									)}
									{position && (
										<Position>{position}</Position>
									)}
								</UserInfoArea>
							</Main>
						)}
					</div>

					<RenderBlocks
						formBlocks={formBlocks}
						components={leftAreaComponents}
					/>
				</RenderContainer>
				<RenderBackground ref={renderBackgroundRef}>
					<div>
						<MarginTop />
					</div>

					<RenderBlocks
						formBlocks={formBlocks}
						components={rightAreaComponents}
					/>
				</RenderBackground>
			</RenderRoot>
		</HideRender>
	);
}
