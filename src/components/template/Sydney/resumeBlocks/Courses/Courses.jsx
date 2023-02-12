import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MarginBottom = styled.div`
	margin-bottom: 30px;
`;

const Title = styled.div`
	font-family: "PT Sans Narrow", sans-serif;
	font-size: 20px;
	margin-bottom: 10px;
`;

const Item = styled.div`
	overflow-wrap: break-word;
`;

const Experience = styled.div`
	font-weight: 600;
	font-family: "Open Sans", sans-serif;
	font-size: 14px;
	margin-bottom: 6px;
`;

const Date = styled.div`
	font-family: "Open Sans", sans-serif;
	font-size: 9px;
	opacity: 0.4;
	margin-bottom: 20px;
`;

const handleItemData = (item, index) => {
	const course = item.content.course;
	const institution = item.content.institution;
	const startDate = item.content.startDate;
	const endDate = item.content.endDate;
	const htmlText = item.content.description;
	const noContent = "<p><br></p>";

	if (
		!course &&
		!institution &&
		!startDate &&
		!endDate &&
		(htmlText === noContent || !htmlText)
	) {
		return;
	}

	return (
		<Item key={index}>
			<Experience>
				{course}
				{course && institution && ", "}
				{institution}
			</Experience>

			<Date>
				{startDate}
				{startDate && endDate && " - "}
				{endDate}
			</Date>
		</Item>
	);
};

Courses.propTypes = {
	content: PropTypes.object,
};

export default function Courses({ content }) {
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
							<Title>{blockTitle}</Title>
						</div>
					</div>

					{itemArr.map((item, index) => {
						return handleItemData(item, index);
					})}

					<div>
						<MarginBottom />
					</div>
				</>
			)}
		</>
	);
}
