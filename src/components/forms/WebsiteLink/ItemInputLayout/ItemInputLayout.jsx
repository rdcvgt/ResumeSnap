import React from "react";
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

ItemInputLayout.propTypes = {
	item: PropTypes.object,
	blockId: PropTypes.string,
};

export default function ItemInputLayout({ item, blockId }) {
	const dispatch = useDispatch();

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
		</form>
	);
}
