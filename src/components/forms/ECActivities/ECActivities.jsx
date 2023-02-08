import React from "react";
import PropTypes from "prop-types";
import Block from "../utils/Block";
import Item from "./Item";

ECActivities.propTypes = {
	dragHandleProps: PropTypes.object,
	blockId: PropTypes.string,
	handleDeleteButtonClick: PropTypes.func,
};

const blockInfo = {
	blockName: "ECActivities",
	blockDescription: null,
	addItemText: "Add one more activity",
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
		/>
	);
}
