import { createSlice } from "@reduxjs/toolkit";

import { collection, doc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebaseInit";
import { updateUserData } from "../../utils/firebase/database";

export const userInfoSlice = createSlice({
	name: "userInfo",
	initialState: {
		email: null,
		firstName: null,
		lastName: null,
		photo: null,
		photoResumeId: null,
	},
	reducers: {
		updateUserInfo: (state, action) => {
			const { userInfo } = action.payload;
			const { email, firstName, lastName, photo, photoResumeId } =
				userInfo;
			state.email = email;
			state.firstName = firstName;
			state.lastName = lastName;
			state.photo = photo;
			state.photoResumeId = photoResumeId;
		},
		updateUserPhoto: (state, action) => {
			const { photoUrl, photoResumeId } = action.payload;
			state.photo = photoUrl;
			state.photoResumeId = photoResumeId;
		},
		deleteUserInfo: (state) => {
			state.email = null;
			state.firstName = null;
			state.lastName = null;
			state.photo = null;
			state.photoResumeId = null;
		},
	},
});

export const { updateUserInfo, updateUserPhoto, deleteUserInfo } =
	userInfoSlice.actions;
export default userInfoSlice.reducer;

export const addUserInfo = (uid, userInfo) => (dispatch) => {
	dispatch(updateUserInfo({ userInfo }));
	const userRef = doc(db, "users", uid);
	const userInfoRef = collection(userRef, "userInfo");
	updateUserData(userInfoRef, userInfo);
};

export const updateUserInfoToDatabase =
	(uid, userPhotoData) => (dispatch, getState) => {
		dispatch(updateUserPhoto(userPhotoData));
		const userRef = doc(db, "users", uid);
		const userInfoRef = collection(userRef, "userInfo");

		const { userInfo } = getState();
		updateUserData(userInfoRef, userInfo);
	};
