import React, { useRef, useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { updateResumeName } from "../../../../redux/reducers/formDataReducer";

import { MEDIA_QUERY_LG } from "../../../../utils/style/breakpotins";

const Block = styled.div`
	display: flex;
	align-items: center;
	width: 70%;
`;

const ResumeTitle = styled.input`
	padding-left: 5px;
	width: 100%;
	height: 40px;
	font-size: 20px;
	margin: 20px 0;
	text-align: center;
	outline: none;
	border: 1px solid ${(props) => props.theme.color.neutral[10]};
	border-radius: 5px;

	min-width: 1px;
	${(props) => props.theme.font.title};
	color: ${(props) => props.theme.color.neutral[90]};
	caret-color: ${(props) => props.theme.color.blue[50]};

	&:hover {
		border: 1px solid ${(props) => props.theme.color.neutral[10]};
		transition: all 0.3s;
	}

	${MEDIA_QUERY_LG} {
		border: 1px solid ${(props) => props.theme.color.neutral[10]};
	}
`;

const ResumeTitleIcon = styled.img`
	max-height: 17px;
	margin-left: 15px;
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

	${MEDIA_QUERY_LG} {
		opacity: 1;
	}
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
