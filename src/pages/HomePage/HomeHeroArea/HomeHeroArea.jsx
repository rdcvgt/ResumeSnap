import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { DefaultButtonStyle } from "../../../components/buttons/button.style";

import { SubtitleStyle, MainTitleStyle } from "../homepage.style";

const HomeHero = styled.div`
	margin-top: 80px;
	width: 100%;
	height: 740px;
	padding-top: 64px;
	overflow: hidden;
	position: relative;
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
`;

const Description = styled.div`
	${(props) => props.theme.font.homePageDescription};
	text-align: center;
	margin: 0 auto;
	width: 600px;
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

const ResumeArea = styled.div`
	width: 770px;
	border-radius: 10px;
	position: absolute;
	bottom: -250px;
	left: 50%;
	transform: translate(-50%, 0);
	animation: ${moveIn} 1.2s forwards;
	overflow: hidden;
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
