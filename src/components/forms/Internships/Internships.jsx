import React from "react";
import PropTypes from "prop-types";
import Block from "../utils/Block";
import Item from "./Item";

Internships.propTypes = {
	dragHandleProps: PropTypes.object,
	blockId: PropTypes.string,
	handleDeleteButtonClick: PropTypes.func,
};

const blockInfo = {
	blockName: "Internships",
	blockDescription: null,
	addItemText: "internship",
};

export default function Internships({
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
			Item={Item}
		/>
	);
}
