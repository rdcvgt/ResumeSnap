import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ResumeContainer = styled.div`
	width: 100%;
	height: auto;
`;

const Block = styled.div`
	height: auto;
	border-top: 1px solid #000;
	padding-top: 10px;
	margin-bottom: 20px;
`;

const Title = styled.div`
	font-size: 14px;
	font-weight: 500;
	display: block;
	margin-bottom: 15px;
`;

const Content = styled.div`
	font-size: 10px;
	text-decoration: none;
	width: 100%;
	line-height: 1.5em;
`;

const Item = styled.div`
	display: flex;
	margin-bottom: 20px;
`;

const LeftCol = styled.div`
	width: 20%;
`;
const RightCol = styled.div`
	width: 80%;
`;
const TopRow = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`;

const Date = styled.div`
	width: 100%;
`;
const Experience = styled.div`
	font-weight: 600;
`;
const City = styled.div``;

const Description = styled.div``;

Education.propTypes = {
	data: PropTypes.object,
};

export default function Education({ data }) {
	const dataLength = Object.keys(data).length;
	if (dataLength === 0) return;
	const blockTitle = data.blockTitle;
	const itemArr = data.formData;

	const handleItemData = (item, index) => {
		const school = item.content.school;
		const degree = item.content.degree;
		const city = item.content.city;
		const startDate = item.content.startDate;
		const endDate = item.content.endDate;
		const htmlText = item.content.description;

		let description;
		if (htmlText) {
			description = htmlText.replace(
				/(<a href)/g,
				`<a style="color: #000000" href`
			);
		}
		const noContent = "<p><br></p>";

		return (
			<Item key={index}>
				<LeftCol>
					<Date>
						{startDate}
						{startDate && endDate && " - "}
						{endDate}
					</Date>
				</LeftCol>

				<RightCol>
					<TopRow>
						<Experience>
							{school}
							{school && degree && " "}
							{degree}
						</Experience>
						<City>{city}</City>
					</TopRow>
					{htmlText && htmlText !== noContent && (
						<Description
							dangerouslySetInnerHTML={{
								__html: description,
							}}></Description>
					)}
				</RightCol>
			</Item>
		);
	};

	return (
		<ResumeContainer>
			{itemArr.length !== 0 && (
				<Block>
					<Title>{blockTitle}</Title>
					<Content>
						{itemArr.map((item, index) => {
							return handleItemData(item, index);
						})}
					</Content>
				</Block>
			)}
		</ResumeContainer>
	);
}
