import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TitleBlock from "../utils/TitleBlock";
import Item from "./Item";
import uuid from "react-uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const BlockContainer = styled.div`
	width: 90%;
	height: auto;
	margin: 50px auto;
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

PersonalDetails.propTypes = {
	handleInputData: PropTypes.func,
};

export default function PersonalDetails({ handleInputData }) {
	const [blockTitle, setBlockTitle] = useState("學歷");
	const [formData, setFormData] = useState([]);

	const handleItemDataUpdate = (item) => {
		let newFormData = [...formData];
		const index = newFormData.findIndex((i) => i.id === item.id);
		newFormData[index] = { ...newFormData[index], content: item.content };
		setFormData(newFormData);
	};

	const handleItemDelete = (itemId) => {
		setFormData(formData.filter((item) => item.id !== itemId));
	};

	const handleAddItemButtonClick = () => {
		const itemId = uuid();
		setFormData([...formData, { id: itemId, content: {} }]);
	};

	//dnd後，進行 state 管理
	const handleOnDragEnd = (result) => {
		//如果拖曳至預設範圍外則 return
		if (!result.destination) return;
		//取出目前 formData 陣列 (item 順序)
		const items = Array.from(formData);
		//使用 splice(deletedIndex, deleteCount) 取出從陣列移除的元素
		const [reorderItem] = items.splice(result.source.index, 1);
		//使用 splice(deletedIndex, deleteCount, newElement) 取出從陣列插入元素
		items.splice(result.destination.index, 0, reorderItem);
		setFormData(items);
	};

	useEffect(() => {
		let data = { education: { formData, blockTitle } };
		handleInputData(data);
	}, [formData, blockTitle]);

	return (
		<BlockContainer>
			<TitleBlock title={{ blockTitle, setBlockTitle }} />
			<BlockDescription>
				盡可能的展現你豐富且多樣的學習歷程，無論是專業知識或專案研究，都能讓找尋工作更佳順利！
			</BlockDescription>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="educationItems">
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}>
							<MainBlock>
								{formData.map((item, index) => (
									<Draggable
										key={item.id}
										draggableId={item.id}
										index={index}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}>
												<Item
													itemId={item.id}
													handleItemDataUpdate={
														handleItemDataUpdate
													}
													handleItemDelete={
														handleItemDelete
													}
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
				<AddItemText>新增學歷</AddItemText>
			</AddItemButton>
		</BlockContainer>
	);
}
