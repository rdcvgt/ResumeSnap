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
	const label = item.content.label || "";
	const link = item.content.link || "";

	return (
		<ItemInfo>
			<ItemTitle isHover={isHover}>
				{label}
				{!label && "(Not Specified)"}
			</ItemTitle>
			<ItemDuration>{link}</ItemDuration>
		</ItemInfo>
	);
}
