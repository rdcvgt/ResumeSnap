import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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
	itemId: PropTypes.string,
	handleItemDataUpdate: PropTypes.func,
	handleItemDelete: PropTypes.func,
	dragHandleProps: PropTypes.object,
};

export default function Item({
	itemId,
	handleItemDataUpdate,
	handleItemDelete,
	dragHandleProps,
}) {
	const [isClick, setIsClick] = useState(true);
	const [isHover, setIsHover] = useState(false);
	const [timer, setTimer] = useState(null);
	const [itemData, setItemData] = useState({});

	const handleDeleteIconClick = () => {
		handleItemDelete(itemId);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		let newValue = value;
		if (name === "startDate" || name === "endDate") {
			newValue = value.replace("-", " / ");
		}
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			setItemData({ ...itemData, [name]: newValue });
		}, 300);
		setTimer(newTimer);
	};

	const handleEditorInput = (inputHtml) => {
		setItemData({ ...itemData, description: inputHtml });
	};

	useEffect(() => {
		handleItemDataUpdate({ id: itemId, content: itemData });
	}, [itemData]);

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
						{itemData.jobTitle}
						{itemData.jobTitle && itemData.employer ? " - " : ""}
						{itemData.employer}
						{!itemData.jobTitle &&
							!itemData.employer &&
							"尚未填寫名稱"}
					</ItemTitle>
					<ItemDuration>
						{itemData.startDate}
						{itemData.startDate && itemData.endDate ? " - " : ""}
						{itemData.endDate}
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
							<InputTitle>職稱</InputTitle>
							<ShortInput
								type="text"
								name="jobTitle"
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>公司名稱</InputTitle>
							<ShortInput
								type="text"
								name="employer"
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
					<BlockRow>
						<LeftCol>
							<InputTitle>開始、結束日期</InputTitle>
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
							<InputTitle>地點</InputTitle>
							<ShortInput
								type="text"
								name="city"
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
					<MoreInput isClick={isClick}></MoreInput>
					<LongInputBox>
						<InputEditor handleEditorInput={handleEditorInput} />
					</LongInputBox>
				</form>
			</MoreInput>
		</Root>
	);
}
