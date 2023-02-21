import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

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
