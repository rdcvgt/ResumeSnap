import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { DefaultButtonStyle } from "../../../components/buttons/button.style";

import { SubtitleStyle, MainTitleStyle } from "../homepage.style";

const TrustComment = styled.div`
	width: 100%;
	height: 664px;
	background-color: #fff;
	border-bottom: 1px solid ${(props) => props.theme.color.neutral[20]};
	padding: 120px 32px;
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

const RatingArea = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	height: auto;
	user-select: none;
`;

const Overview = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	height: 150px;
`;

const Stats = styled.div`
	width: 100%;
	text-align: center;
	margin-bottom: 10px;
	font-size: 20px;
`;

const StarsArea = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
`;

const OverviewStar = styled.img`
	margin-left: 10px;
	width: 30px;

	&:nth-child(1) {
		margin-left: 0;
	}
`;

const CommentArea = styled.div`
	width: calc(280px * 3);
	height: 100%;
	position: relative;
	overflow: hidden;
`;

const MoveComment = styled.div`
	display: flex;
	position: relative;
	left: -1680px;
	transition: all 0.3s;
	width: 100%;
	height: 100%;
`;

const Comment = styled.div`
	min-width: 230px;
	height: 180px;
	margin-right: 50px;
`;

const CommentStarsArea = styled.div`
	display: flex;
	width: 100%;

	&:nth-child(1) {
		margin-right: 0;
	}
`;

const Star = styled.img`
	width: 15px;
	margin-left: 5px;
	margin-bottom: 10px;

	&:nth-child(1) {
		margin-left: 0;
	}
`;

const Header = styled.div`
	font-weight: 600;
	font-size: 18px;
	margin-bottom: 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const Content = styled.div`
	height: 96px;
	width: 100%;
	margin-bottom: 15px;
	${(props) => props.theme.font.homePageDescription};
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
`;

const UserInfo = styled.div`
	${(props) => props.theme.font.info};
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.color.neutral[40]};
`;

const ProgressArea = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 40px;
`;

const Button = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 30px;
	background-color: ${(props) => props.theme.color.neutral[10]};
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 20px;
	cursor: pointer;

	&:nth-child(1) {
		margin-left: 0;
	}
`;

const ArrowIcon = styled.img`
	transform: rotate(90deg);
	width: 10px;

	transition: all 0.3s;
`;

const comments = [
	{
		num: 5,
		header: "My experience was great",
		content:
			"My experience was great , super easy to use it and flawless. Life saver!!",
		info: "Herbert • about 1 hour ago",
	},
	{
		num: 5,
		header: "Very Cool Service",
		content:
			"I like the templates. They let you generate several different types of layout. ",
		info: "Rachel Patterson • about 2 hours ago",
	},
	{
		num: 4,
		header: "Nicely designed platform and resume…",
		content:
			"Nicely designed platform and resume templates. I have 2 versions that I built for shifting my career paths. I was in manufacturing before but now want to get into education.. ",
		info: "Micah Sun • about 3 hours ago",
	},
	{
		num: 5,
		header: "Transform resume to new template in secs",
		content:
			"I was struggling to build a new format for my resume, but this tool made it easy and simple. Now, I can concentrate more on the resume content rather than the format (there are good templates available).",
		info: "csaks-newuser • about 8 hours ago",
	},
	{
		num: 5,
		header: "Using ResumeSnap makes the task of…",
		content:
			"Using ResumeSnap makes the task of creating a resume less painful. Very glad I found it.",
		info: "Bryan Bradley • about 18 hours ago",
	},
	{
		num: 5,
		header: "Boombastic tool resume kit…",
		content:
			"live and online resume enable to assist me to generate ideas and recalled all the input memories.",
		info: "NIK FAKHRUL • 25 minutes ago",
	},
];

export default function HomePageArea() {
	const MoveCommentRef = useRef();

	const handleLeftButtonClick = () => {
		const currentLeft = parseInt(MoveCommentRef.current.style.left);
		MoveCommentRef.current.style.left = `${currentLeft + 280}px`;

		if (currentLeft + 280 === 0) {
			setTimeout(() => {
				MoveCommentRef.current.style.transition = "none";
				MoveCommentRef.current.style.left = "-1680px";
			}, 300);
		}

		MoveCommentRef.current.style.transition = "all 0.3s";
	};

	const handleRightButtonClick = () => {
		const currentLeft = parseInt(MoveCommentRef.current.style.left);
		MoveCommentRef.current.style.left = `${currentLeft - 280}px`;

		if (currentLeft - 280 === -3360) {
			setTimeout(() => {
				MoveCommentRef.current.style.transition = "none";
				MoveCommentRef.current.style.left = "-1680px";
			}, 300);
		}

		MoveCommentRef.current.style.transition = "all 0.3s";
	};

	useEffect(() => {
		if (MoveCommentRef.current) {
			MoveCommentRef.current.style.left = "-1680px";
		}
	}, []);

	return (
		<TrustComment>
			<Container>
				<MainTitle>
					Reviewed by the community. Trusted by professionals
				</MainTitle>
				<RatingArea>
					<Overview>
						<Stats>4.5 out of 5</Stats>
						<StarsArea>
							<OverviewStar src="/images/icon/star.png" />
							<OverviewStar src="/images/icon/star.png" />
							<OverviewStar src="/images/icon/star.png" />
							<OverviewStar src="/images/icon/star.png" />
							<OverviewStar src="/images/icon/half_star.png" />
						</StarsArea>
						<ProgressArea>
							<Button onClick={handleLeftButtonClick}>
								<ArrowIcon src="/images/icon/down_blue.png" />
							</Button>

							<Button onClick={handleRightButtonClick}>
								<ArrowIcon src="/images/icon/up_blue.png" />
							</Button>
						</ProgressArea>
					</Overview>
					<CommentArea>
						<MoveComment ref={MoveCommentRef}>
							{comments.map((comment) => (
								<Comment key={comment.header}>
									<CommentStarsArea>
										{Array.from({
											length: comment.num,
										}).map((_, index) => (
											<Star
												key={index}
												src="/images/icon/star.png"
											/>
										))}
									</CommentStarsArea>
									<Header>{comment.header}</Header>
									<Content>{comment.content}</Content>
									<UserInfo>{comment.info}</UserInfo>
								</Comment>
							))}
							{comments.map((comment) => (
								<Comment key={comment.header}>
									<CommentStarsArea>
										{Array.from({
											length: comment.num,
										}).map((_, index) => (
											<Star
												key={index}
												src="/images/icon/star.png"
											/>
										))}
									</CommentStarsArea>
									<Header>{comment.header}</Header>
									<Content>{comment.content}</Content>
									<UserInfo>{comment.info}</UserInfo>
								</Comment>
							))}
							{comments.map((comment) => (
								<Comment key={comment.header}>
									<CommentStarsArea>
										{Array.from({
											length: comment.num,
										}).map((_, index) => (
											<Star
												key={index}
												src="/images/icon/star.png"
											/>
										))}
									</CommentStarsArea>
									<Header>{comment.header}</Header>
									<Content>{comment.content}</Content>
									<UserInfo>{comment.info}</UserInfo>
								</Comment>
							))}
						</MoveComment>
					</CommentArea>
				</RatingArea>
			</Container>
		</TrustComment>
	);
}
