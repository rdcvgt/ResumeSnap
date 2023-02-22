import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useEmailSignIn, useGoogle } from "../../utils/firebase/auth";
import { addUserInfo } from "../../redux/slices/userInfoSlice";

const Root = styled.div``;

export default function SignInPage() {
	const [error, setError] = useState(null);
	const [uid, setUid] = useState(null);
	const [userInfo, setUserInfo] = useState(null);

	const dispatch = useDispatch();
	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();

	const HandleButtonClick = () => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		useEmailSignIn(email, password, setUid, setError);
	};

	const HandleGoogleButtonClick = () => {
		useGoogle(setUid, setUserInfo, setError);
	};

	useEffect(() => {
		if (uid && userInfo) {
			dispatch(addUserInfo(uid, userInfo));
			navigate("/dashboard");
		}
	}, [uid]);

	return (
		<Root>
			email<input type="text" name="email" ref={emailRef}></input>
			password
			<input type="text" name="password" ref={passwordRef}></input>
			<button onClick={HandleButtonClick}>送出</button>
			<button onClick={HandleGoogleButtonClick}>google 登入</button>
			{error && <div>{error}</div>}
		</Root>
	);
}
