import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function useEmail(email, password, setUid, setError) {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			setUid(userCredential.user.uid);
		})
		.catch((error) => {
			const errorMessage = error.message;
			setError(errorMessage);
		});
}

export default useEmail;
