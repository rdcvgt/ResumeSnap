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
	position: relative;
	min-width: 800px;
	height: auto;
`;

export const PageRootStyle = css`
	width: 210mm;
	height: 297mm;
	scale: 1;
	margin-bottom: 50px;
	background-color: ${(props) =>
		props.pageFrom === "share" ? "#fff" : "none"};
	box-shadow: ${(props) =>
		props.pageFrom === "share"
			? "5px 5px 20px rgba(43, 49, 108, 0.2);"
			: "none"};

	${(props) =>
		props.pageFrom === "share" &&
		`
		@media screen and (max-width: 359px) {
		scale: 0.3;
		margin-top: -300px;

		&:nth-child(2) {
			margin-top: -800px;
		}
	}

	@media screen and (min-width: 360px) {
		scale: 0.4;
		margin-top: -300px;

		&:nth-child(2) {
			margin-top: -700px;
		}
	}

	@media screen and (min-width: 420px) {
		scale: 0.5;
		margin-top: -200px;

		&:nth-child(2) {
			margin-top: -590px;
		}
	}

	@media screen and (min-width: 520px) {
		scale: 0.62;
		margin-top: -100px;

		&:nth-child(2) {
			margin-top: -450px;
		}
	}

	@media screen and (min-width: 648px) {
		scale: 0.78;
		margin-top: 0px;

		&:nth-child(2) {
			margin-top: -250px;
		}
	}

	@media screen and (min-width: 860px) {
		scale: 1;
		margin-top: 100px;
		&:nth-child(2) {
			margin-top: 50px;
		}
	}

	@media screen and (min-width: 1024px) {
		scale: 1.2;
		margin-bottom: 300px;
		margin-top: 250px;
	}
		
	`};
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
