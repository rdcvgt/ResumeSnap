import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Block = styled.div`
	height: auto;
	border-top: 1px solid #000;
	padding-top: 10px;
`;

const MarginBottom = styled.div`
	margin-bottom: 20px;
`;

const Title = styled.div`
	font-size: 14px;
	font-weight: 500;
	display: block;
	margin-bottom: 10px;
	width: 90%;
`;

const ItemArea = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const LeftCol = styled.div`
	width: 20%;
	height: auto;
`;

const RightCol = styled.div`
	width: 80%;
`;

const ItemRow = styled.div`
	margin-bottom: 10px;
	font-size: 10px;
	text-decoration: none;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const Item = styled.div``;
const Label = styled.a`
	&:link {
		color: #000;
	}
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
			{length - 1 === index ? "" : ",\u00A0"}
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
				<>
					<div>
						<div>
							<Block />
						</div>
					</div>
					<div>
						<ItemArea>
							<LeftCol>
								<Title>{blockTitle}</Title>
							</LeftCol>
							<RightCol>
								<ItemRow>
									{itemArr.map((item, index) => {
										return handleItemData(
											item,
											index,
											itemArr.length
										);
									})}
								</ItemRow>
							</RightCol>
						</ItemArea>
					</div>

					<MarginBottom />
				</>
			)}
		</>
	);
}
