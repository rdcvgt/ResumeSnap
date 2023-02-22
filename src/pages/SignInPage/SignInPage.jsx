import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";

import { auth, db } from "../../utils/firebase/firebaseInit";
import useEmail from "../SignUpPage/hooks/useEmail";
import newResumeConfig from "../../utils/misc/newResumeStructure";
import { addUserInfo } from "../../redux/slices/userInfoSlice";
import { createFirstResume } from "../../utils/firebase/webAPI";

const Root = styled.div``;

export default function SignInPage() {
	const [direct, setDirect] = useState(false);
	const [error, setError] = useState(null);
	const [uid, setUid] = useState(null);
	const [resumeId, setResumeId] = useState(null);
	const dispatch = useDispatch();
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

	useEffect(() => {
		if (uid) {
			const email = emailRef.current.value;
			const firstName = firstNameRef.current.value;
			const lastName = lastNameRef.current.value;
			const userInfo = { email, firstName, lastName };
			const resumeConfig = newResumeConfig(userInfo);

			const userRef = doc(db, "users", uid);
			const resumesRef = collection(userRef, "resumes");

			dispatch(addUserInfo(uid, userInfo));
			const newResumeId = createFirstResume(resumesRef, resumeConfig);
			newResumeId.then((id) => {
				setResumeId(id);
			});
			setDirect(true);
		}
	}, [uid]);

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
			{error && <div>{error}</div>}
		</Root>
	);
}
