import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import formDataReducer from "./reducers/formDataReducer";
import userInfoReducer from "./reducers/userInfoReducer";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	// if you do not want to persist this part of the state
	blacklist: ["formData"],
};

const reducer = combineReducers({
	userInfo: userInfoReducer,
	// not persisting this reducer
	formData: formDataReducer,
});

// this ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
});

export default store;
