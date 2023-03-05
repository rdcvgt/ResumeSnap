import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import EmailInputArea from "./EmailInputArea";
import { auth } from "../../utils/firebase/firebaseInit";

import { useGoogle } from "../../utils/firebase/auth";
import { addUserInfo } from "../../redux/reducers/userInfoReducer";

import {
	DefaultButtonStyle,
	SecondaryButtonStyle,
} from "../../components/buttons/button.style";
import LoadingCard from "../../components/cards/LoadingCard";
import NavForEntry from "../../components/navbar/NavForEntry";

const Root = styled.div`
	width: 100%;
	height: 100%;
`;

const LoginArea = styled.div`
	width: 340px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const LoginTitle = styled.div`
	text-align: center;
	${(props) => props.theme.font.pageTitle};
`;

const LoginDescription = styled.div`
	margin-top: 20px;
	text-align: center;
	${(props) => props.theme.font.content};
	color: ${(props) => props.theme.color.neutral[40]};
`;

const ButtonArea = styled.div`
	margin-top: 30px;
`;

const ErrorMessage = styled.div`
	margin-top: 20px;
	${(props) => props.theme.font.content};
	color: ${(props) => props.theme.color.red[50]};
`;

const GoogleButton = styled.div`
	${DefaultButtonStyle}
	width: 100%;
	height: 50px;
	background-color: rgb(219, 68, 55);

	&:hover {
		background-color: rgb(197, 61, 50);
	}
`;

const EmailButton = styled.div`
	${SecondaryButtonStyle}
	width: 100%;
	height: 50px;
	margin-top: 15px;
`;

export default function SignInPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [uid, setUid] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [isLogin, setIsLogin] = useState(false);
	const [error, setError] = useState(null);
	const [loginWithEmail, setLoginWithEmail] = useState(false);

	const HandleGoogleButtonClick = () => {
		useGoogle(setUid, setUserInfo, setError, setIsLogin);
	};

	console.log(userInfo);

	useEffect(() => {
		if (uid && userInfo) {
			dispatch(addUserInfo(uid, userInfo));
			navigate("/dashboard");
			return;
		}
	}, [uid, userInfo, dispatch, navigate]);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate("/dashboard");
			}
		});
	}, [dispatch, navigate]);

	return (
		<Root>
			<Helmet>
				<title>Log In ∙ ResumeSnap</title>
			</Helmet>
			<NavForEntry />
			{!isLogin && (
				<LoginArea>
					<LoginTitle>Log In</LoginTitle>
					<LoginDescription>
						{loginWithEmail
							? "Enter your email and password"
							: "We are happy to see you back!"}
					</LoginDescription>
					{!loginWithEmail && (
						<ButtonArea>
							<GoogleButton onClick={HandleGoogleButtonClick}>
								Google
							</GoogleButton>
							{error && <ErrorMessage>{error}</ErrorMessage>}
							<EmailButton
								onClick={() => {
									setLoginWithEmail(true);
								}}>
								Email
							</EmailButton>
						</ButtonArea>
					)}
					{loginWithEmail && (
						<EmailInputArea
							setUid={setUid}
							setUserInfo={setUserInfo}
							setIsLogin={setIsLogin}
							setLoginWithEmail={setLoginWithEmail}
						/>
					)}
				</LoginArea>
			)}

			{isLogin && (
				<LoadingCard text="Hang tight, we are redirecting you to another page" />
			)}
		</Root>
	);
}
