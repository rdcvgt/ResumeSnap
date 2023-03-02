import React from "react";
import PropTypes from "prop-types";
import Block from "../utils/Block";
import Item from "../utils/Item";
import ItemInputLayout from "./ItemInputLayout";
import ItemMainInfo from "./ItemMainInfo";

CustomSection.propTypes = {
	dragHandleProps: PropTypes.object,
	blockId: PropTypes.string,
	handleDeleteButtonClick: PropTypes.func,
};

const blockInfo = {
	blockName: "CustomSection",
	blockDescription: null,
	addItemText: "item",
};

export default function CustomSection({
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
