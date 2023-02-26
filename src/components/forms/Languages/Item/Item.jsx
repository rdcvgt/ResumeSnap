import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
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

const Menu = styled.div`
	width: 100%;
	height: 50px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.color.neutral[10]};
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	position: relative;
	user-select: none;

	${(props) =>
		props.isSelect &&
		`
		border-radius: 5px 5px 0px 0px;
	`}
`;

const DefaultText = styled.div`
	${(props) => props.theme.font.content};
	margin: 15px;
	color: ${(props) => (props.level ? "#000" : props.theme.color.neutral[40])};
`;

const ArrowIcon = styled.img`
	width: 15px;
	margin: 15px;
`;

const fadeIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1;}
`;

const Options = styled.ul`
	list-style: none;
	position: absolute;
	top: 50px;
	list-style-type: none;
	width: 100%;
	border-radius: 0px 0px 5px 5px;
	background-color: ${(props) => props.theme.color.neutral[10]};
	height: 120px;
	overflow-y: scroll;
	scrollbar-gutter: stable;
	box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
	animation: ${fadeIn} 0.3s forwards;
	z-index: 10;

	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-track {
		background: none;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}
`;

const Option = styled.li`
	${(props) => props.theme.font.content};
	height: 40px;
	display: flex;
	align-items: center;
	padding: 0px 15px;

	&:before {
		content: "";
		display: none;
	}

	&:first-child {
		color: ${(props) => props.theme.color.neutral[40]};
	}

	&:hover {
		background-color: ${(props) => props.theme.color.blue[20]};
		color: ${(props) => props.theme.color.blue[50]};
	}
`;

Item.propTypes = {
	item: PropTypes.object,
	blockId: PropTypes.string,
	dragHandleProps: PropTypes.object,
};

export default function Item({ item, blockId, dragHandleProps }) {
	const [isClick, setIsClick] = useState(true);
	const [isHover, setIsHover] = useState(false);
	const [isSelect, setIsSelect] = useState(false);
	const MenuRef = useRef(null);
	const dispatch = useDispatch();

	//刪除 item
	const handleDeleteIconClick = () => {
		dispatch(deleteItem({ blockId, itemId: item.id }));
	};

	//更新 item data
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		let newValue = value;
		dispatch(
			updateItemData({
				blockId,
				itemId: item.id,
				itemInputTitle: name,
				itemInputValue: newValue,
			})
		);
	};

	//根據使用者所選澤的選項，顯示在畫面上，並更新 item data
	const handleOptionClick = (e) => {
		const selectedText =
			e.target.innerText === "Select Level" ? null : e.target.innerText;
		dispatch(
			updateItemData({
				blockId,
				itemId: item.id,
				itemInputTitle: "level",
				itemInputValue: selectedText,
			})
		);
	};

	//若使用者點擊 level 選單以外區域則會關閉選單
	useEffect(() => {
		window.addEventListener("click", (e) => {
			if (e.target === null) return;
			if (!MenuRef.current.contains(e.target)) {
				setIsSelect(false);
			}
		});
	}, [MenuRef]);

	const language = item.content.language || "";
	const level = item.content.level || "";

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
						{language}
						{!language && !level && "(Not Specified)"}
					</ItemTitle>
					<ItemDuration>{level}</ItemDuration>
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
							<InputTitle>Language</InputTitle>
							<ShortInput
								type="text"
								name="language"
								value={language}
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>Level</InputTitle>
							<Menu
								ref={MenuRef}
								onClick={() => {
									setIsSelect(!isSelect);
								}}
								isSelect={isSelect}>
								<DefaultText level={level}>
									{!level && "Select Level"}
									{level && level}
								</DefaultText>
								<ArrowIcon
									src={
										isSelect
											? "/images/icon/up_blue.png"
											: "/images/icon/down_blue.png"
									}
								/>
								{isSelect && (
									<Options onClick={handleOptionClick}>
										<Option>Select Level</Option>
										<Option>Native speaker</Option>
										<Option>Highly proficient</Option>
										<Option>Very good command</Option>
										<Option>Good Working Knowledge</Option>
										<Option>Working Knowledge</Option>
									</Options>
								)}
							</Menu>
						</RightCol>
					</BlockRow>
					<MoreInput isClick={isClick}></MoreInput>
				</form>
			</MoreInput>
		</Root>
	);
}
