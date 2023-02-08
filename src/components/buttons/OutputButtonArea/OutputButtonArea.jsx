import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const OutputButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const DownloadPdfButton = styled.div`
	width: 130px;
	height: 40px;
	border-radius: 5px;
	cursor: ${(props) =>
		props.isDownloading === true ? "default" : "pointer"};
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	${(props) => props.theme.font.itemBold};
	margin-left: 20px;
	background-color: ${(props) =>
		props.isDownloading === true
			? props.theme.color.blue[60]
			: props.theme.color.blue[50]};
	transition: background-color 0.3s;

	&:hover {
		transition: background-color 0.3s;
		background-color: ${(props) => props.theme.color.blue[60]};
	}
`;

const ShareLinkButton = styled.div`
	width: 130px;
	height: 40px;
	border-radius: 5px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	${(props) => props.theme.font.itemBold};
	margin-left: 20px;
	background-color: ${(props) => props.theme.color.blue[50]};
	transition: background-color 0.3s;

	&:hover {
		transition: background-color 0.3s;
		background-color: ${(props) => props.theme.color.blue[60]};
	}
`;

OutputButtonArea.propTypes = {
	handleDownloadPdf: PropTypes.func,
	isDownloading: PropTypes.bool,
};

export default function OutputButtonArea({ handleDownloadPdf, isDownloading }) {
	return (
		<OutputButtonContainer>
			<DownloadPdfButton
				onClick={handleDownloadPdf}
				isDownloading={isDownloading}>
				{isDownloading === false ? "Download PDF" : "Downloading..."}
			</DownloadPdfButton>
			<ShareLinkButton>Share Link</ShareLinkButton>
		</OutputButtonContainer>
	);
}
