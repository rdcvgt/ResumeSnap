import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
		color: #000;
	}
`;

const ResumeMainContainer = styled.div`
	${ResumeMainContainerStyle}
`;

const ResumeSideContainer = styled.div``;

RenderTemplate.propTypes = {
	pageFrom: PropTypes.string,
	blocks: PropTypes.array,
	pageRef: PropTypes.object,
};

export default function RenderTemplate({ pageFrom, pageRef, blocks }) {
	return (
		<HidePages pageFrom={pageFrom}>
			{blocks.map((pages, index) => {
				return (
					<PageRoot
						pageFrom={pageFrom}
						ref={(pages) => (pageRef.current[index] = pages)}
						key={index}>
						<ResumeMainContainer>
							{pages.map((block, index) => {
								return (
									<div
										key={index}
										dangerouslySetInnerHTML={{
											__html: block,
										}}></div>
								);
							})}
						</ResumeMainContainer>
						<ResumeSideContainer />
					</PageRoot>
				);
			})}
		</HidePages>
	);
}
