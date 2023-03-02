import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { updateItemData } from "../../../../redux/reducers/formDataReducer";

import {
	BlockRowStyle,
	LeftColStyle,
	RightColStyle,
	InputTitleStyle,
	ShortInputStyle,
	MenuStyle,
	DefaultTextStyle,
	ArrowIconStyle,
	OptionsStyle,
	OptionStyle,
} from "../../utils/form.style";

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

const Menu = styled.div`
	${MenuStyle}
`;

const DefaultText = styled.div`
	${DefaultTextStyle}
`;

const ArrowIcon = styled.img`
	${ArrowIconStyle}
`;

const Options = styled.ul`
	${OptionsStyle}
`;

const Option = styled.li`
	${OptionStyle}
`;

Item.propTypes = {
	item: PropTypes.object,
	blockId: PropTypes.string,
	dragHandleProps: PropTypes.object,
};

export default function Item({ item, blockId }) {
	const [isSelect, setIsSelect] = useState(false);
	const MenuRef = useRef(null);
	const dispatch = useDispatch();

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
		const handleMenuClick = (e) => {
			if (e.target === null) return;
			if (!MenuRef.current) return;
			if (!MenuRef.current.contains(e.target)) {
				setIsSelect(false);
			}
		};
		window.addEventListener("click", handleMenuClick);
		//刪除註冊監聽器
		return () => {
			window.removeEventListener("click", handleMenuClick);
		};
	}, [MenuRef]);

	const skill = item.content.skill || "";
	const level = item.content.level || "";

	return (
		<form>
			<BlockRow>
				<LeftCol>
					<InputTitle>Skill</InputTitle>
					<ShortInput
						type="text"
						name="skill"
						value={skill}
						onChange={handleInputChange}></ShortInput>
				</LeftCol>
				<RightCol>
					<InputTitle>Level</InputTitle>
					<Menu
						ref={MenuRef}
						className="Menu"
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
								<Option>Novice</Option>
								<Option>Beginner</Option>
								<Option>Skillful</Option>
								<Option>Experienced</Option>
								<Option>Expert</Option>
							</Options>
						)}
					</Menu>
				</RightCol>
			</BlockRow>
		</form>
	);
}
