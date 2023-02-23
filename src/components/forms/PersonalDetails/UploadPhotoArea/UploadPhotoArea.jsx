import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { updateInputData } from "../../../../redux/slices/formDataSlice";
import {
	uploadUserPhoto,
	deleteUserPhoto,
} from "../../../../utils/firebase/storage";

const UploadPhoto = styled.div`
	display: flex;
	align-items: center;
	margin-top: 19px;
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

UploadPhotoArea.propTypes = {
	photoUrl: PropTypes.string,
	photoName: PropTypes.string,
};

export default function UploadPhotoArea({ photoUrl, photoName }) {
	const { resumeId } = useParams();
	const dispatch = useDispatch();
	const uploadInputRef = useRef(null);

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
		});
	};

	const handleUploadPhoto = (e) => {
		const file = e.target.files[0];
		const fileType = file.name.split(".")[1];
		const newFileName = resumeId + "." + fileType;
		const newFile = new File([file], newFileName, { type: file.type });

		const photoUrlPromise = uploadUserPhoto(newFile, resumeId);
		photoUrlPromise.then((url) => {
			dispatch(
				updateInputData({
					blockName: "PersonalDetails",
					inputTitle: "photo",
					inputValue: { name: newFileName, url },
				})
			);
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
		};
		img.src = photoUrl;
	}, [photoUrl]);

	const [style, setStyle] = useState({});

	return (
		<>
			<UploadPhoto>
				<PhotoPreviewArea>
					{!photoUrl && <PhotoDefault src="/images/icon/user.png" />}
					{photoUrl && <PhotoPreview src={photoUrl} style={style} />}
				</PhotoPreviewArea>
				<PhotoButtonArea>
					<PhotoButton onClick={handleUploadButtonClick}>
						<ButtonIcon src="/images/icon/edit.png" />
						<EditButtonText>Edit photo</EditButtonText>
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
