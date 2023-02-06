import { configureStore } from "@reduxjs/toolkit";
import formDataReducer from "./slices/formDataSlice";

export default configureStore({
	reducer: {
		formData: formDataReducer,
	},
});
