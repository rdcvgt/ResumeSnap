import { configureStore } from "@reduxjs/toolkit";

import formDataReducer from "./reducers/formDataReducer";
import userInfoReducer from "./reducers/userInfoReducer";

const store = configureStore({
	reducer: {
		formData: formDataReducer,
		userInfo: userInfoReducer,
	},
});

export { store };
