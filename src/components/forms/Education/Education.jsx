import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TitleBlock from "../utils/TitleBlock";
import Item from "./Item";

const BlockContainer = styled.div`
	width: 90%;
	height: auto;
	margin: 50px auto;
`;

const BlockDescription = styled.div`
	${(props) => props.theme.input.title};
	line-height: 1.5em;
	height: auto;
	margin: 0 0 20px 0;
`;

const MainBlock = styled.div`
	border-radius: 5px;
	border: 1px solid ${(props) => props.theme.color.neutral[20]};
	position: relative;
	margin-bottom: 10px;
`;

const AddItemButton = styled.div`
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 20px;
	border-radius: 2px;

	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: ${(props) => props.theme.color.blue[10]};
		transition: background-color 0.2s;
	}
`;

const AddItemIcon = styled.img`
	width: 10px;
	margin-right: 10px;
`;

const AddItemText = styled.div`
	${(props) => props.theme.font.infoBold};
	color: ${(props) => props.theme.color.blue[50]};
`;

PersonalDetails.propTypes = {
	handleInputData: PropTypes.func,
};

export default function PersonalDetails({ handleInputData }) {
	const [blockTitle, setBlockTitle] = useState("學歷");
	const [formData, setFormData] = useState("");

	const handleItemData = (itemData) => {
		setFormData([...formData, itemData]);
		console.log(formData);
	};

	useEffect(() => {
		let data = { personalDetails: { formData, blockTitle } };
		handleInputData(data);
	}, [formData, blockTitle]);

	return (
		<BlockContainer>
			<TitleBlock title={{ blockTitle, setBlockTitle }} />
			<BlockDescription>
				盡可能的展現你豐富且多樣的學習歷程，無論是專業知識或專案研究，都能讓找尋工作更佳順利！
			</BlockDescription>
			<MainBlock>
				<Item handleItemData={handleItemData} />
			</MainBlock>
			<AddItemButton>
				<AddItemIcon src="/images/icon/plus_blue.png" />
				<AddItemText>新增學歷</AddItemText>
			</AddItemButton>
		</BlockContainer>
	);
}
