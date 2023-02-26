import {
	doc,
	setDoc,
	addDoc,
	deleteDoc,
	getDocs,
	query,
	orderBy,
	collectionGroup,
} from "firebase/firestore";
import { db } from "./firebaseInit";

export function createNewUserInfo(userInfoRef, userInfo) {
	setDoc(doc(userInfoRef, "info"), userInfo);
}

export async function getCurrentUserInfo(userInfoRef) {
	let userInfo = null;
	const infoRef = await getDocs(userInfoRef);
	infoRef.then((data) => {
		console.log(data);
	});
}

export async function createFirstResume(resumesRef, resumeConfig) {
	const newResumeRef = await addDoc(resumesRef, resumeConfig);
	const newResumeId = newResumeRef.id;
	return newResumeId;
}

export async function getResume(resumesRef, resumeId) {
	let resumeData = null;
	const snapshot = await getDocs(resumesRef);
	snapshot.forEach((doc) => {
		if (doc.id === resumeId) {
			resumeData = doc.data();
		}
	});
	return resumeData;
}

export async function getUserAllResumes(resumesRef) {
	const queryOrderByTime = query(resumesRef, orderBy("updatedAt", "desc"));
	const snapshot = await getDocs(queryOrderByTime);
	let resumesOrder = [];
	snapshot.forEach((doc) => {
		const id = doc.id;
		const updatedAt = doc.data().updatedAt;
		const name = doc.data().resumeName;

		const data = { id, name, updatedAt };
		resumesOrder.push(data);
	});
	return resumesOrder;
}

export async function deleteResume(resumesRef, deleteResumeId) {
	const resumeDocRef = doc(resumesRef, deleteResumeId);
	await deleteDoc(resumeDocRef);
	return true;
}

export function updateResumeData(resumesRef, resumeId, entireResumeData) {
	setDoc(doc(resumesRef, resumeId), entireResumeData);
}

export async function checkSharePageResumeId(resumeId) {
	let resumeData = null;
	const querySnapshot = await getDocs(collectionGroup(db, "resumes"));

	querySnapshot.forEach((doc) => {
		if (doc.id === resumeId) {
			resumeData = doc.data();
		}
	});
	return resumeData;
}

export async function checkResumeIdMatchUid(uid, resumeId) {
	let resumeData = null;
	const querySnapshot = await getDocs(collectionGroup(db, "resumes"));

	querySnapshot.forEach((doc) => {
		if (doc.id === resumeId) {
			resumeData = doc.data();
		}
	});
	return resumeData;
}
