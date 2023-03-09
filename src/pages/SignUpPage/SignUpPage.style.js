import { css } from "styled-components";

import {
	DefaultButtonStyle,
	SecondaryButtonStyle,
} from "../../components/buttons/button.style";

import { MEDIA_QUERY_MD } from "../../utils/style/breakpotins";

export const SignUpAreaStyle = css`
	position: absolute;
	top: 150px;
	left: 50%;
	width: 100%;
	transform: translate(-50%, 0);

	${MEDIA_QUERY_MD} {
		width: 90%;
	}
`;

export const TitleStyle = css`
	text-align: center;
	${(props) => props.theme.font.pageTitle};
	color: ${(props) => props.theme.color.blue[50]};

	${MEDIA_QUERY_MD} {
		text-align: left;
	}
`;

export const DescriptionStyle = css`
	margin-top: 20px;
	text-align: center;
	${(props) => props.theme.font.content};

	${MEDIA_QUERY_MD} {
		text-align: left;
	}
`;

export const ContentAreaStyle = css`
	margin: 50px auto;
	width: 400px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;

	${MEDIA_QUERY_MD} {
		width: 100%;
	}
`;

export const BottomButtonAreaStyle = css`
	margin-top: 50px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const BackButtonStyle = css`
	${SecondaryButtonStyle}
	width: 70px;
	height: 40px;
`;

export const MainButtonStyle = css`
	${DefaultButtonStyle}
	width: 160px;
	height: 40px;
`;

export const InputContainerStyle = css`
	margin-bottom: 20px;
	width: 100%;
`;

export const InputTitleStyle = css`
	${(props) => props.theme.input.title};
`;

export const InputStyle = css`
	${(props) => props.theme.input.shortInput};

	${(props) =>
		(props.firstNameError ||
			props.lastNameError ||
			props.emailError ||
			props.passwordError) &&
		`
	border: 1px solid #fb4458;
`};
`;

export const ErrorMessageStyle = css`
	${(props) => props.theme.font.content};
	color: ${(props) => props.theme.color.red[50]};
	margin-top: 5px;
`;
