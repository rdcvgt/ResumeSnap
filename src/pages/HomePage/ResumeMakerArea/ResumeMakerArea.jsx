import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { DefaultButtonStyle } from "../../../components/buttons/button.style";

import {
	SubtitleStyle,
	MainTitleStyle,
	CallToActionStyle,
} from "../homepage.style";

const ResumeMaker = styled.div`
	width: 100%;
	height: 730px;
	padding: 120px 0;
	background-color: #fff;
	display: flex;
	align-items: center;
`;

const Container = styled.div`
	margin: 0 auto;
	width: 1200px;
	display: flex;
	align-items: center;
	justify-content: center; ;
`;

const MainInfo = styled.div`
	width: 500px;
	/* margin: 0 auto; */
`;

const MainTitle = styled.div`
	${MainTitleStyle}
	margin-bottom: 20px;
	text-align: left;
`;

const MainDescription = styled.div`
	width: 100%;
	margin-bottom: 20px;
	${(props) => props.theme.font.homePageDescription};
`;

const CallToAction = styled.div`
	${CallToActionStyle}
`;

const SectionImage = styled.img`
	width: 300px;
	margin-right: 100px;
`;

export default function ResumeMakerArea() {
	const navigate = useNavigate();
	return (
		<ResumeMaker>
			<Container>
				<SectionImage src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FresumeMakerArea_dreamJob.png?alt=media&token=6619eae3-bce2-467d-b27d-3ad4472f2f6a" />

				<MainInfo>
					<MainTitle>
						Use the best resume maker as your guide
					</MainTitle>
					<MainDescription>
						Getting that dream job can seem like an impossible task.
						We’re here to change that. Give yourself a real
						advantage with the best online resume maker: created by
						experts, improved by data, trusted by millions of
						professionals.
					</MainDescription>
					<CallToAction
						onClick={() => {
							navigate("/signup");
						}}>
						Try it Now
					</CallToAction>
				</MainInfo>
			</Container>
		</ResumeMaker>
	);
}
