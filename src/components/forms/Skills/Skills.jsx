import React from "react";
import PropTypes from "prop-types";
import Block from "../utils/Block";
import Item from "../utils/Item";
import ItemInputLayout from "./ItemInputLayout";
import ItemMainInfo from "./ItemMainInfo";

Courses.propTypes = {
	dragHandleProps: PropTypes.object,
	blockId: PropTypes.string,
	handleDeleteButtonClick: PropTypes.func,
};

const blockInfo = {
	blockName: "Skills",
	blockDescription: null,
	addItemText: "skill",
};

export default function Courses({
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
			ItemInputLayout={ItemInputLayout}
			ItemMainInfo={ItemMainInfo}
		/>
	);
}
