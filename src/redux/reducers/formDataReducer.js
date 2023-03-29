import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { collection, doc, Timestamp } from "firebase/firestore";
import { db } from "../../utils/firebase/firebaseInit";
import { getResume, updateResumeData } from "../../utils/firebase/database";
import { updateDataStatus } from "../reducers/dataStatusReducer";

export const initState = {
	isDefaultData: true,
	dataSetTimeOutId: null,
	resumeName: "First Resume",
	template: "Sydney",
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
			content: {
				blockTitle: "Education",
				itemData: [],
			},
			id: uuid(),
		},
		{
			block: "EmploymentHistory",
			content: {
				blockTitle: "Employment History",
				itemData: [],
			},
			id: uuid(),
		},
		{
			block: "WebsiteLink",
			content: {
				blockTitle: "Websites & Social Links",
				itemData: [],
			},
			id: uuid(),
		},
	],
};

export const formDataSlice = createSlice({
	name: "formData",
	initialState: initState,
	reducers: {
		addResumeData: (state, action) => {
			const { resumeData } = action.payload;
			return resumeData;
		},
		addBlock: (state, action) => {
			const { blockData } = action.payload;
			const { blockName, blockTitle } = blockData;

			const newBlock = {
				block: blockName,
				content: {
					blockTitle: blockTitle,
					itemData: [
						{
							id: uuid(),
							content: {},
						},
					],
				},
				id: uuid(),
			};
			state.formBlocks.push(newBlock);
		},
		deleteBlock: (state, action) => {
			const { blockId } = action.payload;
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
			const index = state.formBlocks.findIndex((block) => block.id === blockId);
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
			const index = state.formBlocks.findIndex((block) => block.id === blockId);
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
			const index = state.formBlocks.findIndex((block) => block.id === blockId);
			const newItems = state.formBlocks[index].content.itemData.filter(
				(item) => item.id !== itemId
			);

			state.formBlocks[index].content.itemData = newItems;
		},
		updateItemData: (state, action) => {
			const { blockId, itemId, itemInputTitle, itemInputValue } =
				action.payload;
			const index = state.formBlocks.findIndex((block) => block.id === blockId);
			const itemIndex = state.formBlocks[index].content.itemData.findIndex(
				(item) => item.id === itemId
			);

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
			const index = state.formBlocks.findIndex((block) => block.id === blockId);
			state.formBlocks[index].content.itemData = newItemOrder;
		},
		updateDataSetTimeOutId: (state, action) => {
			const { timer } = action.payload;
			state.formBlocks.dataSetTimeOutId = timer;
		},
	},
});

export const {
	addResumeData,
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
	updateDataSetTimeOutId,
} = formDataSlice.actions;

export default formDataSlice.reducer;

//透過 edit/:resumeId 向 firebase 索取 resume data
export const getResumeData = (uid, resumeId) => (dispatch) => {
	const userRef = doc(db, "users", uid);
	const resumesRef = collection(userRef, "resumes");
	const resumeData = getResume(resumesRef, resumeId);
	resumeData.then((data) => {
		dispatch(addResumeData({ resumeData: data }));
	});
};

//更新 resume data 到 firebase
export const updateWholeResumeData =
	(uid, resumeId) => async (dispatch, getState) => {
		const timestamp = Timestamp.now().toMillis();
		const { formData } = getState();
		const entireResumeData = {
			...formData,
			updatedAt: timestamp,
		};
		const userRef = doc(db, "users", uid);
		const resumesRef = collection(userRef, "resumes");
		await updateResumeData(resumesRef, resumeId, entireResumeData);
		dispatch(updateDataStatus({ status: false }));
	};
