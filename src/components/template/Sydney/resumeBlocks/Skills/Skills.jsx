import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.div`
	font-family: "PT Sans Narrow", sans-serif;
	font-size: 20px;
	color: #fff;
	overflow-wrap: break-word;
`;

const Item = styled.div`
	font-family: "Open Sans", sans-serif;
	color: #fff;
	font-size: 9px;
	font-weight: 300;
	margin-top: 10px;
	margin-bottom: 15px;
`;

const Skill = styled.div`
	margin-bottom: 5px;
	overflow-wrap: break-word;
`;

const LevelBar = styled.div`
	width: 100%;
	height: 5px;
	position: relative;
	background-color: rgb(256, 256, 256, 0.4);
`;

const Level = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: ${(props) => props.percentage}%;
	height: 5px;
	background-color: rgb(256, 256, 256, 1);
`;

const MarginBottom = styled.div`
	margin-bottom: 40px;
`;

const handleItemData = (item, index, length) => {
	const skill = item.content.skill;
	const level = item.content.level;

	if (!skill && !level) {
		return;
	}

	let percentage;
	switch (level) {
		case "Novice":
			percentage = 20;
			break;
		case "Beginner":
			percentage = 40;
			break;
		case "Skillful":
			percentage = 60;
			break;
		case "Experienced":
			percentage = 80;
			break;
		case "Expert":
			percentage = 100;
			break;
		default:
			break;
	}

	return (
		<Item key={index}>
			<Skill>{skill}</Skill>
			{level && (
				<LevelBar>
					{" "}
					<Level percentage={percentage} />
				</LevelBar>
			)}
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
