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
	padding-top: 15px;
	margin-bottom: 15px;
	display: flex;
`;

const Title = styled.div`
	font-size: 14px;
	font-weight: 500;
	width: 20%;
`;

const Content = styled.div`
	font-size: 12px;
	text-decoration: none;
	width: 80%;
	line-height: 1.5em;
`;

ProfessionalSummary.propTypes = {
	inputData: PropTypes.string,
};

export default function ProfessionalSummary({ inputData }) {
	let htmlText = inputData;
	let newHtmlText;
	if (htmlText) {
		newHtmlText = htmlText
			.replace(/(<p>)/g, `<p style="margin: 0">`)
			.replace(/(<ul>)/g, `<ul style="margin: 0">`)
			.replace(/(<ol>)/g, `<ol style="margin: 0">`)
			.replace(/(<a href)/g, `<a style="color: #000000" href`);
	}
	const noContent = "<p style={{margin: 0}}><br></p>";
	const space = "\u00A0";

	return (
		<ResumeContainer>
			{htmlText && htmlText !== noContent && (
				<Block>
					<Title style={{ margin: 0 }}>個人簡介</Title>
					<Content
						dangerouslySetInnerHTML={{
							__html: newHtmlText,
						}}></Content>
				</Block>
			)}
		</ResumeContainer>
	);
}
