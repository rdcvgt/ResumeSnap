import React from "react";
import PropTypes from "prop-types";
import Block from "../utils/Block";
import Item from "../utils/Item";
import ItemInputLayout from "./ItemInputLayout";
import ItemMainInfo from "./ItemMainInfo";

WebsiteLink.propTypes = {
	dragHandleProps: PropTypes.object,
	blockId: PropTypes.string,
	handleDeleteButtonClick: PropTypes.func,
};

const blockInfo = {
	blockName: "WebsiteLink",
	blockDescription:
		"You can add links to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website.",
	addItemText: "link",
};

export default function WebsiteLink({
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
			ItemInputLayout={ItemInputLayout}
			ItemMainInfo={ItemMainInfo}
		/>
	);
}
