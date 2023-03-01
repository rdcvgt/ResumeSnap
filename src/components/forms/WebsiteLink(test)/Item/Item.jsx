import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
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
	InputTitleStyle,
	ShortInputStyle,
	MoreInputStyle,
} from "../../utils/form.style";

import { DefaultButtonStyle } from "../../../buttons/button.style";
import {
	MEDIA_QUERY_MD,
	MEDIA_QUERY_LG,
} from "../../../../utils/style/breakpotins";

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

const InputTitle = styled.div`
	${InputTitleStyle}
`;

const ShortInput = styled.input`
	${ShortInputStyle}
`;

const MoreInput = styled.div`
	${MoreInputStyle}
`;

const moveIn = keyframes`
	0% { left: 100%; }
	100% { left: 0;}
`;

const FullPage = styled.div`
	display: none;
	padding: 20px 20px;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 100%;
	background-color: #fff;
	z-index: 20;
	border: 1px solid #000;
	transition: all 0.3s;
	animation: ${moveIn} 0.3s forwards;

	${MEDIA_QUERY_MD} {
		transition: all 0.3s;
		${(props) => (props.isClick ? "display: block" : "display: none")}
	} ;
`;

const BackButton = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 40px;
	background-color: ${(props) => props.theme.color.blue[10]};
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 20px;
	left: 20px;
`;

const LeftIcon = styled.img`
	width: 10px;
	transform: rotate(90deg);
`;

const BlockTitle = styled.div`
	${(props) => props.theme.font.blockTitle};
	width: 70%;
	margin: 0px auto 30px auto;
	text-align: center;
	word-wrap: break-word;
`;

const DoneButton = styled.div`
	${DefaultButtonStyle}
	width: 100%;
	margin-top: 40px;
`;

Item.propTypes = {
	item: PropTypes.object,
	blockId: PropTypes.string,
	dragHandleProps: PropTypes.object,
};

export default function Item({ item, blockId, dragHandleProps }) {
	const fullPageRef = useRef();
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

	//
	const handleBackButtonClick = () => {
		fullPageRef.current.style.opacity = `0`;
		setTimeout(() => {
			setIsClick(false);
		}, 300);
	};

	useEffect(() => {
		fullPageRef.current.style.opacity = `1`;
	}, [isClick]);

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
					{/* <MoreInput isClick={isClick}></MoreInput> */}
				</form>
			</MoreInput>

			<FullPage ref={fullPageRef} isClick={isClick}>
				<BackButton onClick={handleBackButtonClick}>
					<LeftIcon src="/images/icon/down_blue.png" />
				</BackButton>
				<BlockTitle>
					TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
				</BlockTitle>

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
					{/* <MoreInput isClick={isClick}></MoreInput> */}
				</form>
				<DoneButton onClick={handleBackButtonClick}>Done</DoneButton>
			</FullPage>
		</Root>
	);
}
