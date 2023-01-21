import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Block = styled.div`
	display: flex;
	align-items: center;
	height: auto;
`;

const ResumeTitle = styled.input`
	min-width: 5em;
	width: 5em;
	max-width: 80%;
	height: auto;
	margin: 10px 0;
	padding: 0;
	outline: none;
	border: none;
	${(props) => props.theme.font.blockTitle};
	color: ${(props) => props.theme.color.neutral[90]};
	caret-color: ${(props) => props.theme.color.blue[50]};
`;

const ResumeTitleIcon = styled.img`
	max-height: 15px;
	opacity: 0;
	transition: opacity 0.3s;
	cursor: pointer;
	&:hover {
		opacity: 1;
	}
`;

TitleBlock.propTypes = {
	title: PropTypes.object,
};

function TitleBlock({ title }) {
	const { blockTitle, setBlockTitle } = title;

	const resumeTitleRef = useRef(null);

	const handleResumeTitleChange = (e) => {
		setBlockTitle(e.target.value);
	};

	const handleResumeTitleIconClick = () => {
		resumeTitleRef.current.select();
	};

	return (
		<>
			<Block>
				<ResumeTitle
					type="text"
					value={blockTitle}
					onChange={handleResumeTitleChange}
					ref={resumeTitleRef}
				/>
				<ResumeTitleIcon
					src="/images/icon/edit.png"
					onClick={handleResumeTitleIconClick}
				/>
			</Block>
		</>
	);
}

export default TitleBlock;
