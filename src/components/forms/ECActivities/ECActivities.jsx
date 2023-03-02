import React from "react";
import PropTypes from "prop-types";
import Block from "../utils/Block";
import Item from "../utils/Item";
import ItemInputLayout from "./ItemInputLayout";
import ItemMainInfo from "./ItemMainInfo";

ECActivities.propTypes = {
	dragHandleProps: PropTypes.object,
	blockId: PropTypes.string,
	handleDeleteButtonClick: PropTypes.func,
};

const blockInfo = {
	blockName: "ECActivities",
	blockDescription: null,
	addItemText: "activity",
};

export default function ECActivities({
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
