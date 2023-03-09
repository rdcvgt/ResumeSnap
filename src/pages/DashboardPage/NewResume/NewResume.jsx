import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
	MEDIA_QUERY_MD,
	MEDIA_QUERY_LG,
} from "../../../utils/style/breakpotins";

const NewResumeArea = styled.div`
	width: 50%;
	height: 268.7px;
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-bottom: 50px;

	${MEDIA_QUERY_LG} {
		display: none;
	}
`;

const AddResumeButton = styled.div`
	width: 190px;
	height: 268.7px;
	border: 1px solid ${(props) => props.theme.color.neutral[20]};
	border-radius: 5px;
	margin-right: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Round = styled.div`
	width: 70px;
	height: 70px;
	border-radius: 70px;
	background-color: ${(props) => props.theme.color.neutral[10]};
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.3s;

	${(props) =>
		props.isHoverNewResume &&
		`
		background-color: #1a91f0;
		transition: all 0.3s;
		`}
`;

const AddResumeIcon = styled.img`
	width: 30px;
	filter: brightness(1.3);
	transition: all 0.3s;

	${(props) =>
		props.isHoverNewResume &&
		`
		filter: brightness(2);
		transition: all 0.3s;
		`}
`;

const AddResumeText = styled.div`
	height: 100%;
	width: 50%;
	color: ${(props) => props.theme.color.neutral[40]};
`;

const AddResumeTitle = styled.div`
	${(props) => props.theme.font.title};
	transition: all 0.3s;
	margin-bottom: 5px;

	${(props) =>
		props.isHoverNewResume &&
		`
		color: #1a91f0;
		transition: all 0.3s;
		`}
`;

const AddResumeContent = styled.div`
	${(props) => props.theme.font.info};
`;

NewResume.propTypes = {
	handleNewResumeClick: PropTypes.func,
};

export default function NewResume({ handleNewResumeClick }) {
	const [isHoverNewResume, setIsHoverNewResume] = useState(false);

	return (
		<NewResumeArea
			onClick={handleNewResumeClick}
			onMouseEnter={() => {
				setIsHoverNewResume(true);
			}}
			onMouseLeave={() => {
				setIsHoverNewResume(false);
			}}>
			<AddResumeButton>
				<Round isHoverNewResume={isHoverNewResume}>
					<AddResumeIcon
						isHoverNewResume={isHoverNewResume}
						src="/images/icon/plus_thin.png"
					/>
				</Round>
			</AddResumeButton>
			<AddResumeText>
				<AddResumeTitle isHoverNewResume={isHoverNewResume}>
					New Resume
				</AddResumeTitle>
				<AddResumeContent>
					Create a tailored resume for each job application. Double
					your chances of getting hired!
				</AddResumeContent>
			</AddResumeText>
		</NewResumeArea>
	);
}
