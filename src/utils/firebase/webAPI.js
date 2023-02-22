import { collection, doc, setDoc, addDoc, getDocs } from "firebase/firestore";

export function createNewUserInfo(userInfoRef, userInfo) {
	setDoc(doc(userInfoRef, "info"), userInfo);
}

export async function createFirstResume(resumesRef, resumeConfig) {
	const newResumeRef = await addDoc(resumesRef, resumeConfig);
	const newResumeId = newResumeRef.id;
	return newResumeId;
}

export async function getResume(resumesRef, resumeId) {
	let resumeData;
	const snapshot = await getDocs(resumesRef);
	snapshot.forEach((doc) => {
		if (doc.id === resumeId) {
			resumeData = doc.data();
		}
	});
	return resumeData;
}
