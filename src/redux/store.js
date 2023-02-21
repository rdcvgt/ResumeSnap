import { configureStore } from "@reduxjs/toolkit";
import formDataReducer from "./slices/formDataSlice";
import userInfoReducer from "./slices/userInfoSlice";

export default configureStore({
	reducer: {
		formData: formDataReducer,
		userInfo: userInfoReducer,
	},
});
