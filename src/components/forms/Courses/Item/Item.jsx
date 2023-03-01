import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import {
	deleteItem,
	updateItemData,
} from "../../../../redux/reducers/formDataReducer";

import {
	RootStyle,
	DragBlockStyle,
	DragIconStyle,
	DeleteBlockStyle,
	DeleteIconStyle,
	ItemDescriptionStyle,
	ItemInfoStyle,
	ItemTitleStyle,
	ItemDurationStyle,
	ItemArrowIconStyle,
	BlockRowStyle,
	LeftColStyle,
	RightColStyle,
	DateBlockStyle,
	DateInputStyle,
	InputTitleStyle,
	ShortInputStyle,
	MoreInputStyle,
} from "../../utils/form.style";

const Root = styled.div`
	${RootStyle}
`;

const DragBlock = styled.div`
	${DragBlockStyle}
`;

const DragIcon = styled.img`
	${DragIconStyle}
`;

const DeleteBlock = styled.div`
	${DeleteBlockStyle}
`;

const DeleteIcon = styled.img`
	${DeleteIconStyle}
`;

const ItemDescription = styled.div`
	${ItemDescriptionStyle}
`;

const ItemInfo = styled.div`
	${ItemInfoStyle}
`;

const ItemTitle = styled.div`
	${ItemTitleStyle}
`;

const ItemDuration = styled.div`
	${ItemDurationStyle}
`;

const ItemArrowIcon = styled.img`
	${ItemArrowIconStyle}
`;

const BlockRow = styled.div`
	${BlockRowStyle}
`;

const LeftCol = styled.div`
	${LeftColStyle}
`;

const RightCol = styled.div`
	${RightColStyle}
`;

const DateBlock = styled.div`
	${DateBlockStyle}
`;

const DateInput = styled.input`
	${DateInputStyle}
`;

const InputTitle = styled.div`
	${InputTitleStyle}
`;

const ShortInput = styled.input`
	${ShortInputStyle}
`;

const MoreInput = styled.div`
	${MoreInputStyle}
`;

Item.propTypes = {
	item: PropTypes.object,
	blockId: PropTypes.string,
	dragHandleProps: PropTypes.object,
};

export default function Item({ item, blockId, dragHandleProps }) {
	const [isClick, setIsClick] = useState(false);
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

	const course = item.content.course || "";
	const institution = item.content.institution || "";
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
				<DragBlock isHover={isHover} {...dragHandleProps}>
					<DragIcon src="/images/icon/drag.png" />
				</DragBlock>
				<DeleteBlock isHover={isHover} onClick={handleDeleteIconClick}>
					<DeleteIcon src="/images/icon/delete.png" />
				</DeleteBlock>
				<ItemInfo>
					<ItemTitle isHover={isHover}>
						{course}
						{course && institution ? " at " : ""}
						{institution}
						{!course && !institution && "(Not Specified)"}
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
							<InputTitle>Course</InputTitle>
							<ShortInput
								type="text"
								name="course"
								value={course}
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>Institution</InputTitle>
							<ShortInput
								type="text"
								name="institution"
								value={institution}
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
						<RightCol></RightCol>
					</BlockRow>
					<MoreInput isClick={isClick}></MoreInput>
				</form>
			</MoreInput>
		</Root>
	);
}
