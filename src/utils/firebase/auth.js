import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
} from "firebase/auth";
import { auth, provider } from "./firebaseInit";

export function useEmailSignUp(email, password, setUid, setError) {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			setUid(userCredential.user.uid);
		})
		.catch((error) => {
			const errorMessage = error.message;
			setError(errorMessage);
		});
}

export function useEmailSignIn(email, password, setUid, setError) {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			setUid(userCredential.user.uid);
		})
		.catch((error) => {
			const errorMessage = error.message;
			setError(errorMessage);
		});
}

export function useGoogle(setUid, setUserInfo, setError) {
	signInWithPopup(auth, provider)
		.then((result) => {
			// The signed-in user info.
			const user = result.user;
			const uid = user.uid;
			const userNameList = user.displayName.split(" ");
			const email = user.email;
			const firstName = userNameList[0];
			const lastName = userNameList[1];

			const newUserInfo = { email, firstName, lastName };
			setUserInfo(newUserInfo);
			setUid(uid);
		})
		.catch((error) => {
			const errorMessage = error.message;
			setError(errorMessage);
		});
}
