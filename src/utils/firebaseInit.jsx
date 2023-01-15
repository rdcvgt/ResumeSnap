import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
	authDomain: "resume-builder-0.firebaseapp.com",
	projectId: "resume-builder-0",
	storageBucket: "resume-builder-0.appspot.com",
	messagingSenderId: "106321783459",
	appId: "1:106321783459:web:4ce6907df636a992e0ad16",
	measurementId: "G-SK0P180WYD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
