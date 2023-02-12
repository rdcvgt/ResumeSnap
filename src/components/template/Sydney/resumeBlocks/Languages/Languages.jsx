import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Sidebar = styled.div`
	color: #fff;
	font-family: "Open Sans", sans-serif;
	overflow-wrap: break-word;
	margin-bottom: 40px;
`;

const Title = styled.div`
	font-family: "PT Sans Narrow", sans-serif;
	font-size: 20px;
`;

const Item = styled.div`
	font-size: 9px;
	font-weight: 300;
	margin-top: 10px;
	margin-bottom: 15px;
`;

const Skill = styled.div`
	margin-bottom: 5px;
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

const handleItemData = (item, index, length) => {
	const language = item.content.language;
	const level = item.content.level;

	if (!language && !level) {
		return;
	}

	let percentage;
	switch (level) {
		case "Working Knowledge":
			percentage = 20;
			break;
		case "Good Working Knowledge":
			percentage = 40;
			break;
		case "Very good command":
			percentage = 60;
			break;
		case "Highly proficient":
			percentage = 80;
			break;
		case "Native speaker":
			percentage = 100;
			break;
		default:
			break;
	}

	return (
		<Item key={index}>
			<Skill>{language}</Skill>
			{level && (
				<LevelBar>
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
				<>
					<div>
						<Sidebar>
							<Title>{blockTitle}</Title>
							{itemArr.map((item, index) => {
								return handleItemData(
									item,
									index,
									itemArr.length
								);
							})}
						</Sidebar>
					</div>
				</>
			)}
		</>
	);
}
