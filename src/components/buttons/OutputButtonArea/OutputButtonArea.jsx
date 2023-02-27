import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import ShareLinkCard from "../../cards/ShareLinkCard";
import { DefaultButtonStyle } from "../button.style";

const OutputButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const DownloadPdfButton = styled.div`
	${DefaultButtonStyle}
	margin-right: 20px;
	background-color: ${(props) =>
		props.isDownloading === true
			? props.theme.color.blue[60]
			: props.theme.color.blue[50]};
	cursor: ${(props) =>
		props.isDownloading === true ? "default" : "pointer"};
`;

const ShareLinkButton = styled.div`
	${DefaultButtonStyle}
`;

OutputButtonArea.propTypes = {
	handleDownloadPdf: PropTypes.func,
	isDownloading: PropTypes.bool,
};

export default function OutputButtonArea({ handleDownloadPdf, isDownloading }) {
	const [isClickShareLink, setIsClickShareLink] = useState(false);
	const { resumeId } = useParams();

	return (
		<OutputButtonContainer>
			<DownloadPdfButton
				onClick={handleDownloadPdf}
				isDownloading={isDownloading}>
				{isDownloading === false ? "Download PDF" : "Downloading..."}
			</DownloadPdfButton>
			<ShareLinkButton
				onClick={() => {
					setIsClickShareLink(true);
				}}>
				Share Link
			</ShareLinkButton>
			{isClickShareLink && (
				<ShareLinkCard
					shareResumeId={resumeId}
					setIsClickShareLink={setIsClickShareLink}
				/>
			)}
		</OutputButtonContainer>
	);
}
