import React, { useRef, useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { updateResumeName } from "../../../../redux/slices/formDataSlice";

const Block = styled.div`
	display: flex;
	/* justify-content: center; */
	align-items: center;
	height: 25px;
	&:hover {
	}
`;

const ResumeTitle = styled.input`
	width: 150px;
	height: 25px;
	min-width: 30ch;
	max-width: 80%;
	font-size: 20px;
	margin: 20px 0;
	text-align: center;
	outline: none;
	border: none;
	min-width: 1px;
	${(props) => props.theme.font.title};
	color: ${(props) => props.theme.color.neutral[90]};
	caret-color: ${(props) => props.theme.color.blue[50]};
`;

const ResumeTitleIcon = styled.img`
	max-height: 15px;
	opacity: 0;
	transition: all 0.3s;
	cursor: pointer;
	&:hover {
		opacity: 1;
		filter: brightness(1);
	}

	${(props) =>
		props.isHover &&
		`
		opacity: 1;
		filter: brightness(1.4);
		transition: all 0.3s;
		`}
`;

ResumeTitleBlock.propTypes = {};

function ResumeTitleBlock() {
	const resumeTitleRef = useRef(null);
	const [isHover, setIsHover] = useState(false);

	const dispatch = useDispatch();
	const resumeName = useSelector((state) => state.formData.resumeName);
	const handleResumeTitleChange = (e) => {
		dispatch(updateResumeName({ resumeName: e.target.value }));
	};

	//點選編輯按鈕，標題全選
	const handleResumeTitleIconClick = () => {
		resumeTitleRef.current.select();
	};

	return (
		<>
			<Block
				onMouseEnter={() => {
					setIsHover(true);
				}}
				onMouseLeave={() => {
					setIsHover(false);
				}}>
				<ResumeTitle
					type="text"
					value={resumeName}
					onChange={handleResumeTitleChange}
					ref={resumeTitleRef}
				/>
				<ResumeTitleIcon
					src="/images/icon/edit.png"
					onClick={handleResumeTitleIconClick}
					isHover={isHover}
				/>
			</Block>
		</>
	);
}

export default ResumeTitleBlock;
