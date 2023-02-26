import { createSlice } from "@reduxjs/toolkit";
import { collection, doc } from "firebase/firestore";

import { db } from "../../utils/firebase/firebaseInit";
import {
	createNewUserInfo,
	getCurrentUserInfo,
} from "../../utils/firebase/database";

export const userInfoSlice = createSlice({
	name: "userInfo",
	initialState: {
		email: null,
		firstName: null,
		lastName: null,
	},
	reducers: {
		updateUserInfo: (state, action) => {
			const { userInfo } = action.payload;
			const { email, firstName, lastName } = userInfo;
			state.email = email;
			state.firstName = firstName;
			state.lastName = lastName;
		},
	},
});

export const { updateUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

export const addUserInfo = (uid, userInfo) => (dispatch) => {
	dispatch(updateUserInfo({ userInfo }));
	const userRef = doc(db, "users", uid);
	const userInfoRef = collection(userRef, "userInfo");
	createNewUserInfo(userInfoRef, userInfo);
};

export const getUserInfo = (uid) => (dispatch) => {
	const userRef = doc(db, "users", uid);
	const userInfoRef = collection(userRef, "userInfo");
	getCurrentUserInfo(userInfoRef);

	// dispatch(updateUserInfo({ userInfo }));
};
