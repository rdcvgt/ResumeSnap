import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
} from "firebase/auth";
import { auth, provider } from "./firebaseInit";
import { db } from "../../utils/firebase/firebaseInit";
import { collection, doc } from "firebase/firestore";
import { getCurrentUserInfo } from "../firebase/database";

export function useFirstNameValidation(firstName, firstNameError) {
	const empty = "This field is required";
	if (!firstName) {
		firstNameError(empty);
		return false;
	}
	return true;
}

export function useLastNameValidation(lastName, setLastName) {
	const empty = "This field is required";
	if (!lastName) {
		setLastName(empty);
		return false;
	}
	return true;
}

export function useEmailValidation(email, setEmailError) {
	const empty = "This field is required";
	const emailRegexError = "Invalid email";
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	if (!email) {
		setEmailError(empty);
		return false;
	}
	if (!emailRegex.test(email)) {
		setEmailError(emailRegexError);
		return false;
	}

	return true;
}

export function usePasswordValidation(password, setPasswordError) {
	const empty = "This field is required";
	const passwordLengthError = "At least 6 characters";

	if (!password) {
		setPasswordError(empty);
		return false;
	}
	if (password.length < 6) {
		setPasswordError(passwordLengthError);
		return false;
	}

	return true;
}

export function useEmailSignUp(email, password, setUid, setError, setIsLogin) {
	setIsLogin(true);
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			setUid(userCredential.user.uid);
		})
		.catch((error) => {
			const errorMessage = error.message.split(":")[1];
			setError(errorMessage);
			setIsLogin(false);
		});
}

export function useEmailSignIn(
	email,
	password,
	setUid,
	setUserInfo,
	setError,
	setIsLogin
) {
	setIsLogin(true);
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const userId = userCredential.user.uid;
			setUid(userId);

			//從資料庫獲取使用者資訊
			const userRef = doc(db, "users", userId);
			const userInfoRef = collection(userRef, "userInfo");
			const userInfoPromise = getCurrentUserInfo(userInfoRef);
			userInfoPromise.then((userInfo) => {
				setUserInfo(userInfo);
			});
		})
		.catch((error) => {
			const errorMessage = error.message.split(":")[1];
			setError(errorMessage);
			setIsLogin(false);
		});
}

export function useGoogle(setUid, setUserInfo, setError, setIsLogin) {
	setIsLogin(true);
	signInWithPopup(auth, provider)
		.then((result) => {
			// The signed-in user info.
			const user = result.user;
			const uid = user.uid;

			const userRef = doc(db, "users", uid);
			const userInfoRef = collection(userRef, "userInfo");
			const userInfoPromise = getCurrentUserInfo(userInfoRef);
			userInfoPromise.then((userInfo) => {
				console.log(userInfo, "useGoogle");
				if (userInfo) {
					setUserInfo(userInfo);
					return;
				}

				const userNameList = user.displayName.split(" ");
				const email = user.email;
				const firstName = userNameList[0];
				const lastName = userNameList[1] ? userNameList[1] : "";

				const newUserInfo = {
					email,
					firstName,
					lastName,
					photo: null,
					photoResumeId: null,
				};
				console.log(newUserInfo, "useGoogle");
				setUserInfo(newUserInfo);
			});

			setUid(uid);
		})
		.catch((error) => {
			const errorMessage = error.message.split(":")[1];
			setError(errorMessage);
			setIsLogin(false);
		});
}
