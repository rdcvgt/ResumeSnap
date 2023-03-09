import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../../../utils/firebase/firebaseInit";
import { updateInputData } from "../../../../redux/reducers/formDataReducer";
import { updateUserInfoToDatabase } from "../../../../redux/reducers/userInfoReducer";
import {
	uploadUserPhoto,
	deleteUserPhoto,
} from "../../../../utils/firebase/storage";

import { MEDIA_QUERY_MD } from "../../../../utils/style/breakpotins";

const UploadPhoto = styled.div`
	display: flex;
	align-items: center;
	margin-top: 19px;

	${MEDIA_QUERY_MD} {
		margin: 20px 0px;
	}
`;

const PhotoPreviewArea = styled.div`
	height: 50px;
	width: 50px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.color.neutral[10]};
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 20px;
	overflow: hidden;
`;
const PhotoDefault = styled.img`
	width: 50px;
	opacity: 0.3;
	transition: all 0.3s;
	cursor: pointer;
`;

const PhotoPreview = styled.img`
	width: 50px;
`;

const PhotoButtonArea = styled.div``;

const PhotoButton = styled.div`
	${(props) => props.theme.input.title};
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: all 0.3s;
	&:nth-child(1) {
		margin-bottom: 10px;
	}
`;

const UploadInput = styled.input`
	display: none;
`;

const EditButtonText = styled.div`
	transition: all 0.3s;
	&:hover {
		color: ${(props) => props.theme.color.blue[50]};
		transition: all 0.3s;
	}
`;

const DeleteButtonText = styled.div`
	transition: all 0.3s;
	&:hover {
		color: ${(props) => props.theme.color.red[60]};
		transition: all 0.3s;
	}
`;

const ButtonIcon = styled.img`
	width: 18px;
	margin-right: 10px;
`;

const LoadingRingArea = styled.div`
	display: flex;
	justify-content: center;
	z-index: 1;
`;

const spin = keyframes` 
  0% { 
		transform: rotate(0deg); 
	}
  100% { transform: rotate(360deg); }
`;

const LoadingRing = styled.div`
	border: 4px solid ${(props) => props.theme.color.neutral[10]};
	border-top: 4px solid ${(props) => props.theme.color.neutral[30]}; /* Blue */
	border-radius: 50%;
	width: 30px;
	height: 30px;
	animation: ${spin} 0.3s linear infinite;
`;

UploadPhotoArea.propTypes = {
	photoUrl: PropTypes.string,
	photoName: PropTypes.string,
};

export default function UploadPhotoArea({ photoUrl, photoName }) {
	const { resumeId } = useParams();
	const dispatch = useDispatch();
	const uploadInputRef = useRef(null);
	const photoResumeId = useSelector((state) => state.userInfo.photoResumeId);
	const [style, setStyle] = useState({});
	const [uid, setUid] = useState(null);
	const [isUploading, setIsUploading] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const userId = user.uid;
				setUid(userId);
			}
		});
	}, []);

	const handleUploadButtonClick = () => {
		uploadInputRef.current.click();
	};

	const handleDeletePhotoButtonClick = () => {
		const deletePhotoResultPromise = deleteUserPhoto(photoName);

		deletePhotoResultPromise.then((result) => {
			if (result) {
				dispatch(
					updateInputData({
						blockName: "PersonalDetails",
						inputTitle: "photo",
						inputValue: null,
					})
				);
			}
			if (photoUrl && photoResumeId === resumeId) {
				const userPhotoData = {
					photoUrl: null,
					photoResumeId: null,
				};
				dispatch(updateUserInfoToDatabase(uid, userPhotoData));
			}
		});
	};

	const handleUploadPhoto = (e) => {
		setIsUploading(true);
		//重新命名檔案爲 resumeId
		const file = e.target.files[0];
		const fileType = file.name.split(".")[1];
		const newFileName = resumeId + "." + fileType;
		const newFile = new File([file], newFileName, { type: file.type });

		//上傳檔案到資料庫並更新 formData
		const photoUrlPromise = uploadUserPhoto(newFile, resumeId);
		photoUrlPromise.then((url) => {
			dispatch(
				updateInputData({
					blockName: "PersonalDetails",
					inputTitle: "photo",
					inputValue: { name: newFileName, url },
				})
			);

			const userPhotoData = {
				photoUrl: url,
				photoResumeId: resumeId,
			};
			console.log(uid);
			dispatch(updateUserInfoToDatabase(uid, userPhotoData));
		});
	};

	//當照片載入時，判斷照片的寬高，以最短邊作爲 50px 的比例進行照片尺寸調整
	useEffect(() => {
		const img = new Image();
		img.onload = () => {
			const imgRatio = img.width / img.height;
			if (img.width < img.height) {
				const newHeight = 50 / imgRatio;
				setStyle({ width: "50px", height: `${newHeight}px` });
			} else {
				const newWidth = 50 * imgRatio;
				setStyle({ width: `${newWidth}px`, height: "50px" });
			}
			setIsUploading(false);
		};
		img.src = photoUrl;
	}, [photoUrl]);

	return (
		<>
			<UploadPhoto>
				<PhotoPreviewArea>
					{isUploading && (
						<LoadingRingArea>
							<LoadingRing />
						</LoadingRingArea>
					)}
					{!photoUrl && !isUploading && (
						<PhotoDefault src="/images/icon/user.png" />
					)}
					{photoUrl && !isUploading && (
						<PhotoPreview src={photoUrl} style={style} />
					)}
				</PhotoPreviewArea>
				<PhotoButtonArea>
					<PhotoButton onClick={handleUploadButtonClick}>
						<ButtonIcon src="/images/icon/upload.png" />
						<EditButtonText>Upload photo</EditButtonText>
						<UploadInput
							type="file"
							onChange={handleUploadPhoto}
							ref={uploadInputRef}
						/>
					</PhotoButton>
					<PhotoButton onClick={handleDeletePhotoButtonClick}>
						<ButtonIcon src="/images/icon/delete.png" />
						<DeleteButtonText>Delete</DeleteButtonText>
					</PhotoButton>
				</PhotoButtonArea>
			</UploadPhoto>
		</>
	);
}
