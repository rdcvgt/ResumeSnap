import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import ConfirmCard from "../../../cards/ConfirmCard";
import { updateBlockTitle } from "../../../../redux/reducers/formDataReducer";

import { MEDIA_QUERY_LG } from "../../../../utils/style/breakpotins";

const Block = styled.div`
	position: relative;
	height: auto;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	width: auto;
`;

const BlockTitle = styled.input`
	min-width: 5em;
	width: 20em;
	max-width: 80%;
	height: 40px;
	margin: 10px 0;
	padding-left: 3px;
	outline: none;
	border: none;
	border-radius: 5px;
	${(props) => props.theme.font.blockTitle};
	color: ${(props) => props.theme.color.neutral[90]};
	caret-color: ${(props) => props.theme.color.blue[50]};
	transition: all 0.3s;

	&:hover {
		border: 1px solid ${(props) => props.theme.color.neutral[10]};
		transition: all 0.3s;
	}
`;

const DragBlock = styled.div`
	height: 20px;
	width: 30px;
	position: absolute;
	left: -35px;
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

	${MEDIA_QUERY_LG} {
		opacity: 1;
	}
`;

const DragIcon = styled.img`
	height: 100%;
`;

const ToolIcon = styled.img`
	max-height: 17px;
	opacity: 0;
	transition: opacity 0.3s, filter 0.3s;
	margin-left: 15px;
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

	${MEDIA_QUERY_LG} {
		opacity: 1;
	}
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
	hideDeleteIcon = false,
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
				<Container>
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
				</Container>
			</Block>
		</>
	);
}

export default TitleBlock;
