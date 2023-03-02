import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import "@wangeditor/editor/dist/css/style.css";
import { i18nChangeLanguage } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";

import TitleBlock from "../utils/TitleBlock";
import { updateInputData } from "../../../redux/reducers/formDataReducer";

//編輯器配置
i18nChangeLanguage("en");
const toolbarConfig = {};
toolbarConfig.toolbarKeys = [
	"bold",
	"italic",
	"underline",
	"through",
	"|",
	"bulletedList",
	"numberedList",
	"|",
	"insertLink",
];

//編輯器參數
const editorConfig = {
	placeholder: "",
	scroll: true,
	autoFocus: true,
	customPaste: (editor, event) => {
		event.preventDefault();
		const text = event.clipboardData.getData("text/plain");
		editor.insertText(text);
	},
};

const BlockContainer = styled.div`
	width: 90%;
	height: auto;
	margin: 50px auto;
`;

const BlockDescription = styled.div`
	${(props) => props.theme.input.title};
	line-height: 1.5em;
	height: auto;
	margin: 0 0 20px 0;
`;

const EditorBlock = styled.div`
	z-index: 100;
	padding-top: 5px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.color.neutral[10]};
	cursor: text;
`;

const LongInputBox = styled.div``;

ProfessionalSummary.propTypes = {
	blockId: PropTypes.string,
};

export default function ProfessionalSummary({ blockId }) {
	const dispatch = useDispatch();
	const [editor, setEditor] = useState(null); // 存储 editor

	//取得 redux data
	const [blockData] = useSelector((state) =>
		state.formData.formBlocks.filter((block) => block.id === blockId)
	);
	const blockTitle = blockData.content.blockTitle || "";
	const inputData = blockData.content.inputData;
	const inputHtmlText = inputData.inputHtml;
	const [html, setHtml] = useState(inputHtmlText);

	// 即時銷毀 editor
	useEffect(() => {
		return () => {
			if (editor == null) return;
			editor.destroy();
			setEditor(null);
		};
	}, [editor]);

	//儲存以輸入內容
	useEffect(() => {
		handleEditorInput(html);
	}, [html]);

	const handleEditorInput = (inputHtml) => {
		dispatch(
			updateInputData({
				blockName: "ProfessionalSummary",
				inputTitle: "inputHtml",
				inputValue: inputHtml,
			})
		);
	};

	return (
		<BlockContainer>
			<TitleBlock
				blockTitle={blockTitle}
				blockId={blockId}
				hideDraggableIcon={true}
				hideDeleteIcon={true}
			/>
			<BlockDescription>
				Write 2-4 short & energetic sentences to interest the reader!
				Mention your role, experience & most importantly - your biggest
				achievements, best qualities and skills.
			</BlockDescription>
			<LongInputBox>
				<EditorBlock>
					<Toolbar
						editor={editor}
						defaultConfig={toolbarConfig}
						mode="simple"
					/>
					<Editor
						defaultConfig={editorConfig}
						value={inputHtmlText}
						onCreated={setEditor}
						onChange={(editor) => setHtml(editor.getHtml())}
						mode="simple"
						style={{
							minHeight: "150px",
							fontSize: "14px",
						}}
					/>
				</EditorBlock>
			</LongInputBox>
		</BlockContainer>
	);
}
