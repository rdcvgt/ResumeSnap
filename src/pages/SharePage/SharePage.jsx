import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import London from "../../components/template/London";
import Sydney from "../../components/template/Sydney";
import { getResumeData } from "../../redux/slices/formDataSlice";
import { auth } from "../../utils/firebase/firebaseInit";

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
	//傳送 resumeId 到 redux thunk 獲取 resume data
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const userId = user.uid;
				dispatch(getResumeData(userId, resumeId));
			} else {
				navigate("/");
			}
		});
	}, []);

	return (
		<Root>
			<Body>
				<Template pageFrom="share" />
			</Body>
		</Root>
	);
}
