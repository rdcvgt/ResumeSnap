import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { MainTitleStyle, CallToActionStyle } from "../homepage.style";

import {
	MEDIA_QUERY_MD,
	MEDIA_QUERY_LG_HOME,
} from "../../../utils/style/breakpotins";

const HowToDo = styled.div`
	width: 100%;
	height: 1000px;
	padding: 120px 0;
	display: flex;
	align-items: center;

	${MEDIA_QUERY_LG_HOME} {
		height: auto;
		padding: 60px 0;
	}
`;

const Container = styled.div`
	margin: 0 auto;
	width: 100%;
	overflow: hidden;
`;

const MainInfo = styled.div`
	width: 600px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;

	${MEDIA_QUERY_MD} {
		width: 90%;
	}
`;

const MainTitle = styled.div`
	${MainTitleStyle}
	margin-bottom: 20px;
	text-align: center;
	width: 100%;
`;

const MainDescription = styled.div`
	width: 100%;
	margin-bottom: 20px;
	${(props) => props.theme.font.homePageDescription};
	text-align: center;
`;

const CallToAction = styled.div`
	${CallToActionStyle}
`;

const HowToArea = styled.div`
	width: 800px;
	margin: 80px auto;

	${MEDIA_QUERY_LG_HOME} {
		width: 730px;
		margin: 40px auto 0 auto;
	}

	${MEDIA_QUERY_MD} {
		width: 90%;
	}
`;

const Steps = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const Step = styled.div`
	width: 260px;
	height: 70px;
	border-radius: 5px 5px 0px 0px;
	background-color: #fff;
	padding: 15px;
	opacity: ${(props) => (props.isFocused ? "1" : "0.5")};
	cursor: pointer;
	transition: all 0.3s;

	${MEDIA_QUERY_LG_HOME} {
		width: 235px;
	}

	${MEDIA_QUERY_MD} {
		width: 100%;
		display: ${(props) => (props.isFocused ? "block" : "none")};
	}
`;

const StepText = styled.div`
	font-size: 20px;
	font-weight: 500;
`;

const ProgressBar = styled.div`
	position: relative;
	width: 100%;
	height: 3px;
	background-color: ${(props) => props.theme.color.neutral[20]};
	margin-top: 10px;
`;

const progressing = keyframes`
	0% {
		width: 0;
	}
	100%{
		width: 100%
	}
`;

const Progress = styled.div`
	display: ${(props) => (props.isFocused ? "block" : "none")};
	position: absolute;
	background-color: ${(props) => props.theme.color.blue[50]};
	width: 0;
	height: 3px;
	top: 0;
	left: 0;
	animation: ${progressing} 10s both linear;
`;

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`;

const InfoBackground = styled.div`
	width: 100%;
	height: 300px;
	background-color: #fff;
	border-radius: 0px 0px 5px 5px;

	${MEDIA_QUERY_MD} {
		height: auto;
	}
`;

const InfoCard = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	padding: 50px;
	animation: ${fadeIn} 0.7s both;

	${MEDIA_QUERY_MD} {
		padding: 20px;
		padding-top: 10;
	}
`;

const Info = styled.div`
	width: 432px;

	${MEDIA_QUERY_MD} {
		width: 100%;
	}
`;

const InfoTitle = styled.div`
	font-size: 24px;
	font-weight: 500;
	margin-bottom: 20px;
	color: ${(props) => props.theme.color.indigo[80]};
`;

const InfoContent = styled.div`
	${(props) => props.theme.font.homePageDescription};
`;

const InfoImageBox = styled.div`
	width: 200px;
	display: flex;
	justify-content: center;
	align-items: center;

	${MEDIA_QUERY_MD} {
		display: none;
	}
`;

const InfoImage = styled.img`
	width: 100%;
	width: 150px;
`;

const DotsArea = styled.div`
	display: none;
	justify-content: center;
	align-items: center;
	margin-top: 30px;

	${MEDIA_QUERY_MD} {
		display: flex;
	}
`;
const Dot = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 10px;
	background-color: ${(props) => (props.isFocused ? "#1a91f0" : "#bec4d5")};
	margin-right: 10px;

	&:nth-last-child(1) {
		margin: 0;
	}
`;

export default function HowToDoArea() {
	const navigate = useNavigate();
	const [isFocused, setIsFocused] = useState(1);
	const [timer, setTimer] = useState(null);

	useEffect(() => {
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			setIsFocused((pre) => {
				if (pre + 1 > 3) {
					return 1;
				}
				return pre + 1;
			});
		}, 10000);
		setTimer(newTimer);
	}, [isFocused]);

	return (
		<HowToDo>
			<Container>
				<MainInfo>
					<MainTitle>
						Create perfect resumes for the modern job market
					</MainTitle>
					<MainDescription>
						Creating a resume has never been this easy! In three
						simple steps, create the perfect document to impress
						hiring managers and employers. Minimum time, maximum
						professional quality.
					</MainDescription>
					<CallToAction
						onClick={() => {
							navigate("/signup");
						}}>
						Create My Resume
					</CallToAction>
				</MainInfo>
				<HowToArea>
					<Steps>
						<Step
							isFocused={isFocused === 1 ? true : false}
							onClick={() => {
								setIsFocused(1);
							}}>
							<StepText>1. Sign Up</StepText>
							<ProgressBar>
								<Progress
									isFocused={isFocused === 1 ? true : false}
								/>
							</ProgressBar>
						</Step>
						<Step
							isFocused={isFocused === 2 ? true : false}
							onClick={() => {
								setIsFocused(2);
							}}>
							<StepText>2. Create</StepText>
							<ProgressBar>
								<Progress
									isFocused={isFocused === 2 ? true : false}
								/>
							</ProgressBar>
						</Step>
						<Step
							isFocused={isFocused === 3 ? true : false}
							onClick={() => {
								setIsFocused(3);
							}}>
							<StepText>3. Download</StepText>
							<ProgressBar>
								<Progress
									isFocused={isFocused === 3 ? true : false}
								/>
							</ProgressBar>
						</Step>
					</Steps>

					<InfoBackground>
						{isFocused === 1 && (
							<InfoCard>
								<Info>
									<InfoTitle>Your First Steps</InfoTitle>
									<InfoContent>
										We’ve made sure that signing up to our
										resume maker tools is even more
										convenient than usual. Use the most
										common networks used by professionals
										(your Google account) or simply skip
										this step and enter your name and email
										address. We keep your data strictly
										confidential.
									</InfoContent>
								</Info>
								<InfoImageBox>
									<InfoImage src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FhowToDoArea_signup.png?alt=media&token=616a7a4a-5a36-4eea-b6f8-1d869ad90adf" />
								</InfoImageBox>
							</InfoCard>
						)}

						{isFocused === 2 && (
							<InfoCard>
								<Info>
									<InfoTitle>
										Achieve Beauty With Ease
									</InfoTitle>
									<InfoContent>
										Choose one of our beautiful,
										professionally designed resume formats.
										Add your personal info and choose and
										edit the necessary sections. Customize
										the layout and visuals as much (or as
										little) as you want. We provide a ton of
										ready content with lots of room for your
										own creativity and needs.
									</InfoContent>
								</Info>
								<InfoImageBox>
									<InfoImage src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FhowToDoArea_create.png?alt=media&token=484e89e0-1042-405c-9dfd-1d3db384af27" />
								</InfoImageBox>
							</InfoCard>
						)}

						{isFocused === 3 && (
							<InfoCard>
								<Info>
									<InfoTitle>{"Now It's yours!"}</InfoTitle>
									<InfoContent>
										Export your new resume, CV in one of the
										available formats. PDF will provide you
										with the best and most consistent visual
										formatting. You can also share your
										career updates online.
									</InfoContent>
								</Info>
								<InfoImageBox>
									<InfoImage src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FhowToDoArea_download.png?alt=media&token=799cdcce-870b-4b04-9162-bdab8a53d022" />
								</InfoImageBox>
							</InfoCard>
						)}
					</InfoBackground>
					<DotsArea>
						<Dot isFocused={isFocused === 1 ? true : false} />
						<Dot isFocused={isFocused === 2 ? true : false} />
						<Dot isFocused={isFocused === 3 ? true : false} />
					</DotsArea>
				</HowToArea>
			</Container>
		</HowToDo>
	);
}
