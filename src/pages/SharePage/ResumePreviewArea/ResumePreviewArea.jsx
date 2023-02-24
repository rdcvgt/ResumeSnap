import React, { useState, useContext, createContext, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";

import London from "../../../components/template/London";
import Sydney from "../../../components/template/Sydney";
import OutputButtonArea from "../../../components/buttons/OutputButtonArea";

const ResumePreviewBackground = styled.div`
	position: fixed;
	top: 0px;
	right: 0px;
	width: ${(props) => (props.isChoosingTemp === true ? "85%" : "50%")};
	height: 100%;
	background-color: ${(props) =>
		props.isChoosingTemp === true
			? props.theme.color.neutral[70]
			: props.theme.color.neutral[60]};
	padding-top: ${(props) => (props.isChoosingTemp === true ? "60px" : "0")};
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

const ResumePreviewInfo = styled.div`
	width: 80%;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const ResumePreview = styled.div`
	height: 0;
	width: ${(props) => (props.isChoosingTemp === true ? "60%" : "80%")};
	padding-bottom: ${(props) =>
		props.isChoosingTemp === true
			? "calc(60% / 0.707)"
			: "calc(80% / 0.707)"};
	background-color: #fff;
	border-radius: 10px;
	overflow: hidden;
	margin: 20px auto;
	position: relative;
`;

ResumePreviewArea.propTypes = {
	choosingTempState: PropTypes.object,
	handleGetDownLoadPdfFunc: PropTypes.func,
	handleDownloadPdf: PropTypes.func,
	isDownloadingState: PropTypes.object,
};

const templates = {
	London,
	Sydney,
};

export default function ResumePreviewArea() {
	const currentTemplate = useSelector((state) => state.formData.template);
	const Template = useMemo(() => {
		return templates[currentTemplate];
	}, [currentTemplate]);

	return (
		<>
			<ResumePreviewBackground>
				<ResumePreviewInfo>
					<ResumePreview>
						<Template pageFrom="share" />
					</ResumePreview>
				</ResumePreviewInfo>
			</ResumePreviewBackground>
		</>
	);
}
