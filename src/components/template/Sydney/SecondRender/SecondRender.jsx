import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import {
	HidePagesStyle,
	PageRootStyle,
	ResumeMainContainerStyle,
} from "../../utils/template.style";

const HidePages = styled.div`
	${HidePagesStyle}
`;

const PageRoot = styled.div`
	${PageRootStyle}

	& a {
		color: #fff;
	}
`;

const ResumeMainContainer = styled.div`
	${ResumeMainContainerStyle}
	width: 65%;
	padding: 50px 40px;
`;

const ResumeSideContainer = styled.div`
	position: absolute;
	padding: 50px 30px;
	top: 0;
	right: 0;
	height: 100%;
	width: 35%;
	background-color: ${(props) => props.color};
	line-height: 1.5em;
`;

const Block = styled.div`
	margin: auto 0;
	overflow-wrap: break-word;
`;

RenderTemplate.propTypes = {
	pageFrom: PropTypes.string,
	pageRef: PropTypes.object,
	leftAreaBlocks: PropTypes.array,
	rightAreaBlocks: PropTypes.array,
};

export default function RenderTemplate({
	pageFrom,
	pageRef,
	leftAreaBlocks,
	rightAreaBlocks,
}) {
	const color = useSelector((state) => state.formData.color);

	return (
		<HidePages pageFrom={pageFrom}>
			{leftAreaBlocks.length >= rightAreaBlocks.length &&
				leftAreaBlocks.map((pages, index) => {
					return (
						<PageRoot
							pageFrom={pageFrom}
							ref={(pages) => (pageRef.current[index] = pages)}
							key={index}>
							<ResumeMainContainer>
								{pages.map((block, index) => {
									return (
										<Block
											key={index}
											dangerouslySetInnerHTML={{
												__html: block,
											}}></Block>
									);
								})}
							</ResumeMainContainer>
							<ResumeSideContainer color={color}>
								{rightAreaBlocks[index] &&
									rightAreaBlocks[index].map(
										(block, index) => {
											return (
												<Block
													key={index}
													dangerouslySetInnerHTML={{
														__html: block,
													}}></Block>
											);
										}
									)}
							</ResumeSideContainer>
						</PageRoot>
					);
				})}
			{leftAreaBlocks.length < rightAreaBlocks.length &&
				rightAreaBlocks.map((pages, index) => {
					return (
						<PageRoot
							ref={(pages) => (pageRef.current[index] = pages)}
							key={index}>
							<ResumeMainContainer>
								{leftAreaBlocks[index] &&
									leftAreaBlocks[index].map(
										(block, index) => {
											return (
												<Block
													key={index}
													dangerouslySetInnerHTML={{
														__html: block,
													}}></Block>
											);
										}
									)}
							</ResumeMainContainer>
							<ResumeSideContainer color={color}>
								{pages.map((block, index) => {
									return (
										<Block
											key={index}
											dangerouslySetInnerHTML={{
												__html: block,
											}}></Block>
									);
								})}
							</ResumeSideContainer>
						</PageRoot>
					);
				})}
		</HidePages>
	);
}
