import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { updateInputData } from "../../../redux/reducers/formDataReducer";
import InputEditor from "../utils/Editor";
import TitleBlock from "../utils/TitleBlock";

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

const LongInputBox = styled.div``;

ProfessionalSummary.propTypes = {
	blockId: PropTypes.string,
};

export default function ProfessionalSummary({ blockId }) {
	const dispatch = useDispatch();
	const handleEditorInput = (inputHtml) => {
		dispatch(
			updateInputData({
				blockName: "ProfessionalSummary",
				inputTitle: "inputHtml",
				inputValue: inputHtml,
			})
		);
	};

	const [blockData] = useSelector((state) =>
		state.formData.formBlocks.filter((block) => block.id === blockId)
	);
	const blockTitle = blockData.content.blockTitle || "";
	const inputData = blockData.content.inputData;
	const inputHtml = inputData.inputHtml;

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
				<InputEditor
					handleEditorInput={handleEditorInput}
					inputHtml={inputHtml}
				/>
			</LongInputBox>
		</BlockContainer>
	);
}
