import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

import formDataReducer from "./reducers/formDataReducer";
import userInfoReducer from "./reducers/userInfoReducer";
import dataStatusReducer from "./reducers/dataStatusReducer";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: ["formData", "dataStatus"],
};

const reducer = combineReducers({
	userInfo: userInfoReducer,
	formData: formDataReducer,
	dataStatus: dataStatusReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export default store;
