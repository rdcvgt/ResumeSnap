import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import London from "../../components/template/London";
import Sydney from "../../components/template/Sydney";
import { checkSharePageResumeId } from "../../utils/firebase/database";
import { addResumeData } from "../../redux/reducers/formDataReducer";

const Root = styled.div`
	width: 100%;
	height: auto;
	overflow: hidden;
	background-color: ${(props) => props.theme.color.neutral[10]};
`;

const Body = styled.div`
	display: flex;
	height: auto;
	justify-content: center;
`;

const Logo = styled.img`
	position: absolute;
	top: 30px;
	left: 50%;
	transform: translate(-50%, 0);
`;

const templates = {
	London,
	Sydney,
};

export default function SharePage() {
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
				<Logo src="/images/logo/logo.png" />
				<Template pageFrom="share" />
			</Body>
		</Root>
	);
}
