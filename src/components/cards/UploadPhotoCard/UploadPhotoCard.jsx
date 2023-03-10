import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1; }
`;

const rollingIn = keyframes`
	0% { opacity: 0; top:40%; }
	100% { opacity: 1; top:50%; }
`;

const CardBackground = styled.div`
	z-index: 10;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgb(0, 0, 0, 0.7);
	animation: ${fadeIn} 0.3s forwards;
`;

const Card = styled.div`
	z-index: 11;
	width: 680px;
	height: 680px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: ${(props) => props.theme.color.beige[100]};
	border-radius: 10px;
	animation: ${rollingIn} 0.4s forwards;
	color: ${(props) => props.theme.color.neutral[50]};
`;

const PreviewArea = styled.div`
	width: 680px;
	height: 480px;
	border: 1px solid #fff;
	position: relative;
`;

const BackgroundCanvas = styled.canvas`
	width: 680px;
	height: 480px;
`;

const CropCanvas = styled.canvas`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 5px;
	border: 1px solid #fff;
	pointer-events: none;
`;

const ZoomArea = styled.div`
	position: absolute;
	height: 240px;
	width: 80px;
	top: 100px;
	right: 100px;
	border: 1px solid #fff;
	pointer-events: none;
`;

const StraightenArea = styled.div`
	position: absolute;
	height: 80px;
	width: 100%;
	bottom: 150px;
	/* border: 1px solid #fff; */
	margin: 0 auto;
	padding: 0px 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Rotate90Degree = styled.div`
	${(props) => props.theme.font.itemBold};
	width: 30px;
	transition: all 0.3s;
	cursor: pointer;

	&:hover {
		filter: brightness(1.4);
		transition: all 0.3s;
	}
`;

const NegativeIcon = styled.img`
	width: 100%;
`;

const PositiveIcon = styled.img`
	width: 100%;
	transform: scaleX(-1);
`;

const CustomRotate = styled.div`
	width: 350px;
	height: 100%;
	border: 1px solid #fff;
`;

const FunctionTitleArea = styled.div`
	position: absolute;
	height: 70px;
	width: 100%;
	bottom: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* border: 1px solid #fff; */
`;

const FunctionTitle = styled.div`
	height: 70px;
	width: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 3px solid ${(props) => props.theme.color.blue[50]};
	color: ${(props) => props.theme.color.neutral[30]};
`;

const BottomFunction = styled.div`
	position: absolute;
	height: 70px;
	width: 100%;
	bottom: 0px;
	border-top: 1px solid ${(props) => props.theme.color.neutral[80]};
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;

const ButtonIcon = styled.img`
	width: 20px;
`;

const Upload = styled.div`
	${(props) => props.theme.font.itemBold};
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s;
	cursor: pointer;

	&:hover {
		filter: brightness(1.4);
		transition: all 0.3s;
	}
`;

const UploadInput = styled.input`
	display: none;
`;

const UploadText = styled.div`
	margin-left: 10px;
`;

const Save = styled.div`
	${(props) => props.theme.font.itemBold};
	width: 120px;
	height: 35px;
	background-color: ${(props) => props.theme.color.blue[50]};
	color: #fff;
	cursor: pointer;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.3s;

	&:hover {
		transition: all 0.3s;
		background-color: ${(props) => props.theme.color.blue[60]};
	}
`;

ConfirmCard.propTypes = {
	setIsClickEditButton: PropTypes.func,
	setUploadedImg: PropTypes.func,
	uploadedImg: PropTypes.string,
};

export default function ConfirmCard({
	setIsClickEditButton,
	setUploadedImg,
	uploadedImg,
}) {
	//???????????? input ??????
	const handleUploadClick = () => {
		uploadInputRef.current.click();
	};

	//??????????????????????????????
	const handleImgUpload = (e) => {
		const url = URL.createObjectURL(e.target.files[0]);
		setUploadedImg(url);
		// const canvas = backgroundCanvasRef.current;
		// const ctx = canvas.getContext("2d");
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	const uploadInputRef = useRef(null);
	const backgroundCanvasRef = useRef(null);
	const [dragging, setDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [translate, setTranslate] = useState({ x: 0, y: 0 });

	//??????????????????????????????????????????????????????????????????????????????????????????
	const handleMouseDown = (event) => {
		setDragging(true);
		setDragStart({
			x: event.clientX - translate.x,
			y: event.clientY - translate.y,
		});
	};

	//????????????????????????
	const handleMouseUp = () => {
		setDragging(false);
	};

	//?????????????????????????????????????????? Translate??????????????????????????????????????????
	const handleMouseMove = (event) => {
		console.log(dragging);
		if (!dragging) return;
		setTranslate({
			x: event.clientX - dragStart.x,
			y: event.clientY - dragStart.y,
		});
	};

	//????????????????????? translate ?????????
	useEffect(() => {
		//????????????
		const canvas = backgroundCanvasRef.current;
		const ctx = canvas.getContext("2d");

		//??????????????????????????? (x, y, ????????????)
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//???????????????????????????
		const image = new Image();
		image.src = uploadedImg;

		let canvasImageWidth = 480;
		let canvasImageHeight = 480;
		image.onload = () => {
			const imageAspectRatio = image.naturalWidth / image.naturalHeight;

			//???????????????????????? 480px ??????????????????????????????
			if (imageAspectRatio > 1) {
				canvasImageWidth = canvasImageHeight * imageAspectRatio;
			} else {
				canvasImageHeight = canvasImageWidth / imageAspectRatio;
			}

			//??????????????????????????????
			ctx.save();

			//????????????????????????????????????????????????????????????????????????
			ctx.translate(translate.x, translate.y);

			// ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
			ctx.drawImage(
				image,
				canvas.width / 2 - canvasImageWidth / 2,
				canvas.height / 2 - canvasImageHeight / 2,
				canvasImageWidth,
				canvasImageHeight
			);

			// ???????????????????????????
			ctx.restore();
		};
	}, [uploadedImg, translate]);

	return (
		<>
			<CardBackground
				onClick={(e) => {
					e.nativeEvent.stopImmediatePropagation();
					setIsClickEditButton(false);
				}}></CardBackground>
			<Card>
				<PreviewArea>
					{/* <img alt="userPhoto" src={uploadedImg} /> */}
					<CropCanvas width="240px" height="240px" />
					<BackgroundCanvas
						width="1360px"
						height="960px"
						ref={backgroundCanvasRef}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						onMouseMove={handleMouseMove}
					/>
				</PreviewArea>
				<ZoomArea></ZoomArea>
				<StraightenArea>
					<Rotate90Degree>
						-90??
						<NegativeIcon src="/images/icon/rotate.png" />
					</Rotate90Degree>
					<CustomRotate></CustomRotate>
					<Rotate90Degree>
						+90??
						<PositiveIcon src="/images/icon/rotate.png" />
					</Rotate90Degree>
				</StraightenArea>
				<FunctionTitleArea>
					{" "}
					<FunctionTitle>Crop & Rotate</FunctionTitle>
				</FunctionTitleArea>
				<BottomFunction>
					<Upload onClick={handleUploadClick}>
						<ButtonIcon src="/images/icon/upload.png" />{" "}
						<UploadText>Upload New</UploadText>
						<UploadInput
							type="file"
							onChange={handleImgUpload}
							ref={uploadInputRef}
						/>
					</Upload>
					<Save>Save Changes</Save>
				</BottomFunction>
			</Card>
		</>
	);
}
