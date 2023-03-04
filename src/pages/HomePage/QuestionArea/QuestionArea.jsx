import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import { MainTitleStyle, DescriptionStyle } from "../homepage.style";

const Root = styled.div`
	width: 100%;
	height: 730px;
	background-color: #fff;
	padding: 120px 32px;
`;

const Container = styled.div`
	margin: 0 auto;
	width: 930px;
`;

const MainTitle = styled.div`
	${MainTitleStyle}
	width: 490px;
	margin-bottom: 64px;
`;

const QuestionsContainer = styled.div`
	width: 100%;
	height: auto;
`;

const Question = styled.div`
	width: 100%;
	height: ${(props) => (props.isFocused ? "137px" : "77px")};
	border-bottom: 1px solid ${(props) => props.theme.color.neutral[20]};
	padding: 24px 36px 24px 0px;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	position: relative;
	transition: all 0.3s;
	cursor: pointer;

	&:nth-last-child(1) {
		border-bottom: none;
	}
`;

const Ask = styled.div`
	font-size: 20px;
	width: 100%;
`;

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`;

const Reply = styled.div`
	${DescriptionStyle}
	display:  ${(props) => (props.isFocused ? "block" : "none")};
	margin-top: 20px;
	text-align: left;
	width: 100%;
	animation: ${fadeIn} 0.7s both;
`;

const DisplayIcon = styled.img`
	position: absolute;
	right: 0;
	top: 24px;
	width: 15px;
	filter: rotate(${(props) => (props.isFocused ? "180deg" : "0deg")});
`;

export default function QuestionArea() {
	const [isFocused, setIsFocused] = useState(null);

	return (
		<Root>
			<Container>
				<MainTitle>Frequently Asked Questions</MainTitle>
				<QuestionsContainer>
					<Question
						isFocused={isFocused === 1 ? true : false}
						onClick={() => {
							setIsFocused(1);
							if (isFocused === 1) {
								setIsFocused(null);
							}
						}}>
						<Ask>How can I use ResumeSnap for free?</Ask>
						<Reply isFocused={isFocused === 1 ? true : false}>
							ResumeSnap has a few different tools you can use
							100% for free without entering any credit card
							details.
						</Reply>
						<DisplayIcon
							src="/images/icon/down_blue.png"
							isFocused={isFocused === 1 ? true : false}
						/>
					</Question>
					<Question
						isFocused={isFocused === 2 ? true : false}
						onClick={() => {
							setIsFocused(2);
							if (isFocused === 2) {
								setIsFocused(null);
							}
						}}>
						<Ask>How can I customize my resume?</Ask>
						<Reply isFocused={isFocused === 2 ? true : false}>
							Our resume templates are designed to adapt to your
							content and look great across all of our designs.
						</Reply>
						<DisplayIcon
							src="/images/icon/down_blue.png"
							isFocused={isFocused === 2 ? true : false}
						/>
					</Question>
					<Question
						isFocused={isFocused === 3 ? true : false}
						onClick={() => {
							setIsFocused(3);
							if (isFocused === 3) {
								setIsFocused(null);
							}
						}}>
						<Ask>Can I download my resume to PDF?</Ask>
						<Reply isFocused={isFocused === 3 ? true : false}>
							Once your resume is ready there are a number of ways
							you can export your resume to start applying for
							jobs. You can download a PDF or share a link of your
							resume either directly from your Dashboard or from
							the Resume Editor.{" "}
						</Reply>
						<DisplayIcon
							src="/images/icon/down_blue.png"
							isFocused={isFocused === 3 ? true : false}
						/>
					</Question>
				</QuestionsContainer>
			</Container>
		</Root>
	);
}
