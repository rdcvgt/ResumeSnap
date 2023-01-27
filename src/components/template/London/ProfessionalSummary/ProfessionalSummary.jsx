import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ResumeContainer = styled.div`
	width: 100%;
	height: auto;
`;

const Block = styled.div`
	height: auto;
	border-top: 1px solid #000;
	padding-top: 20px;
	margin-bottom: 20px;
	display: flex;
`;

const Title = styled.div`
	font-size: 14px;
	font-weight: 500;
	width: 20%;
`;

const Content = styled.div`
	font-size: 10px;
	text-decoration: none;
	width: 80%;
	line-height: 1.5em;
`;

ProfessionalSummary.propTypes = {
	data: PropTypes.object,
};

export default function ProfessionalSummary({ data }) {
	if (!data) return;
	let blockTitle = data.blockTitle;
	let htmlText = data.inputHtml;

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
				<Block>
					<Title style={{ margin: 0 }}>{blockTitle}</Title>
					<Content
						dangerouslySetInnerHTML={{
							__html: newHtmlText,
						}}></Content>
				</Block>
			)}
		</ResumeContainer>
	);
}
