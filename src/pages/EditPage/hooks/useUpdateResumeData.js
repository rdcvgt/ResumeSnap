import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, doc, Timestamp } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebaseInit";
import { updateResumeData } from "../../../utils/firebase/database";

export default function useUpdateResumeData(uid, resumeId) {
	const [timer, setTimer] = useState(null);
	const resumeData = useSelector((state) => state.formData);

	useEffect(() => {
		if (uid && resumeId) {
			clearTimeout(timer);
			const newTimer = setTimeout(() => {
				const timestamp = Timestamp.now().toMillis();
				const entireResumeData = {
					...resumeData,
					updatedAt: timestamp,
				};
				const userRef = doc(db, "users", uid);
				const resumesRef = collection(userRef, "resumes");
				updateResumeData(resumesRef, resumeId, entireResumeData);
			}, 700);
			setTimer(newTimer);
		}
	}, [resumeData]);
}
