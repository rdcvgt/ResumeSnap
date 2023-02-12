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
`;

const ItemArea = styled.div`
	display: flex;
	justify-content: space-between;
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
	display: inline-grid;
	grid-auto-flow: row;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: auto;
	column-gap: 30px;
	row-gap: 10px;
`;

const Item = styled.div`
	display: flex;
	justify-content: space-between;
	/* grid-area: item; */
`;

const Date = styled.div`
	width: 20%;
`;
const Experience = styled.div`
	font-weight: 600;
	width: 60%;
`;
const Level = styled.div`
	width: 20%;
	text-align: right;
	display: flex;
	justify-content: flex-end;
`;

const handleItemData = (item, index) => {
	const skill = item.content.skill;
	const level = item.content.level;

	if (!skill && !level) {
		return;
	}

	return (
		<Item key={index}>
			<Experience>{skill}</Experience>
			<Level>{level}</Level>
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
										return handleItemData(item, index);
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
