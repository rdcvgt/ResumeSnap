import { css, keyframes } from "styled-components";
import {
	MEDIA_QUERY_MD,
	MEDIA_QUERY_LG,
} from "../../../utils/style/breakpotins";

/* basic layout */
export const RootStyle = css`
	border-radius: 5px;
	border: 1px solid ${(props) => props.theme.color.neutral[10]};
	/* position: relative; */
	margin-bottom: 15px;
	background-color: #fff;
`;

export const ItemDescriptionStyle = css`
	width: 100%;
	height: 65px;
	cursor: pointer;
	padding: 20px;
	display: flex;
	align-items: center;
	/* overflow: hidden; */
	position: relative;
`;

export const DragBlockStyle = css`
	height: 20px;
	width: 30px;
	position: absolute;
	left: -30px;
	display: flex;
	align-items: center;
	opacity: 0;
	transition: filter 0.3s, opacity 0.3s;

	${(props) =>
		props.isHover &&
		`
	filter: brightness(1.4);
	opacity: 1;
	transition: filter 0.3s, opacity 0.3s;
	`}

	&:hover {
		filter: brightness(1);
		opacity: 1;
		transition: filter 0.3s, opacity 0.3s;
	}

	${MEDIA_QUERY_LG} {
		opacity: 1;
	}
`;

export const DragIconStyle = css`
	height: 100%;
`;

export const DeleteBlockStyle = css`
	height: 20px;
	width: 30px;
	position: absolute;
	right: -35px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	opacity: 0;
	transition: filter 0.3s, opacity 0.3s;

	${(props) =>
		props.isHover &&
		`
	filter: brightness(1.4);
	opacity: 1;
	transition: filter 0.3s, opacity 0.3s;
	`}

	&:hover {
		filter: brightness(1);
		opacity: 1;
		transition: filter 0.3s, opacity 0.3s;
	}

	${MEDIA_QUERY_LG} {
		opacity: 1;
	}
`;

export const DeleteIconStyle = css`
	height: 100%;
`;

export const ItemInfoStyle = css`
	width: 90%;
`;

export const ItemTitleStyle = css`
	${(props) => props.theme.font.itemBold};
	width: 100%;
	margin-bottom: 5px;
	color: ${(props) => props.theme.color.neutral[90]};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	transition: color 0.3s;
	height: 18px;

	${(props) =>
		props.isHover &&
		`
	color: #1a91f0;
	`}
`;

export const ItemDurationStyle = css`
	${(props) => props.theme.input.title};
	width: 100%;
	margin: 0;
`;

export const ItemArrowIconStyle = css`
	width: 15px;
	position: absolute;
	top: 25px;
	right: 20px;
`;

export const BlockRowStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;

	${MEDIA_QUERY_MD} {
		width: 100%;
		margin-bottom: 0;
		flex-wrap: wrap;
	}
`;

export const LeftColStyle = css`
	width: 50%;
	padding-right: 15px;

	${MEDIA_QUERY_MD} {
		width: 100%;
		margin-bottom: 15px;
		padding-right: 0px;
	}
`;

export const RightColStyle = css`
	padding-left: 15px;
	width: 50%;

	${MEDIA_QUERY_MD} {
		width: 100%;
		margin-bottom: 15px;
		padding-left: 0px;
	}
`;

export const DateBlockStyle = css`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export const DateInputStyle = css`
	${(props) => props.theme.input.shortInput};
	width: 45%;
`;

export const InputTitleStyle = css`
	${(props) => props.theme.input.title};
`;

export const ShortInputStyle = css`
	${(props) => props.theme.input.shortInput};
`;

export const LongInputBoxStyle = css`
	margin-bottom: 20px;
`;

export const MoreInputStyle = css`
	padding: 0px 20px;
	overflow: hidden;
	max-height: 0;
	opacity: 0;
	transition: max-height 0.8s, opacity 0.8s;
	cursor: default;
	${(props) =>
		props.isClick &&
		`
max-height: 600px; overflow: visible; opacity: 1;
`}

	${MEDIA_QUERY_MD} {
		${(props) =>
			props.isClick &&
			`
max-height: 0px; overflow: hidden; opacity: 0;
`}
	}
`;

/* menu layout */

export const MenuStyle = css`
	width: 100%;
	height: 50px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.color.neutral[10]};
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	position: relative;
	user-select: none;

	${(props) =>
		props.isSelect &&
		`
		border-radius: 5px 5px 0px 0px;
	`}
`;

export const DefaultTextStyle = css`
	${(props) => props.theme.font.content};
	margin: 15px;
	color: ${(props) => (props.level ? "#000" : props.theme.color.neutral[40])};
`;

export const ArrowIconStyle = css`
	width: 15px;
	margin: 15px;
`;

const fadeIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1;}
`;

export const OptionsStyle = css`
	list-style: none;
	position: absolute;
	top: 50px;
	list-style-type: none;
	width: 100%;
	border-radius: 0px 0px 5px 5px;
	background-color: ${(props) => props.theme.color.neutral[10]};
	height: 120px;
	overflow-y: scroll;
	scrollbar-gutter: stable;
	box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
	animation: ${fadeIn} 0.3s forwards;
	z-index: 10;

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

export const OptionStyle = css`
	${(props) => props.theme.font.content};
	height: 40px;
	display: flex;
	align-items: center;
	padding: 0px 15px;

	&:before {
		content: "";
		display: none;
	}

	&:first-child {
		color: ${(props) => props.theme.color.neutral[40]};
	}

	&:hover {
		background-color: ${(props) => props.theme.color.blue[20]};
		color: ${(props) => props.theme.color.blue[50]};
	}
`;
