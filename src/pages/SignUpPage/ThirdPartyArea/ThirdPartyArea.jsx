import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
	SignUpAreaStyle,
	TitleStyle,
	DescriptionStyle,
	ContentAreaStyle,
	BottomButtonAreaStyle,
	BackButtonStyle,
	MainButtonStyle,
	ErrorMessageStyle,
} from "../SignUpPage.style";

const SignUpArea = styled.div`
	${SignUpAreaStyle}
	width: 450px;
`;

const Title = styled.div`
	${TitleStyle}
`;

const Description = styled.div`
	${DescriptionStyle}
`;

const ContentArea = styled.div`
	${ContentAreaStyle}
`;

const GoogleButtonArea = styled.div`
	width: 100%;
	height: 60px;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	cursor: pointer;
	transition: all 0.3s;
	background-color: ${(props) => props.theme.color.neutral[15]};

	&:hover {
		transition: all 0.3s;
		color: ${(props) => props.theme.color.blue[50]};
		background-color: ${(props) => props.theme.color.blue[10]};
	}
`;

const ThirdParty = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const BrandIcon = styled.img`
	margin-right: 20px;
	width: 15px;
`;

const BrandName = styled.div``;

const RightArrowIcon = styled.img`
	width: 15px;
	transform: rotate(90deg);
`;

const BottomButtonArea = styled.div`
	${BottomButtonAreaStyle}
`;

const BackButton = styled.div`
	${BackButtonStyle}
`;

const SkipButton = styled.div`
	${MainButtonStyle}
	width: 70px;
`;

const ErrorMessage = styled.div`
	${ErrorMessageStyle}
	margin-top: 10px;
`;

const SignUpTextArea = styled.div`
	text-align: center;
	${(props) => props.theme.font.content};
	color: ${(props) => props.theme.color.neutral[40]};
	margin-top: 30px;
`;

const SignUpButton = styled.a`
	cursor: pointer;
	color: ${(props) => props.theme.color.blue[50]};
	transition: all 0.3s;

	&:hover {
		color: ${(props) => props.theme.color.blue[60]};
		transition: all 0.3s;
	}
`;

ThirdPartyArea.propTypes = {
	errorState: PropTypes.object,
	setError: PropTypes.func,
	setIsClickSkip: PropTypes.func,
	HandleGoogleButtonClick: PropTypes.func,
};

export default function ThirdPartyArea({
	errorState,
	setIsClickSkip,
	HandleGoogleButtonClick,
}) {
	const { error, setError } = errorState;
	const navigate = useNavigate();

	const handleSignUpButtonClick = () => {
		navigate("/signin");
	};

	return (
		<SignUpArea>
			<Title>Connect your social profile to new resume</Title>
			<Description>
				Prefill your resume with data from your social profile
			</Description>
			<ContentArea>
				<GoogleButtonArea onClick={HandleGoogleButtonClick}>
					<ThirdParty>
						<BrandIcon src="/images/icon/google.png" />
						<BrandName>Google</BrandName>
					</ThirdParty>
					<RightArrowIcon src="/images/icon/up_blue.png" />
				</GoogleButtonArea>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<BottomButtonArea>
					<BackButton
						onClick={() => {
							navigate("/");
						}}>
						Back
					</BackButton>
					<SkipButton
						onClick={() => {
							setError(null);
							setIsClickSkip(true);
						}}>
						Skip
					</SkipButton>
				</BottomButtonArea>
			</ContentArea>
			<SignUpTextArea>
				Already have an account? —
				<SignUpButton onClick={handleSignUpButtonClick}>
					{" "}
					Sign In
				</SignUpButton>
			</SignUpTextArea>
		</SignUpArea>
	);
}
