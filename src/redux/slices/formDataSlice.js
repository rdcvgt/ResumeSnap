import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

export const formDataSlice = createSlice({
	name: "formData",
	initialState: {
		formBlocks: [
			{
				block: "PersonalDetails",
				content: { blockTitle: "個人資訊", inputData: {} },
				id: uuid(),
			},
			{
				block: "ProfessionalSummary",
				content: { blockTitle: "個人簡介", inputData: {} },
				id: uuid(),
			},
			{
				block: "Education",
				content: { blockTitle: "學歷", inputData: {} },
				id: uuid(),
			},
			{
				block: "EmploymentHistory",
				content: { blockTitle: "工作經歷", inputData: {} },
				id: uuid(),
			},
		],
	},
	reducers: {
		updateBlockTitle: (state, action) => {
			const { blockName, blockTitle } = action.payload;
			const index = state.formBlocks.findIndex(
				(block) => block.block === blockName
			);
			state.formBlocks[index].content.blockTitle = blockTitle;
		},
		updateInputData: (state, action) => {
			const { blockName, inputTitle, inputValue } = action.payload;
			const index = state.formBlocks.findIndex(
				(block) => block.block === blockName
			);
			const prevInputData = state.formBlocks[index].content.inputData;
			state.formBlocks[index].content.inputData = {
				...prevInputData,
				[inputTitle]: inputValue,
			};
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
});

export const { updateBlockTitle, updateInputData, incrementByAmount } =
	formDataSlice.actions;

export default formDataSlice.reducer;
