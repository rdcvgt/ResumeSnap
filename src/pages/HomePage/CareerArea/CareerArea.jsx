import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { DefaultButtonStyle } from "../../../components/buttons/button.style";

import {
	SubtitleStyle,
	MainTitleStyle,
	CallToActionStyle,
} from "../homepage.style";

const Career = styled.div`
	width: 100%;
	height: 758px;
	padding: 120px 0;
	background-color: ${(props) => props.theme.color.indigo[80]};
`;

const Container = styled.div`
	margin: 0 auto;
	width: 1200px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Info = styled.div`
	width: 500px;
	margin-right: 80px;
`;

const SubTitle = styled.div`
	${SubtitleStyle}
	text-align: left;
	color: ${(props) => props.theme.color.amber[30]};
`;

const MainTitle = styled.div`
	${MainTitleStyle}
	margin-bottom: 20px;
	text-align: left;
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
	height: 520px;
`;

const Templates = styled.div`
	position: relative;
	margin: 0 auto;
`;

const TemplateBefore = styled.div`
	width: 270px;
	height: calc(270px * 1.414);
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 5px;
	overflow: hidden;
`;

const TemplateAfter = styled.div`
	width: 270px;
	height: calc(270px * 1.414);
	position: absolute;
	top: 130px;
	left: 130px;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.3);
`;

const Template = styled.img`
	width: 100%;
`;

export default function CareerArea() {
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
					<CallToAction>Get Started Now</CallToAction>
				</Info>
				<TemplatesPreview>
					<Templates>
						<TemplateBefore>
							<Template src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FcareerArea_london.png?alt=media&token=a855bc7f-cd2b-4efd-ad73-0d906ef651c6" />
						</TemplateBefore>
						<TemplateAfter>
							<Template src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FcareerArea_sydney.png?alt=media&token=60554225-b219-425b-8da0-6af40bc80e04" />
						</TemplateAfter>
					</Templates>
				</TemplatesPreview>
			</Container>
		</Career>
	);
}
