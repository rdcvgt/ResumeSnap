import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
	SignUpAreaStyle,
	TitleStyle,
	DescriptionStyle,
	ContentAreaStyle,
	BottomButtonAreaStyle,
	BackButtonStyle,
	MainButtonStyle,
	InputContainerStyle,
	InputTitleStyle,
	InputStyle,
	ErrorMessageStyle,
} from "../SignUpPage.style";

import {
	useEmailValidation,
	usePasswordValidation,
} from "../../../utils/firebase/auth";

const SignUpArea = styled.div`
	${SignUpAreaStyle}
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

const BottomButtonArea = styled.div`
	${BottomButtonAreaStyle}
`;

const BackButton = styled.div`
	${BackButtonStyle}
`;

const CreateNewButton = styled.div`
	${MainButtonStyle}
`;

const InputContainer = styled.div`
	${InputContainerStyle}
`;

const InputTitle = styled.div`
	${InputTitleStyle}
`;

const Input = styled.input`
	${InputStyle}
`;

const ErrorMessage = styled.div`
	${ErrorMessageStyle}
`;

RegistrationArea.propTypes = {
	errorState: PropTypes.object,
	emailState: PropTypes.object,
	passwordState: PropTypes.object,
	HandleLogin: PropTypes.func,
	setIsClickContinue: PropTypes.func,
};

export default function RegistrationArea({
	errorState,
	emailState,
	passwordState,
	HandleLogin,
	setIsClickContinue,
}) {
	const { error, setError } = errorState;
	const { email, setEmail } = emailState;
	const { password, setPassword } = passwordState;

	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	const HandleCreateNewButtonClick = () => {
		const emailResult = useEmailValidation(email, setEmailError);
		const passwordResult = usePasswordValidation(
			password,
			setPasswordError
		);

		if (!emailResult || !passwordResult) return;
		HandleLogin();
	};

	return (
		<SignUpArea>
			<Title>You are almost there！</Title>
			<Description>
				Enter your email address and password below to complete
				registration.
			</Description>
			<ContentArea>
				<InputContainer>
					<InputTitle emailError={emailError}>Email</InputTitle>
					<Input
						emailError={emailError}
						onChange={(e) => {
							setEmailError(null);
							setError(null);
							setEmail(e.target.value);
						}}
						type="email"
						name="email"
						value={email}
					/>
					<ErrorMessage>{emailError}</ErrorMessage>
				</InputContainer>
				<InputContainer>
					<InputTitle passwordError={passwordError}>
						Password
					</InputTitle>
					<Input
						passwordError={passwordError}
						onChange={(e) => {
							setPasswordError(null);
							setError(null);
							setPassword(e.target.value);
						}}
						type="password"
						name="password"
						value={password}
					/>
					<ErrorMessage>{passwordError}</ErrorMessage>
				</InputContainer>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<BottomButtonArea>
					<BackButton
						onClick={() => {
							setIsClickContinue(false);
							setEmailError(false);
							setPasswordError(false);
						}}>
						Back
					</BackButton>
					<CreateNewButton onClick={HandleCreateNewButtonClick}>
						Create New Resume
					</CreateNewButton>
				</BottomButtonArea>
			</ContentArea>
		</SignUpArea>
	);
}
