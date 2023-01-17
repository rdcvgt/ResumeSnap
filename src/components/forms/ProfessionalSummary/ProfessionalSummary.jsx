import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputEditor from "../utils/Editor";
import PropTypes from "prop-types";

const BlockContainer = styled.div`
	width: 90%;
	height: auto;
	margin: 50px auto;
`;

const BlockTitle = styled.div`
	margin-bottom: 20px;
	${(props) => props.theme.font.blockTitle};
	color: ${(props) => props.theme.color.neutral[90]};
`;

const BlockDescription = styled.div`
	${(props) => props.theme.input.title};
	line-height: 1.5em;
	height: auto;
	margin: 20px 0 20px 0;
`;

const LongInputBox = styled.div``;

ProfessionalSummary.propTypes = {
	handleInputData: PropTypes.func,
};

export default function ProfessionalSummary({ handleInputData }) {
	const handleEditorInput = (inputHtml) => {
		let data = { professionalSummary: inputHtml };
		handleInputData(data);
	};

	return (
		<BlockContainer>
			<BlockTitle>個人簡介</BlockTitle>
			<BlockDescription>
				可以寫上 2 到 4 句話讓查看履歷的人對你產生興趣，
				像是闡述你的個人特質或過去經驗，
				最重要的是記得提及你的亮眼成就與專業技能！
			</BlockDescription>
			<LongInputBox>
				<InputEditor handleEditorInput={handleEditorInput} />
			</LongInputBox>
		</BlockContainer>
	);
}
