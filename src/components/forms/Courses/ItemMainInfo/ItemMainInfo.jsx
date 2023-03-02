import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
	ItemInfoStyle,
	ItemTitleStyle,
	ItemDurationStyle,
} from "../../utils/form.style";

const ItemInfo = styled.div`
	${ItemInfoStyle}
`;

const ItemTitle = styled.div`
	${ItemTitleStyle}
`;

const ItemDuration = styled.div`
	${ItemDurationStyle}
`;

Item.propTypes = {
	item: PropTypes.object,
	isHover: PropTypes.bool,
};

export default function Item({ item, isHover }) {
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
	);
}
