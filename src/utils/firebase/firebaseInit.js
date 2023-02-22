import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDxLnMmSmFikXfCai2U73AAY1q3VFLnm8w",
	authDomain: "resumesnap-5041c.firebaseapp.com",
	projectId: "resumesnap-5041c",
	storageBucket: "resumesnap-5041c.appspot.com",
	messagingSenderId: "774783415179",
	appId: "1:774783415179:web:ae74e734fb808553d9f58e",
	measurementId: "G-0L3NX2PH2H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
