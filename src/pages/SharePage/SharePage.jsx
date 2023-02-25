import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import London from "../../components/template/London";
import Sydney from "../../components/template/Sydney";
import { getResumeData } from "../../redux/slices/formDataSlice";
import { auth } from "../../utils/firebase/firebaseInit";
import { checkSharePageResumeId } from "../../utils/firebase/database";
import { addResumeData } from "../../redux/slices/formDataSlice";

const Root = styled.div`
	width: 100%;
	height: auto;
	background-color: ${(props) => props.theme.color.neutral[10]};
`;

const Body = styled.div`
	display: flex;
	height: auto;
	justify-content: center;
	padding: 80px;
`;

const templates = {
	London,
	Sydney,
};

export default function EditPage() {
	const { resumeId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentTemplate = useSelector((state) => state.formData.template);
	const Template = useMemo(() => {
		return templates[currentTemplate];
	}, [currentTemplate]);

	//查詢 resumeId 是否存在，若存在則直接更新 redux 資料，否則導回首頁
	useEffect(() => {
		const resultPromise = checkSharePageResumeId(resumeId);
		resultPromise.then((result) => {
			if (result) {
				dispatch(addResumeData({ resumeData: result }));
			} else {
				navigate("/");
			}
		});
	}, [dispatch, navigate, resumeId]);

	//傳送 resumeId 到 redux thunk 獲取 resume data

	return (
		<Root>
			<Body>
				<Template pageFrom="share" />
			</Body>
		</Root>
	);
}
