import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import FirstRender from "./FirstRender";
import SecondRender from "./SecondRender";

import "../utils/htmlElement.css";
import { ImgStyle, PreviewContainerStyle } from "../utils/template.style";
import PreloadArea from "../utils/PreloadArea";

import usePreview from "../utils/hooks/usePreview";
import useDownloadPdf from "../utils/hooks/useDownloadPdf";
import useCropUserPhoto from "../utils/hooks/useCropUserPhoto";
import useSaveResumePreview from "../utils/hooks/useSaveResumePreview";

import { auth } from "../../../utils/firebase/firebaseInit";

const TemplateRoot = styled.div`
	font-family: serif;
`;

const PreviewContainer = styled.div`
	${PreviewContainerStyle}
`;

const Img = styled.img`
	${ImgStyle}
`;

const Hide = styled.div`
	opacity: 0;
`;

RenderTemplate.propTypes = {
	pageFrom: PropTypes.string,
	handleGetDownLoadPdfFunc: PropTypes.func,
	getTotalPage: PropTypes.func,
	currentPage: PropTypes.number,
	setIsDownloading: PropTypes.func,
};

export default function RenderTemplate({
	pageFrom,
	handleGetDownLoadPdfFunc,
	getTotalPage,
	currentPage,
	setIsDownloading,
}) {
	const pageRef = useRef([]);
	const canvasRef = useRef();
	const { resumeId } = useParams();

	const [uid, setUid] = useState(null);
	const [imgUrl, setImgUrl] = useState("");
	const [croppedUserPhotoUrl, setCroppedUserPhotoUrl] = useState(null);
	const [leftAreaBlocks, setLeftAreaBlocks] = useState([]);
	const [rightAreaBlocks, setRightAreaBlocks] = useState([]);

	const formBlocks = useSelector((state) => state.formData.formBlocks);
	const photoUrl = formBlocks[0].content.inputData?.photo?.url;

	//獲取使用者登入 uid
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) return;
			const userId = user.uid;
			setUid(userId);
		});
	}, []);

	//將履歷內容轉換成 png 檔並儲存到 state
	usePreview(
		pageRef,
		setImgUrl,
		currentPage,
		leftAreaBlocks,
		rightAreaBlocks
	);

	//將履歷的首頁預覽圖存入資料庫
	useSaveResumePreview(
		uid,
		resumeId,
		pageFrom,
		pageRef,
		leftAreaBlocks,
		rightAreaBlocks
	);

	//使用 canvas 裁切使用者照片再轉回圖片
	useCropUserPhoto(photoUrl, canvasRef, setCroppedUserPhotoUrl);

	//下載 PDF，回傳給父層，偵測點擊事件
	const downloadPdf = useDownloadPdf(
		pageRef,
		setIsDownloading,
		leftAreaBlocks,
		rightAreaBlocks
	);

	if (handleGetDownLoadPdfFunc) {
		handleGetDownLoadPdfFunc(downloadPdf);
	}

	//回傳履歷頁數
	useEffect(() => {
		if (!getTotalPage) return;
		if (leftAreaBlocks.length >= rightAreaBlocks.length) {
			getTotalPage(leftAreaBlocks.length);
		} else {
			getTotalPage(rightAreaBlocks.length);
		}
	}, [leftAreaBlocks, rightAreaBlocks]);

	return (
		<>
			<PreviewContainer>
				{!imgUrl && <PreloadArea />}
				{imgUrl && pageFrom === "edit" && (
					<Img src={imgUrl} alt="圖片" />
				)}
			</PreviewContainer>

			<TemplateRoot>
				<SecondRender
					pageFrom={pageFrom}
					pageRef={pageRef}
					leftAreaBlocks={leftAreaBlocks}
					rightAreaBlocks={rightAreaBlocks}
				/>
				<FirstRender
					setLeftAreaBlocks={setLeftAreaBlocks}
					setRightAreaBlocks={setRightAreaBlocks}
					croppedUserPhotoUrl={croppedUserPhotoUrl}
				/>
				<Hide>
					<canvas ref={canvasRef}></canvas>
				</Hide>
			</TemplateRoot>
		</>
	);
}
