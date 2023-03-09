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
	const language = item.content.language || "";
	const level = item.content.level || "";

	return (
		<ItemInfo>
			<ItemTitle isHover={isHover}>
				{language}
				{!language && !level && "(Not Specified)"}
			</ItemTitle>
			<ItemDuration>{level}</ItemDuration>
		</ItemInfo>
	);
}
