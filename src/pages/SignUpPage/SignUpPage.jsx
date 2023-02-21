import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

import { db } from "../../utils/firebase/firebase";
import useEmail from "../../utils/firebase/useEmail";
import newResumeConfig from "../../utils/js/newResumeConfig";

const Root = styled.div``;

export default function HomePage() {
	const [direct, setDirect] = useState(false);
	const [error, setError] = useState(null);
	const [uid, setUid] = useState(null);
	const emailRef = useRef();
	const passwordRef = useRef();
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const navigate = useNavigate();

	const HandleButtonClick = () => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		useEmail(email, password, setUid, setError);
	};

	async function createNewUserInfo(userInfoRef, userInfo) {
		await setDoc(doc(userInfoRef, "info"), userInfo);
	}

	async function createFirstResume(resumesRef, resumeConfig) {
		await addDoc(resumesRef, resumeConfig);
	}

	useEffect(() => {
		if (uid) {
			const email = emailRef.current.value;
			const firstName = firstNameRef.current.value;
			const lastName = lastNameRef.current.value;
			const userInfo = { email, firstName, lastName };
			const resumeConfig = newResumeConfig(userInfo);

			const userRef = doc(db, "users", uid);
			const userInfoRef = collection(userRef, "userInfo");
			const resumesRef = collection(userRef, "resumes");

			createNewUserInfo(userInfoRef, userInfo);
			createFirstResume(resumesRef, resumeConfig);
			setDirect(true);
		}
	}, [uid]);

	useEffect(() => {
		if (direct) {
			navigate("/app");
		}
	}, [direct]);

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
			{error && <div>{error}</div>}
		</Root>
	);
}
