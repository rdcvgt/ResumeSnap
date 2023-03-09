import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ResumeContainer = styled.div`
	height: auto;
`;

const Main = styled.div`
	margin-bottom: 20px;
	overflow-wrap: break-word;
`;

const Title = styled.div`
	font-family: "PT Sans Narrow", sans-serif;
	font-size: 20px;
`;

const Content = styled.div`
	font-family: "Open Sans", sans-serif;
	font-size: 10px;
	text-decoration: none;
	line-height: 1.5em;
	margin-top: 10px;
`;

ProfessionalSummary.propTypes = {
	content: PropTypes.object,
};

export default function ProfessionalSummary({ content }) {
	if (!content.inputData) return;
	let blockTitle = content.blockTitle;
	let htmlText = content.inputData.inputHtml;

	let newHtmlText;
	if (htmlText) {
		newHtmlText = htmlText.replace(
			/(<a href)/g,
			`<a style="color: #000000" href`
		);
	}
	const noContent = "<p><br></p>";
	const space = "\u00A0";

	return (
		<ResumeContainer>
			{htmlText && htmlText !== noContent && (
				<Main>
					<Title style={{ margin: 0 }}>{blockTitle}</Title>
					<Content
						dangerouslySetInnerHTML={{
							__html: newHtmlText,
						}}></Content>
				</Main>
			)}
		</ResumeContainer>
	);
}
