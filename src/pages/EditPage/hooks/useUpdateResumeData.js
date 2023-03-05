import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, doc, Timestamp } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebaseInit";
import { updateResumeData } from "../../../utils/firebase/database";
import {
	updateDataStatus,
	updatePreviewStatus,
} from "../../../redux/reducers/dataStatusReducer";

export default function useUpdateResumeData(uid, resumeId) {
	const [timer, setTimer] = useState(null);
	const resumeData = useSelector((state) => state.formData);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateDataStatus({ status: true }));
		dispatch(updatePreviewStatus({ status: true }));
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
				dispatch(updateDataStatus({ status: false }));
			}, 700);
			setTimer(newTimer);
		}
	}, [resumeData]);
}
