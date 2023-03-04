import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import HomeHeroArea from "./HomeHeroArea";
import TrustCommentArea from "./TrustCommentArea";
import HowToDoArea from "./HowToDoArea";
import ShowcaseArea from "./ShowcaseArea";
import ResumeMakerArea from "./ResumeMakerArea";
import CareerArea from "./CareerArea";
import QuestionArea from "./QuestionArea";
import Footer from "./Footer";

const Root = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.theme.color.neutral[10]};
`;

const Stats = styled.div`
	width: 100%;
	height: 502px;
	background-color: #fff;
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
			<ButtonArea>
				<Button to="/edit">點此開始</Button>
				<Button to="/signup">點此註冊</Button>
				<Button to="/signIn">點此登入</Button>
			</ButtonArea>
			<HomeHeroArea />
			<TrustCommentArea />
			<HowToDoArea />
			<ResumeMakerArea />
			<ShowcaseArea />

			<CareerArea />
			<QuestionArea />
			<Footer />
		</Root>
	);
}
