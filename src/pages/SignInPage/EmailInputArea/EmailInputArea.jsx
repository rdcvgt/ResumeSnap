import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {
	useEmailSignIn,
	useEmailValidation,
	usePasswordValidation,
} from "../../../utils/firebase/auth";

import {
	DefaultButtonStyle,
	SecondaryButtonStyle,
} from "../../../components/buttons/button.style";

const Root = styled.div`
	margin-top: 20px;
`;

const InputContainer = styled.div`
	margin-bottom: 20px;
`;

const InputTitle = styled.div`
	${(props) => props.theme.input.title};
`;

const Input = styled.input`
	${(props) => props.theme.input.shortInput};

	${(props) =>
		(props.emailError || props.passwordError) &&
		`
		border: 1px solid #fb4458;
	`};
`;

const EmailButtonArea = styled.div`
	margin-top: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ErrorMessage = styled.div`
	${(props) => props.theme.font.content};
	color: ${(props) => props.theme.color.red[50]};
	margin-top: 5px;
`;

const BackButton = styled.div`
	${SecondaryButtonStyle}
	height: 50px;
`;

const LoginButton = styled.div`
	${DefaultButtonStyle}
	height: 50px;
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

EmailInputArea.propTypes = {
	setUid: PropTypes.func,
	setIsLogin: PropTypes.func,
	setLoginWithEmail: PropTypes.func,
};

export default function EmailInputArea({
	setUid,
	setIsLogin,
	setLoginWithEmail,
}) {
	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();

	const [error, setError] = useState(null);
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	const HandleLoginButtonClick = () => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const emailResult = useEmailValidation(email, setEmailError);
		const passwordResult = usePasswordValidation(password, setPasswordError);

		if (!emailResult || !passwordResult) return;
		HandleLogin(email, password);
	};

	const HandleLogin = (email, password) => {
		useEmailSignIn(email, password, setUid, setError, setIsLogin);
	};

	const handleSignUpButtonClick = () => {
		navigate("/signup");
	};

	return (
		<Root>
			<InputContainer>
				<InputTitle emailError={emailError}>Email</InputTitle>
				<Input
					emailError={emailError}
					onChange={() => {
						setEmailError(null);
						setError(null);
					}}
					type="email"
					name="email"
					ref={emailRef}
				/>
				<ErrorMessage>{emailError}</ErrorMessage>
			</InputContainer>
			<InputContainer>
				<InputTitle passwordError={passwordError}>Password</InputTitle>
				<Input
					passwordError={passwordError}
					onChange={() => {
						setPasswordError(null);
						setError(null);
					}}
					type="password"
					name="password"
					ref={passwordRef}
				/>
				<ErrorMessage>{passwordError}</ErrorMessage>
			</InputContainer>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<EmailButtonArea>
				<BackButton
					onClick={() => {
						setLoginWithEmail(false);
						setEmailError(null);
						setPasswordError(null);
						setError(null);
					}}>
					back
				</BackButton>
				<LoginButton onClick={HandleLoginButtonClick}>Log In</LoginButton>
			</EmailButtonArea>

			<SignUpTextArea>
				I am not registered —
				<SignUpButton onClick={handleSignUpButtonClick}> Sign Up</SignUpButton>
			</SignUpTextArea>
		</Root>
	);
}
