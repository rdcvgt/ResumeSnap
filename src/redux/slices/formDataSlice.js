import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

export const formDataSlice = createSlice({
	name: "formData",
	initialState: {
		resumeName: "First Resume",
		template: "London",
		color: null,
		formBlocks: [
			{
				block: "PersonalDetails",
				content: {
					blockTitle: "Personal Details",
					inputData: {},
				},
				id: uuid(),
			},
			{
				block: "ProfessionalSummary",
				content: {
					blockTitle: "Profile",
					inputData: {},
				},
				id: uuid(),
			},
			{
				block: "Education",
				content: { blockTitle: "Education", itemData: [] },
				id: uuid(),
			},
			{
				block: "EmploymentHistory",
				content: { blockTitle: "Employment History", itemData: [] },
				id: uuid(),
			},
		],
	},
	reducers: {
		addBlock: (state, action) => {
			const { blockData } = action.payload;
			const { blockName, blockTitle } = blockData;

			const newBlock = {
				block: blockName,
				content: {
					blockTitle: blockTitle,
					itemData: [],
				},
				id: uuid(),
			};
			console.log(newBlock);
			state.formBlocks.push(newBlock);
		},
		deleteBlock: (state, action) => {
			const { blockId } = action.payload;
			console.log(blockId);
			const newFormBlock = state.formBlocks.filter(
				(block) => block.id !== blockId
			);
			state.formBlocks = newFormBlock;
		},

		updateResumeName: (state, action) => {
			const { resumeName } = action.payload;
			state.resumeName = resumeName;
		},
		updateTemplate: (state, action) => {
			const { templateName } = action.payload;
			state.template = templateName;
		},
		updateTemplateColor: (state, action) => {
			const { color } = action.payload;
			state.color = color;
		},

		updateBlockTitle: (state, action) => {
			const { blockId, blockTitle } = action.payload;
			const index = state.formBlocks.findIndex(
				(block) => block.id === blockId
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

		addItem: (state, action) => {
			const { blockId } = action.payload;
			const index = state.formBlocks.findIndex(
				(block) => block.id === blockId
			);
			const prevInputData = state.formBlocks[index].content.itemData;
			state.formBlocks[index].content.itemData = [
				...prevInputData,
				{
					id: uuid(),
					content: {},
				},
			];
		},
		deleteItem: (state, action) => {
			const { blockId, itemId } = action.payload;
			const index = state.formBlocks.findIndex(
				(block) => block.id === blockId
			);
			const newItems = state.formBlocks[index].content.itemData.filter(
				(item) => item.id !== itemId
			);

			state.formBlocks[index].content.itemData = newItems;
		},
		updateItemData: (state, action) => {
			const { blockId, itemId, itemInputTitle, itemInputValue } =
				action.payload;
			const index = state.formBlocks.findIndex(
				(block) => block.id === blockId
			);
			const itemIndex = state.formBlocks[
				index
			].content.itemData.findIndex((item) => item.id === itemId);

			const prevItemData =
				state.formBlocks[index].content.itemData[itemIndex].content;

			state.formBlocks[index].content.itemData[itemIndex].content = {
				...prevItemData,
				[itemInputTitle]: itemInputValue,
			};
		},

		updateBlockOrder: (state, action) => {
			const { newBlockOrder } = action.payload;
			state.formBlocks = newBlockOrder;
		},
		updateItemOrder: (state, action) => {
			const { blockId, newItemOrder } = action.payload;
			const index = state.formBlocks.findIndex(
				(block) => block.id === blockId
			);
			state.formBlocks[index].content.itemData = newItemOrder;
		},
	},
});

export const {
	addBlock,
	deleteBlock,
	updateResumeName,
	updateTemplate,
	updateTemplateColor,
	updateBlockTitle,
	updateInputData,
	addItem,
	deleteItem,
	updateItemData,
	updateBlockOrder,
	updateItemOrder,
} = formDataSlice.actions;

export default formDataSlice.reducer;
