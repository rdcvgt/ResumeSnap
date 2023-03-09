import { css } from "styled-components";

/* main button */
export const DefaultButtonStyle = css`
	width: 130px;
	height: 40px;
	border-radius: 5px;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;

	color: #fff;
	${(props) => props.theme.font.itemBold};
	background-color: ${(props) => props.theme.color.blue[50]};
	transition: all 0.3s;

	&:hover {
		transition: all 0.3s;
		background-color: ${(props) => props.theme.color.blue[60]};
	}
`;

export const SecondaryButtonStyle = css`
	${DefaultButtonStyle}
	border: 1px solid #ccc;
	background-color: #fff;
	color: #000;

	&:hover {
		transition: all 0.3s;
		border: 1px solid ${(props) => props.theme.color.blue[50]};
		color: ${(props) => props.theme.color.blue[50]};
		background-color: #fff;
	}
`;

/* button effect */
export const darkerWhenHover = css`
	cursor: pointer;
	opacity: 0.5;
	transition: all 0.3s;

	&:hover {
		transition: all 0.3s;
		opacity: 1;
	}
`;
