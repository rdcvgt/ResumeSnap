import React from "react";
import PropTypes from "prop-types";
import Block from "../utils/Block";
import Item from "./Item";

Education.propTypes = {
	dragHandleProps: PropTypes.object,
	blockId: PropTypes.string,
	handleDeleteButtonClick: PropTypes.func,
};

const blockInfo = {
	blockName: "Education",
	blockDescription:
		"A varied education on your resume sums up the value that your learnings and background will bring to job.",
	addItemText: "education",
};

export default function Education({
	dragHandleProps,
	blockId,
	handleDeleteButtonClick,
}) {
	return (
		<Block
			blockId={blockId}
			blockInfo={blockInfo}
			dragHandleProps={dragHandleProps}
			handleDeleteButtonClick={handleDeleteButtonClick}
			hideDeleteIcon={true}
			Item={Item}
		/>
	);
}
