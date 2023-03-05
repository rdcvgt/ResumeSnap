import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import FirstRender from "./FirstRender";
import SecondRender from "./SecondRender";

import "../utils/htmlElement.css";
import PreloadArea from "../utils/PreloadArea";
import { ImgStyle, PreviewContainerStyle } from "../utils/template.style";

import usePreview from "../utils/hooks/usePreview";
import useDownloadPdf from "../utils/hooks/useDownloadPdf";
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
	const [blocks, setBlocks] = useState([]);
	const [imgUrl, setImgUrl] = useState("");
	const [uid, setUid] = useState(null);
	const pageRef = useRef([]);
	const { resumeId } = useParams();

	//獲取使用者登入 uid
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) return;
			const userId = user.uid;
			setUid(userId);
		});
	}, []);

	//將履歷的首頁預覽圖存入資料庫
	useSaveResumePreview(uid, resumeId, pageFrom, pageRef, blocks);

	//將履歷內容轉換成 png 檔並儲存到 state
	usePreview(pageRef, setImgUrl, currentPage, blocks);

	//更新 PDF 內容，回傳給父層，偵測點擊事件
	const downloadPdf = useDownloadPdf(pageRef, setIsDownloading, blocks);
	if (handleGetDownLoadPdfFunc) {
		handleGetDownLoadPdfFunc(downloadPdf);
	}

	//傳遞頁數資訊
	useEffect(() => {
		if (!getTotalPage) return;
		getTotalPage(blocks.length);
	}, [blocks]);

	return (
		<>
			<PreviewContainer>
				{!imgUrl && <PreloadArea />}
				{imgUrl && pageFrom === "edit" && (
					<Img src={imgUrl} alt="圖片" />
				)}
			</PreviewContainer>
			<TemplateRoot>
				<FirstRender setBlocks={setBlocks} />
				<SecondRender
					pageRef={pageRef}
					blocks={blocks}
					pageFrom={pageFrom}
				/>
			</TemplateRoot>
		</>
	);
}
