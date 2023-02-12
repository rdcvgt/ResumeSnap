import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.div`
	font-family: "PT Sans Narrow", sans-serif;
	color: #fff;
	overflow-wrap: break-word;
	font-size: 20px;
`;

const Item = styled.div`
	font-family: "Open Sans", sans-serif;
	color: #fff;
	overflow-wrap: break-word;
	font-size: 9px;
	font-weight: 300;
	margin-top: 10px;
`;

const Label = styled.a`
	&:link {
		color: #fff;
	}
`;

const MarginBottom = styled.div`
	margin-bottom: 40px;
`;

const handleItemData = (item, index, length) => {
	const label = item.content.label;
	const link = item.content.link;

	if (!label && !link) {
		return;
	}

	return (
		<Item key={index}>
			<Label href={link}>{label}</Label>
		</Item>
	);
};

ECActivities.propTypes = {
	content: PropTypes.object,
};

export default function ECActivities({ content }) {
	const dataLength = content.itemData.length;
	if (dataLength === 0) return;
	const blockTitle = content.blockTitle;
	const itemArr = content.itemData;

	return (
		<>
			{itemArr.length !== 0 && (
				<div>
					<Title>{blockTitle}</Title>
					{itemArr.map((item, index) => {
						return handleItemData(item, index, itemArr.length);
					})}
					<MarginBottom />
				</div>
			)}
		</>
	);
}
