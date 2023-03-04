import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import HomeHeroArea from "./HomeHeroArea";
import TrustCommentArea from "./TrustCommentArea";

const Root = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.theme.color.neutral[10]};
`;

const ResumeMaker = styled.div`
	width: 100%;
	height: 995px;
	background-color: #fff;
`;

const HowToDo = styled.div`
	width: 100%;
	height: 1049px;
`;

const Career = styled.div`
	width: 100%;
	height: 758px;
	background-color: ${(props) => props.theme.color.blue[70]};
`;

const Stats = styled.div`
	width: 100%;
	height: 502px;
	background-color: #fff;
`;

const Footer = styled.div`
	width: 100%;
	height: 453px;
	background-color: #000;
`;

const ButtonArea = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 30px;
`;

const Button = styled(Link)`
	height: 50px;
	width: 100px;
	margin: 0 auto;
	text-decoration: none;
	color: #333;
	background-color: #ccc;
	border-radius: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default function HomePage() {
	return (
		<Root>
			<HomeHeroArea />
			<TrustCommentArea />
			<HowToDo>Create perfect resumes for the modern job market</HowToDo>
			<ResumeMaker>Use the best resume maker as your guide</ResumeMaker>

			<Career>Professional resumes for effective job interviews</Career>
			<Stats>Join over 200000</Stats>
			<Footer>Join over 200000</Footer>

			<ButtonArea>
				<Button to="/edit">點此開始</Button>
				<Button to="/signup">點此註冊</Button>
				<Button to="/signIn">點此登入</Button>
			</ButtonArea>
		</Root>
	);
}
