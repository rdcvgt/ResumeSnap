import React, { useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

import { addItem, updateItemOrder } from "../../../redux/slices/formDataSlice";
import TitleBlock from "../utils/TitleBlock";
import Item from "./Item";

const BlockContainer = styled.div`
	width: 90%;
	height: auto;
	margin: 50px auto;
	background-color: rgba(256, 256, 256, 0.8);
	border-radius: 5px;
`;

const BlockDescription = styled.div`
	${(props) => props.theme.input.title};
	line-height: 1.5em;
	height: auto;
	margin: 0 0 20px 0;
`;

const MainBlock = styled.div``;

const AddItemButton = styled.div`
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 20px;
	border-radius: 2px;

	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: ${(props) => props.theme.color.blue[10]};
		transition: background-color 0.2s;
	}
`;

const AddItemIcon = styled.img`
	width: 10px;
	margin-right: 10px;
`;

const AddItemText = styled.div`
	${(props) => props.theme.font.infoBold};
	color: ${(props) => props.theme.color.blue[50]};
`;

EmploymentHistory.propTypes = {
	blockId: PropTypes.string,
	dragHandleProps: PropTypes.object,
};

export default function EmploymentHistory({ blockId, dragHandleProps }) {
	const dispatch = useDispatch();
	const [blockData] = useSelector((state) =>
		state.formData.formBlocks.filter((block) => block.id === blockId)
	);

	const blockTitle = blockData.content.blockTitle || "";
	const itemData = blockData.content.itemData;

	//增加新 item
	const handleAddItemButtonClick = () => {
		dispatch(addItem({ blockId }));
	};

	//dnd後，進行 state 管理
	const handleOnDragEnd = useCallback(
		(result) => {
			//如果拖曳至預設範圍外則 return
			if (!result.destination) return;
			//取出目前 formData 陣列 (item 順序)
			const items = Array.from(itemData);
			//使用 splice(deletedIndex, deleteCount) 取出從陣列移除的元素
			const [reorderItem] = items.splice(result.source.index, 1);
			//使用 splice(deletedIndex, deleteCount, newElement) 取出從陣列插入元素
			items.splice(result.destination.index, 0, reorderItem);

			dispatch(
				updateItemOrder({
					blockId,
					newItemOrder: items,
				})
			);
		},
		[itemData, dispatch]
	);

	return (
		<BlockContainer>
			<TitleBlock
				blockTitle={blockTitle}
				blockId={blockId}
				dragHandleProps={dragHandleProps}
			/>
			<BlockDescription>
				Show your relevant experience (last 10 years). Use bullet points
				to note your achievements, if possible - use numbers/facts
				(Achieved X, measured by Y, by doing Z).
			</BlockDescription>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="employmentHistoryItems">
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}>
							<MainBlock>
								{itemData.map((item, index) => (
									<Draggable
										key={item.id}
										draggableId={item.id}
										index={index}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}>
												<Item
													item={item}
													blockId={blockId}
													dragHandleProps={{
														...provided.dragHandleProps,
													}}
												/>
											</div>
										)}
									</Draggable>
								))}
							</MainBlock>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<AddItemButton onClick={handleAddItemButtonClick}>
				<AddItemIcon src="/images/icon/plus_blue.png" />
				<AddItemText>Add one more employment</AddItemText>
			</AddItemButton>
		</BlockContainer>
	);
}
