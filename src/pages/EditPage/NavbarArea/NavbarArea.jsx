import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const NavBar = styled.div`
	width: 100%;
	height: 60px;
	position: fixed;
	top: 0;
	left: 0;
	background-color: ${(props) => props.theme.color.neutral[100]};
	z-index: 1;
	padding: 10px 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const BackToEditorButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	${(props) => props.theme.font.content};
	color: #fff;
	width: 120px;
	height: 40px;
	border-radius: 20px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		transition: background-color 0.3s;
		background-color: rgb(256, 256, 256, 0.2);
	}
`;

const SelectColorArea = styled.div`
	display: flex;
	align-items: center;
`;

const Color = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 20px;
	border: 2px solid #ccc;
	background-color: #333;
	cursor: pointer;
	position: relative;
	margin-right: 10px;

	&::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 7px;
		height: 7px;
		border-radius: 5px;
		background-color: rgb(256, 256, 256, 0);
		transition: all 0.3s;
	}

	&:hover::before {
		transition: all 0.3s;
		background-color: rgb(256, 256, 256, 1);
	}
`;

const ButtonIcon = styled.img`
	width: 10px;
	margin-right: 10px;
`;

const OutputButtonArea = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const DownloadPdfButton = styled.div`
	width: 120px;
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
	width: 120px;
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

NavbarArea.propTypes = {
	handleDownloadPdf: PropTypes.func,
	isDownloading: PropTypes.bool,
	setIsChoosingTemp: PropTypes.func,
};

export default function NavbarArea({
	handleDownloadPdf,
	isDownloading,
	setIsChoosingTemp,
}) {
	return (
		<NavBar>
			<BackToEditorButton
				onClick={() => {
					setIsChoosingTemp(false);
				}}>
				<ButtonIcon src="/images/icon/left.png" />
				返回編輯器
			</BackToEditorButton>
			<SelectColorArea>
				<Color></Color>
				<Color></Color>
				<Color></Color>
				<Color></Color>
				<Color></Color>
			</SelectColorArea>
			<OutputButtonArea>
				<DownloadPdfButton
					onClick={handleDownloadPdf}
					isDownloading={isDownloading}>
					{isDownloading === false ? "下載 PDF" : "下載中..."}
				</DownloadPdfButton>
				<ShareLinkButton onClick={handleDownloadPdf}>
					分享履歷連結
				</ShareLinkButton>
			</OutputButtonArea>
		</NavBar>
	);
}
