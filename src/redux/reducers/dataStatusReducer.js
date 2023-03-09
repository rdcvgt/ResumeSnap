import { createSlice } from "@reduxjs/toolkit";

export const dataStatusSlice = createSlice({
	name: "dataStatus",
	initialState: {
		isUploadingData: false,
		isMakingPreview: false,
	},
	reducers: {
		updateDataStatus: (state, action) => {
			const { status } = action.payload;
			state.isUploadingData = status;
		},
		updatePreviewStatus: (state, action) => {
			const { status } = action.payload;
			state.isMakingPreview = status;
		},
	},
});

export const { updateDataStatus, updatePreviewStatus } =
	dataStatusSlice.actions;
export default dataStatusSlice.reducer;
