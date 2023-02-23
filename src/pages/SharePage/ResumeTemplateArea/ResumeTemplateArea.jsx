import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
	updateTemplate,
	updateTemplateColor,
} from "../../../redux/slices/formDataSlice";
import { templateOrder } from "../../../utils/misc/templatePreviewOrder";

const ResumeTempBackground = styled.div`
	width: 15%;
	height: 100%;
	position: fixed;
	top: 0px;
	left: 0px;
	border-right: 1px solid ${(props) => props.theme.color.neutral[60]};
	background-color: ${(props) => props.theme.color.neutral[70]};
	padding-top: 60px;
	overflow-y: auto;
	scrollbar-gutter: stable;

	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-track {
		background: none;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}
`;

const TempCollectionsArea = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px 30px;
`;

const Template = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 40px;
`;

const Preview = styled.div`
	width: 90%;
	height: 0;
	padding-bottom: calc(90% / 0.707);
	background-color: #fff;
	margin-bottom: 10px;
	border-radius: 5px;
	box-sizing: content-box;
	outline: 5px solid rgb(0, 0, 0, 0);
	transition: outline 0.2s;
	cursor: pointer;
	position: relative;
	outline: 5px solid
		${(props) =>
			props.status === true ? props.theme.color.blue[50] : "none"};

	&:hover {
		transition: outline 0.2s;
		outline: 5px solid ${(props) => props.theme.color.blue[50]};
	}
`;

const PreviewImage = styled.img`
	width: 100%;
`;

const CurrentTemp = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 100%;
	width: calc(20% * 1.414);
	height: 20%;
	background-color: ${(props) => props.theme.color.blue[50]};
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: ${(props) => (props.status === true ? "1" : "0")};
	transition: all 0.3s;
`;

const CurrenTempIcon = styled.img`
	width: 50%;
`;

const Name = styled.div`
	${(props) => props.theme.font.content};
	color: #fff;
`;

const RenderTemplate = () => {
	const currentTemplate = useSelector((state) => state.formData.template);
	const dispatch = useDispatch();

	return templateOrder.map((template, index) => {
		const status = template.template === currentTemplate ? true : false;

		return (
			<Template key={index}>
				<Preview
					status={status}
					onClick={() => {
						dispatch(
							updateTemplate({ templateName: template.template })
						);
						dispatch(
							updateTemplateColor({ color: template.color })
						);
					}}>
					<PreviewImage src={template.url} />
					<CurrentTemp status={status}>
						<CurrenTempIcon src="/images/icon/check.png" />
					</CurrentTemp>
				</Preview>
				<Name>{template.template}</Name>
			</Template>
		);
	});
};

export default function ResumeTemplateArea() {
	return (
		<>
			<ResumeTempBackground>
				<TempCollectionsArea>
					<RenderTemplate />
				</TempCollectionsArea>
			</ResumeTempBackground>
		</>
	);
}
