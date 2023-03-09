import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {
	SubtitleStyle,
	MainTitleStyle,
	CallToActionStyle,
} from "../homepage.style";

import {
	MEDIA_QUERY_MD,
	MEDIA_QUERY_LG_HOME,
} from "../../../utils/style/breakpotins";

const Career = styled.div`
	width: 100%;
	height: 758px;
	padding: 120px 0;
	background-color: ${(props) => props.theme.color.indigo[80]};

	${MEDIA_QUERY_LG_HOME} {
		height: auto;
	}
`;

const Container = styled.div`
	margin: 0 auto;
	width: 950px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;

	${MEDIA_QUERY_LG_HOME} {
		flex-direction: column-reverse;
		flex-wrap: wrap;
		width: 100%;
	}
`;

const Info = styled.div`
	width: 550px;
	margin-right: 80px;

	${MEDIA_QUERY_LG_HOME} {
		margin-right: 0px;
		margin-top: 20px;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	${MEDIA_QUERY_MD} {
		width: 90%;
	}
`;

const SubTitle = styled.div`
	${SubtitleStyle}
	text-align: left;
	color: ${(props) => props.theme.color.amber[30]};

	${MEDIA_QUERY_LG_HOME} {
		text-align: center;
	}
`;

const MainTitle = styled.div`
	${MainTitleStyle}
	margin-bottom: 20px;
	text-align: left;

	${MEDIA_QUERY_LG_HOME} {
		text-align: center;
	}
`;

const Content = styled.div`
	${(props) => props.theme.font.homePageDescription};
	margin-bottom: 20px;
`;

const CallToAction = styled.div`
	${CallToActionStyle}
`;

const TemplatesPreview = styled.div`
	width: 405px;
	height: 500px;

	${MEDIA_QUERY_LG_HOME} {
		width: auto;
		display: flex;
		justify-content: center;
	}

	${MEDIA_QUERY_MD} {
		width: 220px;
		height: 300px;
	}
`;

const Templates = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	${MEDIA_QUERY_LG_HOME} {
		left: -190px;
	}

	${MEDIA_QUERY_MD} {
		left: 0;
	}

	/* margin: 0 auto; */
`;

const TemplateBefore = styled.img`
	height: 70%;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 5px;
	overflow: hidden;
`;

const TemplateAfter = styled.img`
	height: 70%;
	position: absolute;
	top: 130px;
	left: 130px;
	overflow: hidden;
	border-radius: 5px;
	box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.3);

	${MEDIA_QUERY_MD} {
		left: 65px;
		top: 65px;
	}
`;

export default function CareerArea() {
	const navigate = useNavigate();

	return (
		<Career>
			<Container>
				<Info>
					<SubTitle>START BUILDING YOUR CAREER</SubTitle>
					<MainTitle>
						Professional resumes for effective job interviews
					</MainTitle>
					<Content>
						A great job application leads to a good interview. An
						amazing resume is what makes it all possible. Start off
						strong with the hiring manager by creating a positive
						professional image. A job interview can be much easier
						if they have a favorable view of your CV.
					</Content>
					<CallToAction
						onClick={() => {
							navigate("/signup");
						}}>
						Get Started Now
					</CallToAction>
				</Info>
				<TemplatesPreview>
					<Templates>
						<TemplateBefore src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FcareerArea_london.png?alt=media&token=a855bc7f-cd2b-4efd-ad73-0d906ef651c6"></TemplateBefore>
						<TemplateAfter src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FcareerArea_sydney.png?alt=media&token=60554225-b219-425b-8da0-6af40bc80e04"></TemplateAfter>
					</Templates>
				</TemplatesPreview>
			</Container>
		</Career>
	);
}
