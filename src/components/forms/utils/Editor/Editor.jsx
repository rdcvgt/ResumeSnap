import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import "@wangeditor/editor/dist/css/style.css";
import { i18nChangeLanguage } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";

const EditorBlock = styled.div`
	z-index: 100;
	padding-top: 5px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.color.neutral[10]};
	cursor: text;
`;

InputEditor.propTypes = {
	handleEditorInput: PropTypes.func,
	inputHtml: PropTypes.string,
};

function InputEditor({ handleEditorInput, inputHtml }) {
	const [editor, setEditor] = useState(null); // 存储 editor
	const [html, setHtml] = useState(inputHtml);

	// 即時銷毀 editor
	useEffect(() => {
		return () => {
			if (editor == null) return;
			editor.destroy();
			setEditor(null);
		};
	}, [editor]);

	//回傳父層 html
	useEffect(() => {
		handleEditorInput(html);
	}, [html]);

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

	return (
		<>
			<EditorBlock>
				<Toolbar
					editor={editor}
					defaultConfig={toolbarConfig}
					mode="simple"
				/>
				<Editor
					defaultConfig={editorConfig}
					value={html}
					onCreated={setEditor}
					onChange={(editor) => setHtml(editor.getHtml())}
					mode="simple"
					style={{
						minHeight: "150px",
						fontSize: "14px",
					}}
				/>
			</EditorBlock>
		</>
	);
}

export default InputEditor;
