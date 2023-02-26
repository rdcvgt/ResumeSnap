import { configureStore } from "@reduxjs/toolkit";
import formDataReducer from "./reducers/formDataReducer";
import userInfoReducer from "./reducers/userInfoReducer";

export default configureStore({
	reducer: {
		formData: formDataReducer,
		userInfo: userInfoReducer,
	},
});
