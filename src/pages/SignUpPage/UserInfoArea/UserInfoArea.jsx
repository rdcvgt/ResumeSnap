import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
	useFirstNameValidation,
	useLastNameValidation,
} from "../../../utils/firebase/auth";

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

const ContinueButton = styled.div`
	${MainButtonStyle}
	width: 100px;
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

UserInfoArea.propTypes = {
	setError: PropTypes.func,
	setIsClickSkip: PropTypes.func,
	setIsClickContinue: PropTypes.func,
	firstNameState: PropTypes.object,
	lastNameState: PropTypes.object,
};

export default function UserInfoArea({
	setError,
	setIsClickSkip,
	setIsClickContinue,
	firstNameState,
	lastNameState,
}) {
	const { firstName, setFirstName } = firstNameState;
	const { lastName, setLastName } = lastNameState;

	const [firstNameError, setFirstNameError] = useState(null);
	const [lastNameError, setLastNameError] = useState(null);

	const HandleContinueButtonClick = () => {
		const firstNameResult = useFirstNameValidation(
			firstName,
			setFirstNameError
		);
		const lastNameResult = useLastNameValidation(
			lastName,
			setLastNameError
		);
		if (firstNameResult && lastNameResult) {
			setIsClickContinue(true);
		}
	};

	return (
		<SignUpArea>
			<Title>Add your name</Title>
			<Description>Let’s add your name to your new resume!</Description>
			<ContentArea>
				<InputContainer>
					<InputTitle firstNameError={firstNameError}>
						First Name
					</InputTitle>
					<Input
						firstNameError={firstNameError}
						onChange={(e) => {
							setFirstNameError(null);
							setError(null);
							setFirstName(e.target.value);
						}}
						type="text"
						name="firstName"
						value={firstName}
					/>
					<ErrorMessage>{firstNameError}</ErrorMessage>
				</InputContainer>
				<InputContainer>
					<InputTitle lastNameError={lastNameError}>
						Last Name
					</InputTitle>
					<Input
						lastNameError={lastNameError}
						onChange={(e) => {
							setLastNameError(null);
							setError(null);
							setLastName(e.target.value);
						}}
						type="text"
						name="lastName"
						value={lastName}
					/>
					<ErrorMessage>{lastNameError}</ErrorMessage>
				</InputContainer>
				<BottomButtonArea>
					<BackButton
						onClick={() => {
							setIsClickSkip(false);
							setFirstNameError(false);
							setLastNameError(false);
						}}>
						Back
					</BackButton>
					<ContinueButton onClick={HandleContinueButtonClick}>
						continue
					</ContinueButton>
				</BottomButtonArea>
			</ContentArea>
		</SignUpArea>
	);
}
