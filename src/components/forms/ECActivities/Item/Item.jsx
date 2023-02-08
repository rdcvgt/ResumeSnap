import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import {
	deleteItem,
	updateItemData,
} from "../../../../redux/slices/formDataSlice";
import InputEditor from "../../utils/Editor";

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

const DateBlock = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const DateInput = styled.input`
	${(props) => props.theme.input.shortInput};
	width: 45%;
`;

const InputTitle = styled.div`
	${(props) => props.theme.input.title};
`;

const ShortInput = styled.input`
	${(props) => props.theme.input.shortInput};
`;

const LongInputBox = styled.div`
	margin-bottom: 20px;
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

	//更新 item description
	const handleEditorInput = (inputHtml) => {
		dispatch(
			updateItemData({
				blockId,
				itemId: item.id,
				itemInputTitle: "description",
				itemInputValue: inputHtml,
			})
		);
	};

	const functionTitle = item.content.functionTitle || "";
	const employer = item.content.employer || "";
	const city = item.content.city || "";
	const description = item.content.description || "";
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
						{functionTitle}
						{functionTitle && employer ? " - " : ""}
						{employer}
						{!functionTitle && !employer && "(Not Specified)"}
					</ItemTitle>
					<ItemDuration>
						{startDate}
						{startDate && endDate ? " - " : ""}
						{endDate}
					</ItemDuration>
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
							<InputTitle>Function Title</InputTitle>
							<ShortInput
								type="text"
								name="functionTitle"
								value={functionTitle}
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>Employer</InputTitle>
							<ShortInput
								type="text"
								name="employer"
								value={employer}
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
					<BlockRow>
						<LeftCol>
							<InputTitle>Start & End Date</InputTitle>
							<DateBlock>
								<DateInput
									type="month"
									name="startDate"
									value={startDate}
									onChange={handleInputChange}></DateInput>
								<DateInput
									type="month"
									name="endDate"
									value={endDate}
									onChange={handleInputChange}></DateInput>
							</DateBlock>
						</LeftCol>
						<RightCol>
							<InputTitle>City</InputTitle>
							<ShortInput
								type="text"
								name="city"
								value={city}
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
					<MoreInput isClick={isClick}></MoreInput>
					<LongInputBox>
						<InputTitle>Description</InputTitle>
						<InputEditor
							handleEditorInput={handleEditorInput}
							inputHtml={description}
						/>
					</LongInputBox>
				</form>
			</MoreInput>
		</Root>
	);
}
