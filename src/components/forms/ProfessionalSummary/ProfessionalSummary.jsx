import React, { useState } from "react";
import styled from "styled-components";

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

const InputEditorBox = styled.div``;

const LongInput = styled.textarea`
	${(props) => props.theme.font.content};
	border: 0;
	width: 100%;
	height: 200px;
	outline: none;
	border-radius: 5px;
	background-color: ${(props) => props.theme.color.indigo[10]};
	padding: 20px;
	resize: none;
`;

export default function ProfessionalSummary() {
	return (
		<BlockContainer>
			<BlockTitle>個人簡介</BlockTitle>
			<BlockDescription>
				可以寫上 2 到 4 句話讓查看履歷的人對你產生興趣，
				像是闡述你的個人特質或過去經驗，
				最重要的是記得提及你的亮眼成就與專業技能！
			</BlockDescription>
			<LongInputBox>
				<InputEditorBox></InputEditorBox>
				<LongInput></LongInput>
			</LongInputBox>
		</BlockContainer>
	);
}
