import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { SubtitleStyle, MainTitleStyle } from "../homepage.style";
import { DefaultButtonStyle } from "../../../components/buttons/button.style";

import {
	MEDIA_QUERY_MD,
	MEDIA_QUERY_LG_HOME,
} from "../../../utils/style/breakpotins";

const HomeHero = styled.div`
	margin-top: 80px;
	width: 100%;
	height: 740px;
	padding-top: 64px;
	overflow: hidden;
	position: relative;

	${MEDIA_QUERY_LG_HOME} {
		height: 596px;
		padding-bottom: 200px;
	}

	${MEDIA_QUERY_MD} {
		height: auto;
		padding-bottom: 35%;
	}
`;

const Container = styled.div`
	margin: 0 auto;
	width: 100%;
`;

const Subtitle = styled.div`
	${SubtitleStyle}
`;

const MainTitle = styled.div`
	${MainTitleStyle}
	width: 740px;

	${MEDIA_QUERY_LG_HOME} {
		font-size: 42px;
	}

	${MEDIA_QUERY_MD} {
		font-size: 32px;
		width: 90%;
	}
`;

const Description = styled.div`
	${(props) => props.theme.font.homePageDescription};
	font-size: 18px;
	text-align: center;
	margin: 0 auto;
	width: 600px;

	${MEDIA_QUERY_MD} {
		width: 90%;
	}
`;

const CallToActionButton = styled.div`
	${DefaultButtonStyle}
	font-size: 18px;
	width: 240px;
	height: 64px;
	margin: 25px auto;
`;

const moveIn = keyframes`
	0% { bottom: -250px; }
	100% { bottom: -145px; }
`;

const moveIn_LG_HOME = keyframes`
	0% { bottom: -150px; }
	100% { bottom: -85px; }
`;

const ResumeArea = styled.div`
	width: 770px;
	border-radius: 10px;
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0);
	animation: ${moveIn} 1.2s forwards;
	overflow: hidden;

	${MEDIA_QUERY_LG_HOME} {
		width: 420px;
		animation: ${moveIn_LG_HOME} 1.2s forwards;
	}

	${MEDIA_QUERY_MD} {
		max-width: 420px;
		width: 90%;
	}
`;

const ResumePreview = styled.img`
	width: 100%;
`;

export default function HomePageArea() {
	const navigate = useNavigate();

	return (
		<HomeHero>
			<Container>
				<Subtitle>ONLINE RESUME BUILDER</Subtitle>
				<MainTitle>
					Only 2% of resumes make it past the first round. Be in the
					top 2%
				</MainTitle>
				<Description>
					Use professional field-tested resume templates that follow
					the exact ‘resume rules’ employers look for. Easy to use and
					done within minutes - try now for free!
				</Description>
				<CallToActionButton
					onClick={() => {
						navigate("/signup");
					}}>
					Create My Resume
				</CallToActionButton>
				<ResumeArea>
					<ResumePreview src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FheroSection_resume.png?alt=media&token=eea6e8e6-3c4c-46d1-a944-5c5b07fcfc82" />
				</ResumeArea>
			</Container>
		</HomeHero>
	);
}
