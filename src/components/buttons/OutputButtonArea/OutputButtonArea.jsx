import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

import ShareLinkCard from "../../cards/ShareLinkCard";
import { DefaultButtonStyle } from "../button.style";

const OutputButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const DownloadPdfButton = styled.div`
	${DefaultButtonStyle}
	margin-right: 10px;
	background-color: ${(props) =>
		props.isDownloading === true
			? props.theme.color.blue[60]
			: props.theme.color.blue[50]};
	cursor: ${(props) =>
		props.isDownloading === true ? "default" : "pointer"};
`;

const MoreButton = styled.div`
	${DefaultButtonStyle}
	width: 50px;
	position: relative;

	background-color: ${(props) =>
		props.isClickMoreButton ? "#1170cd" : "#1a91f0"};
`;

const fadeIn = keyframes`
	0% { opacity: 0; scale:0; }
	100% { opacity: 1; scale:1;}
`;

const Menu = styled.div`
	${(props) => props.theme.font.lightButton};
	height: 50px;
	width: 150px;
	color: #000;
	background-color: #fff;
	padding: 0px 15px;
	position: absolute;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	border-radius: 10px;
	border: 1px solid ${(props) => props.theme.color.neutral[10]};
	box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.2);
	animation: ${fadeIn} 0.3s forwards;
	z-index: 11;
	bottom: 50px;
	right: 0;
	transition: all 0.3s;

	${(props) =>
		props.isChoosingTemp &&
		`
		top: 50px;
	`};

	&:hover {
		transition: all 0.3s;
		color: ${(props) => props.theme.color.blue[50]};
	}
`;

const ShareIcon = styled.img`
	width: 15px;
	margin-right: 10px;
`;

OutputButtonArea.propTypes = {
	handleDownloadPdf: PropTypes.func,
	isDownloading: PropTypes.bool,
	isChoosingTemp: PropTypes.bool,
};

export default function OutputButtonArea({
	handleDownloadPdf,
	isDownloading,
	isChoosingTemp,
}) {
	const MoreButtonRef = useRef();
	const [isClickMoreButton, setIsClickMoreButton] = useState(false);
	const [isClickShareLink, setIsClickShareLink] = useState(false);
	const { resumeId } = useParams();

	const handleMoreButtonClick = () => {
		setIsClickMoreButton(!isClickMoreButton);
	};

	useEffect(() => {
		if (MoreButtonRef.current === null) {
			return;
		}
		window.addEventListener("click", (e) => {
			if (e.target === null) return;
			if (!MoreButtonRef.current) return;
			if (!MoreButtonRef.current.contains(e.target)) {
				setIsClickMoreButton(false);
			}
		});
	}, [MoreButtonRef]);

	return (
		<OutputButtonContainer>
			<DownloadPdfButton
				onClick={handleDownloadPdf}
				isDownloading={isDownloading}>
				{isDownloading === false ? "Download PDF" : "Downloading..."}
			</DownloadPdfButton>
			<MoreButton
				ref={MoreButtonRef}
				onClick={handleMoreButtonClick}
				isClickMoreButton={isClickMoreButton}>
				⋯
				{isClickMoreButton && (
					<Menu
						isChoosingTemp={isChoosingTemp}
						onClick={() => {
							setIsClickShareLink(true);
						}}>
						{" "}
						<ShareIcon src="/images/icon/link.png" />
						Share Link
					</Menu>
				)}
			</MoreButton>
			{isClickShareLink && (
				<ShareLinkCard
					shareResumeId={resumeId}
					setIsClickShareLink={setIsClickShareLink}
				/>
			)}
		</OutputButtonContainer>
	);
}
