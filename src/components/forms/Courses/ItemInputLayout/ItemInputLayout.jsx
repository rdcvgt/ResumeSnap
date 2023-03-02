import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { updateItemData } from "../../../../redux/reducers/formDataReducer";

import {
	BlockRowStyle,
	LeftColStyle,
	RightColStyle,
	DateBlockStyle,
	DateInputStyle,
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

Item.propTypes = {
	item: PropTypes.object,
	blockId: PropTypes.string,
};

export default function Item({ item, blockId }) {
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
		</form>
	);
}
