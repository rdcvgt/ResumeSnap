import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

import { db } from "../../utils/firebase/firebase";
import { createNewUserInfo } from "../../webAPI";

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
