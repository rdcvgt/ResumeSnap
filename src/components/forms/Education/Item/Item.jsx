import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import InputEditor from "../../utils/Editor";

const ItemDescription = styled.div`
	width: 100%;
	cursor: pointer;
	padding: 20px;
`;

const ItemInfo = styled.div`
	${(props) => props.theme.font.itemBold};
	width: 100%;
	margin-bottom: 5px;
	color: ${(props) => props.theme.color.neutral[90]};
`;

const ItemDuration = styled.div`
	${(props) => props.theme.input.title};
	width: 100%;
	margin: 0;
`;

const ItemArrowIcon = styled.img`
	width: 15px;
	position: absolute;
	top: 30px;
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
	${(props) =>
		props.isClick &&
		`
	max-height: 600px; overflow: visible; opacity: 1;
	`}
`;

Item.propTypes = {
	handleItemData: PropTypes.func,
};

export default function Item({ handleItemData }) {
	const [isClick, setIsClick] = useState(false);
	const [timer, setTimer] = useState(null);
	const [itemData, setItemData] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		let newValue = value;
		if (name === "startDate" || name === "endDate") {
			newValue = value.replace("-", " / ");
		}
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			setItemData({ ...itemData, [name]: newValue });
		}, 1000);
		setTimer(newTimer);
	};

	useEffect(() => {
		handleItemData(itemData);
	}, [itemData]);

	return (
		<>
			<ItemDescription
				onClick={() => {
					setIsClick(!isClick);
				}}>
				<ItemInfo>
					{itemData.school}
					{itemData.school && itemData.degree ? " - " : ""}
					{itemData.degree}
					{!itemData.school && !itemData.degree && "（尚未填寫名稱）"}
				</ItemInfo>
				<ItemDuration>
					{itemData.startDate}
					{itemData.startDate && itemData.endDate ? " - " : ""}
					{itemData.endDate}
				</ItemDuration>
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
							<InputTitle>學校名稱</InputTitle>
							<ShortInput
								type="text"
								name="school"
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>科系名稱</InputTitle>
							<ShortInput
								type="text"
								name="degree"
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
					<BlockRow>
						<LeftCol>
							<InputTitle>就讀期間</InputTitle>
							<DateBlock>
								<DateInput
									type="month"
									name="startDate"
									onChange={handleInputChange}></DateInput>
								<DateInput
									type="month"
									name="endDate"
									onChange={handleInputChange}></DateInput>
							</DateBlock>
						</LeftCol>
						<RightCol>
							<InputTitle>學校地區</InputTitle>
							<ShortInput
								type="text"
								name="city"
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
					<MoreInput isClick={isClick}></MoreInput>
					<LongInputBox>
						<InputEditor
						// handleEditorInput={handleEditorInput}
						/>
					</LongInputBox>
				</form>
			</MoreInput>
		</>
	);
}
