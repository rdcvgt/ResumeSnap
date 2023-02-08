import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { updateBlockTitle } from "../../../../redux/slices/formDataSlice";
import ConfirmCard from "../../../cards/ConfirmCard";

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
	left: 50px;
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
`;

const DragIcon = styled.img`
	height: 100%;
`;

const ToolIcon = styled.img`
	max-height: 15px;
	opacity: 0;
	transition: opacity 0.3s, filter 0.3s;
	margin-right: 10px;
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
		transition: all 0.3s;
		`}
`;

TitleBlock.propTypes = {
	blockId: PropTypes.string,
	blockTitle: PropTypes.string,
	dragHandleProps: PropTypes.object,
	handleDeleteButtonClick: PropTypes.func,
	hideDraggableIcon: PropTypes.bool,
	hideDeleteIcon: PropTypes.bool,
};

function TitleBlock({
	blockId,
	blockTitle,
	dragHandleProps,
	handleDeleteButtonClick,
	hideDraggableIcon = false,
	hideDeleteIcon = true,
}) {
	const [isHover, setIsHover] = useState(false);
	const [isClickDelete, setIsClickDelete] = useState(false);

	//全選 input 資料
	const blockTitleRef = useRef(null);
	const handleResumeTitleIconClick = () => {
		blockTitleRef.current.select();
	};

	//當標題資料更動時更新資料
	const dispatch = useDispatch();
	const handleBlockTitleChange = (e) => {
		const { value } = e.target;
		dispatch(
			updateBlockTitle({
				blockId,
				blockTitle: value,
			})
		);
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
				{!hideDraggableIcon && (
					<DragBlock isHover={isHover} {...dragHandleProps}>
						<DragIcon src="/images/icon/drag.png" />
					</DragBlock>
				)}
				<BlockTitle
					type="text"
					value={blockTitle}
					onChange={handleBlockTitleChange}
					ref={blockTitleRef}
				/>
				<ToolIcon
					src="/images/icon/edit.png"
					onClick={handleResumeTitleIconClick}
					isHover={isHover}
				/>
				{!hideDeleteIcon && (
					<ToolIcon
						src="/images/icon/delete.png"
						onClick={() => {
							setIsClickDelete(true);
						}}
						isHover={isHover}
					/>
				)}
				{!hideDeleteIcon && isClickDelete && (
					<ConfirmCard
						text={{
							title: "Delete Session",
							description:
								"Are you sure you want to delete this section?",
							leftButton: "Delete",
							rightButton: "Cancel",
						}}
						setIsClickDelete={setIsClickDelete}
						handleDeleteButtonClick={handleDeleteButtonClick}
					/>
				)}
			</Block>
		</>
	);
}

export default TitleBlock;
