import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import EmailInputArea from "./EmailInputArea";
import { auth } from "../../utils/firebase/firebaseInit";

import { useGoogle } from "../../utils/firebase/auth";
import { addCurrentUserInfo } from "../../redux/reducers/userInfoReducer";

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
	${SecondaryButtonStyle}
	width: 100%;
	height: 50px;
	color: rgb(219, 68, 55);

	&:hover {
		border: 1px solid rgb(219, 68, 55);
		background-color: rgb(219, 68, 55);
		color: #fff;
	}
`;

export default function SignInPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [uid, setUid] = useState(null);
	const [isLogin, setIsLogin] = useState(false);
	const [error, setError] = useState(null);

	const HandleGoogleButtonClick = () => {
		useGoogle(setUid, null, setError, setIsLogin);
	};

	const userEmail = useSelector((state) => state.userInfo.email);

	useEffect(() => {
		if (uid) {
			dispatch(addCurrentUserInfo(uid));
			navigate("/dashboard");
			return;
		}
	}, [uid, dispatch, navigate]);

	//若使用者已登入則返回 dashboard
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user && userEmail) {
				navigate("/dashboard");
			}
		});
	}, [dispatch, navigate, userEmail]);

	return (
		<Root>
			<Helmet>
				<title>Log In ∙ ResumeSnap</title>
			</Helmet>
			<NavForEntry />
			{!isLogin && (
				<LoginArea>
					<LoginTitle>Log In</LoginTitle>
					<LoginDescription>We are happy to see you back!</LoginDescription>
					<ButtonArea>
						<GoogleButton onClick={HandleGoogleButtonClick}>
							Google
						</GoogleButton>
						{error && <ErrorMessage>{error}</ErrorMessage>}
					</ButtonArea>
					<EmailInputArea setUid={setUid} setIsLogin={setIsLogin} />
				</LoginArea>
			)}

			{isLogin && (
				<LoadingCard text="Hang tight, we are redirecting you to another page" />
			)}
		</Root>
	);
}
