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
	margin-bottom: 15px;
`;

const Item = styled.div``;

const TopRow = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	font-size: 10px;
	text-decoration: none;
	line-height: 1.5em;
`;

const Date = styled.div`
	width: 20%;
`;
const Experience = styled.div`
	font-weight: 600;
	width: 60%;
`;
const City = styled.div`
	width: 20%;
	text-align: right;
`;

const BottomRow = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	font-size: 10px;
	text-decoration: none;
	line-height: 1.5em;
`;

const Space = styled.div`
	width: 20%;
`;

const Description = styled.div`
	width: 80%;
`;

const handleItemData = (item, index) => {
	const school = item.content.school;
	const degree = item.content.degree;
	const city = item.content.city;
	const startDate = item.content.startDate;
	const endDate = item.content.endDate;
	const htmlText = item.content.description;
	const noContent = "<p><br></p>";

	if (
		!school &&
		!degree &&
		!city &&
		!startDate &&
		!endDate &&
		(htmlText === noContent || !htmlText)
	) {
		return;
	}

	let description;
	if (htmlText) {
		description = htmlText.replace(
			/(<a href)/g,
			`<a style="color: #000000" href`
		);
	}

	return (
		<Item key={index}>
			<TopRow>
				<Date>
					{startDate}
					{startDate && endDate && " - "}
					{endDate}
				</Date>

				<Experience>
					{school}
					{school && degree && " "}
					{degree}
				</Experience>
				<City>{city}</City>
			</TopRow>
			<BottomRow>
				<Space />
				{htmlText && htmlText !== noContent && (
					<Description
						dangerouslySetInnerHTML={{
							__html: description,
						}}></Description>
				)}
			</BottomRow>
		</Item>
	);
};

Education.propTypes = {
	data: PropTypes.object,
	blockId: PropTypes.string,
	handleBlockHeight: PropTypes.func,
};

export default function Education({ data }) {
	const dataLength = Object.keys(data).length;
	if (dataLength === 0) return;
	const blockTitle = data.blockTitle;
	const itemArr = data.formData;

	return (
		<>
			{itemArr.length !== 0 && (
				<>
					<div>
						<div>
							<Block />
							<Title>{blockTitle}</Title>
						</div>
					</div>

					{itemArr.map((item, index) => {
						return handleItemData(item, index);
					})}
					<MarginBottom />
				</>
			)}
		</>
	);
}
