import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Block = styled.div`
	display: flex;
	align-items: center;
	height: auto;
`;

const BlockTitle = styled.input`
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

const DragBlock = styled.div`
	height: 20px;
	width: 30px;
	position: absolute;
	left: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: filter 0.3s, opacity 0.3s;

	&:hover {
		filter: brightness(1);
		opacity: 1;
		transition: filter 0.3s, opacity 0.3s;
	}

	${(props) =>
		props.isHover &&
		`
		filter: brightness(1.4);
		opacity: 1;
		transition: filter 0.3s, opacity 0.3s;
		`}

	${(props) =>
		props.hideDraggableIcon &&
		`
		display: none;
		`}
`;

const DragIcon = styled.img`
	height: 100%;
`;

const EditIcon = styled.img`
	max-height: 15px;
	opacity: 0;
	transition: opacity 0.3s, filter 0.3s;
	cursor: pointer;
	&:hover {
		filter: brightness(1);
		transition: filter 0.3s;
	}
	${(props) =>
		props.isHover &&
		`
		opacity: 1;
		filter: brightness(1.4);
		transition: opacity 0.3s, filter 0.3s;
		`}
`;

TitleBlock.propTypes = {
	title: PropTypes.object,
	dragHandleProps: PropTypes.object,
	hideDraggableIcon: PropTypes.bool,
};

function TitleBlock({ title, dragHandleProps, hideDraggableIcon }) {
	const { blockTitle, setBlockTitle } = title;
	const [isHover, setIsHover] = useState(false);

	const blockTitleRef = useRef(null);

	const handleBlockTitleChange = (e) => {
		setBlockTitle(e.target.value);
	};

	const handleResumeTitleIconClick = () => {
		blockTitleRef.current.select();
	};

	return (
		<>
			<Block
				onMouseEnter={() => {
					setIsHover(true);
				}}
				onMouseLeave={() => {
					setIsHover(false);
				}}>
				<DragBlock
					isHover={isHover}
					{...dragHandleProps}
					hideDraggableIcon={hideDraggableIcon}>
					<DragIcon src="/images/icon/drag.png" />
				</DragBlock>
				<BlockTitle
					type="text"
					value={blockTitle}
					onChange={handleBlockTitleChange}
					ref={blockTitleRef}
				/>
				<EditIcon
					src="/images/icon/edit.png"
					onClick={handleResumeTitleIconClick}
					isHover={isHover}
				/>
			</Block>
		</>
	);
}

export default TitleBlock;
