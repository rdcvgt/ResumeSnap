import { css } from "styled-components";

/* template */
export const ImgStyle = css`
	width: 101%;
	height: 101%;
	position: absolute;
	opacity: 1;
`;

/* First Render */
export const HideRenderStyle = css`
	opacity: 0;
	top: 0;
	right: 0;
	position: absolute;
	scale: 0.1;
`;

export const RenderRootStyle = css`
	width: 210mm;
	height: 297mm;
`;

export const RenderContainerStyle = css`
	width: 100%;
	height: 100%;
	padding: 0px 50px;
`;

/* Second Render */
export const HidePagesStyle = css`
	opacity: ${(props) => (props.pageFrom === "share" ? "1" : "0")};
	width: 100%;
`;

export const PageRootStyle = css`
	width: 210mm;
	height: 297mm;
	position: relative;
	margin-bottom: 50px;
	background-color: ${(props) =>
		props.pageFrom === "share" ? "#fff" : "none"};
	box-shadow: ${(props) =>
		props.pageFrom === "share"
			? "5px 5px 20px rgba(43, 49, 108, 0.2);"
			: "none"};
`;

export const ResumeMainContainerStyle = css`
	width: 100%;
	height: 100%;
	padding: 50px;
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
	line-height: 1.5em;
`;
