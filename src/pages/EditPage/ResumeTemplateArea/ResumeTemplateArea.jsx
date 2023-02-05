import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ResumeTempBackground = styled.div`
	width: 15%;
	height: 100%;
	position: fixed;
	top: 0px;
	left: 0px;
	border-right: 1px solid ${(props) => props.theme.color.neutral[60]};
	background-color: ${(props) => props.theme.color.neutral[70]};
	padding-top: 60px;
	overflow-y: auto;
	scrollbar-gutter: stable;

	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-track {
		background: none;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}
`;

const TempCollectionsArea = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px 30px;
`;

const Template = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 40px;
`;

const Preview = styled.div`
	/* scale: 0.95; */
	width: 90%;
	height: 0;
	padding-bottom: calc(90% / 0.707);
	background-color: #fff;
	margin-bottom: 10px;
	border-radius: 5px;
	box-sizing: content-box;
	outline: 5px solid rgb(0, 0, 0, 0);
	transition: outline 0.2s;
	cursor: pointer;
	/* outline: 5px solid #00ff00; */

	&:hover {
		transition: outline 0.2s;
		outline: 5px solid ${(props) => props.theme.color.blue[50]};
	}
`;

const Name = styled.div`
	${(props) => props.theme.font.content};
	color: #fff;
`;

ResumeTemplateArea.propTypes = {
	resumeStyle: PropTypes.object,
	setResumeStyle: PropTypes.func,
};

export default function ResumeTemplateArea({ resumeStyle, setResumeStyle }) {
	const handlePreviewClick = (tempName) => {
		setResumeStyle({ ...resumeStyle, template: tempName });
		console.log(tempName);
	};

	return (
		<>
			<ResumeTempBackground>
				<TempCollectionsArea>
					<Template>
						<Preview
							onClick={handlePreviewClick("Sydney")}></Preview>
						<Name>Sydney</Name>
					</Template>
					<Template>
						<Preview
							onClick={handlePreviewClick("London")}></Preview>
						<Name>London</Name>
					</Template>
				</TempCollectionsArea>
			</ResumeTempBackground>
		</>
	);
}
