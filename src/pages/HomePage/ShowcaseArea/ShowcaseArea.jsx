import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { DefaultButtonStyle } from "../../../components/buttons/button.style";

import { SubtitleStyle, MainTitleStyle } from "../homepage.style";

const ShowCase = styled.div`
	width: 100%;
	height: 950px;
	padding: 120px 0;
`;

const Container = styled.div`
	margin: 0 auto;
	width: 100%;
	overflow: hidden;
`;

const MainTitle = styled.div`
	${MainTitleStyle}
	width: 740px;
	margin-bottom: 64px;
`;

const Content = styled.div`
	display: flex;
	justify-content: center;
	width: 1120px;
	margin: 0 auto;
`;

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`;

const GifArea = styled.div`
	width: 480px;
	height: 480px;
	border-radius: 10px;
	overflow: hidden;
	margin-right: 50px;
	animation: ${fadeIn} 0.7s both;
`;

const Gif = styled.img`
	width: 100%;
`;

const Subjects = styled.div`
	width: 350px;
`;

const Subject = styled.div`
	display: flex;
	align-items: center;
	height: ${(props) => (props.isFocused ? "130px" : "54px")};
	width: 100%;
	background-color: ${(props) => (props.isFocused ? "#fff" : "none")};
	padding: 10px;
	margin-bottom: 20px;
	border-radius: 5px;
	opacity: ${(props) => (props.isFocused ? "1" : "0.6")};
	cursor: pointer;
	transition: all 0.5s;
`;

const Text = styled.div``;

const Title = styled.div`
	font-size: 20px;
	font-weight: 500;
`;

const Intro = styled.div`
	display: ${(props) => (props.isFocused ? "block" : "none")};
	${(props) => props.theme.font.homePageDescription};
	animation: ${fadeIn} 0.3s both;
	margin-top: 10px;
`;

const ProgressBar = styled.div`
	position: relative;
	width: ${(props) => (props.isFocused ? "7px" : "3px")};
	height: 100%;
	background-color: ${(props) => props.theme.color.neutral[20]};
	margin-right: 10px;
	border-radius: 3px;
	overflow: hidden;
`;

const progressing = keyframes`
	0% {
		height: 0;
	}
	100%{
		height: 100%
	}
`;

const Progress = styled.div`
	display: ${(props) => (props.isFocused ? "block" : "none")};
	position: absolute;
	background-color: ${(props) => props.theme.color.blue[50]};
	width: ${(props) => (props.isFocused ? "7px" : "3px")};
	height: 0;
	top: 0;
	left: 0;
	animation: ${progressing} 10s both linear;
`;

export default function ShowCaseArea() {
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
		<ShowCase>
			<Container>
				<MainTitle>
					Effortlessly make a job-worthy resume that gets you hired
					faster
				</MainTitle>
				<Content>
					{isFocused === 1 && (
						<GifArea>
							<Gif src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FshowCaseArea_move.gif?alt=media&token=2748c3ed-bd35-4a1c-97ee-cc0af3247464" />
						</GifArea>
					)}
					{isFocused === 2 && (
						<GifArea>
							<Gif src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FshowCaseArea_pick.gif?alt=media&token=ef3e7b8b-e132-41b7-a7ad-6f7c15ab5135" />
						</GifArea>
					)}
					{isFocused === 3 && (
						<GifArea>
							<Gif src="https://firebasestorage.googleapis.com/v0/b/resumesnap-5041c.appspot.com/o/homepage%2FshowCaseArea_export.gif?alt=media&token=bbdf3b99-ecac-4820-bc05-67e3bfba54d4" />
						</GifArea>
					)}
					<Subjects>
						<Subject
							isFocused={isFocused === 1 ? true : false}
							onClick={() => {
								setIsFocused(1);
							}}>
							<ProgressBar
								isFocused={isFocused === 1 ? true : false}>
								<Progress
									isFocused={isFocused === 1 ? true : false}
								/>
							</ProgressBar>
							<Text>
								<Title>Easily edit online</Title>
								<Intro
									isFocused={isFocused === 1 ? true : false}>
									Creating the perfectly formatted, custom
									tailored resume has never been easier.
								</Intro>
							</Text>
						</Subject>
						<Subject
							isFocused={isFocused === 2 ? true : false}
							onClick={() => {
								setIsFocused(2);
							}}>
							<ProgressBar
								isFocused={isFocused === 2 ? true : false}>
								<Progress
									isFocused={isFocused === 2 ? true : false}
								/>
							</ProgressBar>
							<Text>
								<Title>Custom resume style</Title>
								<Intro
									isFocused={isFocused === 2 ? true : false}>
									Win over employers and recruiters by using
									professionally-designed resume templates.
								</Intro>
							</Text>
						</Subject>
						<Subject
							isFocused={isFocused === 3 ? true : false}
							onClick={() => {
								setIsFocused(3);
							}}>
							<ProgressBar
								isFocused={isFocused === 3 ? true : false}>
								<Progress
									isFocused={isFocused === 3 ? true : false}
								/>
							</ProgressBar>
							<Text>
								<Title>Export to anything</Title>
								<Intro
									isFocused={isFocused === 3 ? true : false}>
									You are in control of your resume and can
									download it as a PDF or share it on a public
									page.
								</Intro>
							</Text>
						</Subject>
					</Subjects>
				</Content>
			</Container>
		</ShowCase>
	);
}
