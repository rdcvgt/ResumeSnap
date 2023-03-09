import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import NavForHome from "../../components/navbar/NavForHome";
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

export default function HomePage() {
	return (
		<Root>
			<Helmet>
				<title>ResumeSnap</title>
			</Helmet>
			<NavForHome />
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
