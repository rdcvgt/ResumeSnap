import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "@wangeditor/editor/dist/css/style.css";
import { i18nChangeLanguage } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import PropTypes from "prop-types";

const EditorBlock = styled.div`
	z-index: 100;
	margin-top: "15px";
	padding-top: 5px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.color.neutral[10]};
	cursor: text;
`;

InputEditor.propTypes = {
	handleEditorInput: PropTypes.func,
};

function InputEditor({ handleEditorInput }) {
	const [editor, setEditor] = useState(null); // 存储 editor 实例
	const [html, setHtml] = useState(null);
	const [timer, setTimer] = useState(null);

	i18nChangeLanguage("en");

	const toolbarConfig = {};
	toolbarConfig.toolbarKeys = [
		// 菜单 key
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

	// 及时销毁 editor
	useEffect(() => {
		return () => {
			if (editor == null) return;
			editor.destroy();
			setEditor(null);
		};
	}, [editor]);

	useEffect(() => {
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			handleEditorInput(html);
		}, 1000);
		setTimer(newTimer);
	}, [html]);

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
