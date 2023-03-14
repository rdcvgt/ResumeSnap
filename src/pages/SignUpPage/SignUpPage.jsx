import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import UserInfoArea from "./UserInfoArea";
import ThirdPartyArea from "./ThirdPartyArea";
import RegistrationArea from "./RegistrationArea";

import { useEmailSignUp, useGoogle } from "../../utils/firebase/auth";

import LoadingCard from "../../components/cards/LoadingCard";
import { addNewUserInfo } from "../../redux/reducers/userInfoReducer";
import NavForEntry from "../../components/navbar/NavForEntry";

const Root = styled.div``;

export default function HomePage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const [uid, setUid] = useState(null);
	// const [resumeId, setResumeId] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [isLogin, setIsLogin] = useState(false);
	const [error, setError] = useState(null);
	const [isClickSkip, setIsClickSkip] = useState(false);
	const [isClickContinue, setIsClickContinue] = useState(false);

	const HandleGoogleButtonClick = () => {
		useGoogle(setUid, setUserInfo, setError, setIsLogin);
	};

	const HandleEmailSignUp = () => {
		useEmailSignUp(email, password, setUid, setError, setIsLogin);
		const newUserInfo = {
			email,
			firstName,
			lastName,
			photo: null,
			photoResumeId: null,
		};
		setUserInfo(newUserInfo);
	};

	useEffect(() => {
		if (uid && userInfo) {
			dispatch(addNewUserInfo(uid, userInfo));
			navigate("/dashboard");
		}
	}, [uid, userInfo]);

	return (
		<Root>
			<Helmet>
				<title>Create New Resume ∙ ResumeSnap</title>
			</Helmet>
			<NavForEntry />
			{!isLogin && (
				<>
					{!isClickSkip && (
						<ThirdPartyArea
							errorState={{ error, setError }}
							setIsClickSkip={setIsClickSkip}
							HandleGoogleButtonClick={HandleGoogleButtonClick}
						/>
					)}

					{isClickSkip && !isClickContinue && (
						<UserInfoArea
							setError={setError}
							setIsClickSkip={setIsClickSkip}
							setIsClickContinue={setIsClickContinue}
							firstNameState={{ firstName, setFirstName }}
							lastNameState={{ lastName, setLastName }}
						/>
					)}

					{isClickSkip && isClickContinue && (
						<RegistrationArea
							errorState={{ error, setError }}
							emailState={{ email, setEmail }}
							passwordState={{ password, setPassword }}
							HandleEmailSignUp={HandleEmailSignUp}
							setIsClickContinue={setIsClickContinue}
						/>
					)}
				</>
			)}
			{isLogin && (
				<LoadingCard text="Hang tight, we are redirecting you to another page" />
			)}
		</Root>
	);
}
