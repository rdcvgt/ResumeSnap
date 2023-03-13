import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, doc, Timestamp } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebaseInit";
import { updateWholeResumeData } from "../../../redux/reducers/formDataReducer";
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
				dispatch(updateWholeResumeData(uid, resumeId));
			}, 700);
			setTimer(newTimer);
		}
	}, [resumeData]);
}
