import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { collection, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { db } from "../../utils/firebase/firebaseInit";
import { useEmailSignUp, useGoogle } from "../../utils/firebase/auth";
import newResumeStructure from "../../utils/misc/newResumeStructure";
import { addUserInfo } from "../../redux/reducers/userInfoReducer";
import { createFirstResume } from "../../utils/firebase/database";

const Root = styled.div``;

export default function HomePage() {
	const [error, setError] = useState(null);
	const [uid, setUid] = useState(null);
	const [resumeId, setResumeId] = useState(null);
	const [userInfo, setUserInfo] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();
	const firstNameRef = useRef();
	const lastNameRef = useRef();

	const HandleButtonClick = () => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const firstName = firstNameRef.current.value;
		const lastName = lastNameRef.current.value;
		useEmailSignUp(email, password, setUid, setError);

		const newUserInfo = { email, firstName, lastName };
		setUserInfo(newUserInfo);
	};

	const HandleGoogleButtonClick = () => {
		useGoogle(setUid, setUserInfo, setError);
	};

	useEffect(() => {
		if (uid && userInfo) {
			const resumeConfig = newResumeStructure(userInfo);
			const userRef = doc(db, "users", uid);
			const resumesRef = collection(userRef, "resumes");

			dispatch(addUserInfo(uid, userInfo));
			const newResumeId = createFirstResume(resumesRef, resumeConfig);
			newResumeId.then((id) => {
				setResumeId(id);
			});
		}
	}, [uid, userInfo]);

	useEffect(() => {
		if (resumeId) {
			navigate(`/edit/${resumeId}`);
		}
	}, [resumeId]);

	return (
		<Root>
			firstName
			<input type="text" name="firstName" ref={firstNameRef}></input>
			lastName
			<input type="text" name="lastName" ref={lastNameRef}></input>
			email<input type="text" name="email" ref={emailRef}></input>
			password
			<input type="text" name="password" ref={passwordRef}></input>
			<button onClick={HandleButtonClick}>送出</button>
			<button onClick={HandleGoogleButtonClick}>google 登入</button>
			{error && <div>{error}</div>}
		</Root>
	);
}
