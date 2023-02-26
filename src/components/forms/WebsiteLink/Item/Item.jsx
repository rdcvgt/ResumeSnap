import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import {
	deleteItem,
	updateItemData,
} from "../../../../redux/reducers/formDataReducer";

const Root = styled.div`
	border-radius: 5px;
	border: 1px solid ${(props) => props.theme.color.neutral[10]};
	position: relative;
	margin-bottom: 15px;
	background-color: #fff;
`;

const DragBlock = styled.div`
	height: 20px;
	width: 30px;
	position: absolute;
	top: 23px;
	left: -30px;
	display: flex;
	align-items: center;
	opacity: 0;
	transition: filter 0.3s, opacity 0.3s;

	${(props) =>
		props.isHover &&
		`
		filter: brightness(1.4);
		opacity: 1;
		transition: filter 0.3s, opacity 0.3s;
		`}

	&:hover {
		filter: brightness(1);
		opacity: 1;
		transition: filter 0.3s, opacity 0.3s;
	}
`;

const DragIcon = styled.img`
	height: 100%;
`;

const DeleteBlock = styled.div`
	height: 20px;
	width: 30px;
	position: absolute;
	top: 23px;
	right: -30px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	opacity: 0;
	transition: filter 0.3s, opacity 0.3s;

	${(props) =>
		props.isHover &&
		`
		filter: brightness(1.4);
		opacity: 1;
		transition: filter 0.3s, opacity 0.3s;
		`}

	&:hover {
		filter: brightness(1);
		opacity: 1;
		transition: filter 0.3s, opacity 0.3s;
	}
`;

const DeleteIcon = styled.img`
	height: 100%;
`;

const ItemDescription = styled.div`
	width: 100%;
	height: 65px;
	cursor: pointer;
	padding: 20px;
	display: flex;
	align-items: center;
	overflow: hidden;
`;

const ItemInfo = styled.div`
	width: 90%;
`;

const ItemTitle = styled.div`
	${(props) => props.theme.font.itemBold};
	width: 100%;
	margin-bottom: 5px;
	color: ${(props) => props.theme.color.neutral[90]};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	transition: color 0.3s;
	height: 18px;

	${(props) =>
		props.isHover &&
		`
		color: #1a91f0;
		`}
`;

const ItemDuration = styled.div`
	${(props) => props.theme.input.title};
	width: 100%;
	margin: 0;
`;

const ItemArrowIcon = styled.img`
	width: 15px;
	position: absolute;
	top: 25px;
	right: 20px;
`;

const BlockRow = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
`;

const LeftCol = styled.div`
	width: 50%;
	padding-right: 15px;
`;

const RightCol = styled.div`
	padding-left: 15px;
	width: 50%;
`;

const InputTitle = styled.div`
	${(props) => props.theme.input.title};
`;

const ShortInput = styled.input`
	${(props) => props.theme.input.shortInput};
`;

const MoreInput = styled.div`
	padding: 0px 20px;
	overflow: hidden;
	max-height: 0;
	opacity: 0;
	transition: max-height 0.8s, opacity 0.8s;
	cursor: default;
	${(props) =>
		props.isClick &&
		`
	max-height: 600px; overflow: visible; opacity: 1;
	`}
`;

Item.propTypes = {
	item: PropTypes.object,
	blockId: PropTypes.string,
	dragHandleProps: PropTypes.object,
};

export default function Item({ item, blockId, dragHandleProps }) {
	const [isClick, setIsClick] = useState(true);
	const [isHover, setIsHover] = useState(false);
	const dispatch = useDispatch();

	//刪除 item
	const handleDeleteIconClick = () => {
		dispatch(deleteItem({ blockId, itemId: item.id }));
	};

	//更新 item data
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		let newValue = value;
		if (name === "startDate" || name === "endDate") {
			newValue = value.replace("-", " / ");
		}
		dispatch(
			updateItemData({
				blockId,
				itemId: item.id,
				itemInputTitle: name,
				itemInputValue: newValue,
			})
		);
	};

	const label = item.content.label || "";
	const link = item.content.link || "";
	let startDate = item.content.startDate;
	let endDate = item.content.endDate;
	if (startDate) {
		startDate = startDate.replace(" / ", "-");
	} else {
		startDate = "";
	}

	if (endDate) {
		endDate = endDate.replace(" / ", "-");
	} else {
		endDate = "";
	}

	return (
		<Root>
			<DragBlock isHover={isHover} {...dragHandleProps}>
				<DragIcon src="/images/icon/drag.png" />
			</DragBlock>
			<DeleteBlock isHover={isHover} onClick={handleDeleteIconClick}>
				<DeleteIcon src="/images/icon/delete.png" />
			</DeleteBlock>
			<ItemDescription
				onClick={() => {
					setIsClick(!isClick);
				}}
				onMouseEnter={() => {
					setIsHover(true);
				}}
				onMouseLeave={() => {
					setIsHover(false);
				}}>
				<ItemInfo>
					<ItemTitle isHover={isHover}>
						{label}
						{!label && "(Not Specified)"}
					</ItemTitle>
					<ItemDuration>{link}</ItemDuration>
				</ItemInfo>
				<ItemArrowIcon
					src={
						isClick
							? "/images/icon/up_gray.png"
							: "/images/icon/down_gray.png"
					}
				/>
			</ItemDescription>
			<MoreInput isClick={isClick}>
				<form>
					<BlockRow>
						<LeftCol>
							<InputTitle>Label</InputTitle>
							<ShortInput
								type="text"
								name="label"
								value={label}
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>Link</InputTitle>
							<ShortInput
								type="text"
								name="link"
								value={link}
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
					<MoreInput isClick={isClick}></MoreInput>
				</form>
			</MoreInput>
		</Root>
	);
}
