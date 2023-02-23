import { useEffect } from "react";

export default function useCropUserPhoto(
	photoUrl,
	canvasRef,
	setCroppedUserPhotoUrl
) {
	//針對兩次渲染的圖片尺寸進行設定
	useEffect(() => {
		if (photoUrl === undefined) return;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const img = new Image();
		let photoSize = 220;
		let imgRatio;
		img.crossOrigin = "Anonymous"; //讓照片不受同源限制
		img.onload = () => {
			//調整圖片尺寸，最短邊符合 55px爲比例計算
			imgRatio = img.width / img.height;
			let imageWidth = photoSize;
			let imageHeight = photoSize;
			if (img.width < img.height) {
				imageHeight = photoSize / imgRatio;
			} else {
				imageWidth = photoSize * imgRatio;
			}

			//讓畫布尺寸跟圖片一樣大
			canvas.width = imageWidth;
			canvas.height = imageHeight;
			ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

			// 計算要裁切的區域
			//裁切的起始點就是最長邊扣除最短邊的距離後除以 2
			let x = 0;
			let y = 0;
			let size = 0;
			if (imageWidth < imageHeight) {
				size = imageWidth;
				y = (imageHeight - size) / 2;
			} else {
				size = imageHeight;
				x = (imageWidth - size) / 2;
			}

			// 裁切畫布
			const imageData = ctx.getImageData(x, y, size, size);
			canvas.width = size;
			canvas.height = size;
			ctx.putImageData(imageData, 0, 0);

			console.log(photoUrl);
			//轉換成圖片
			const dataURL = canvas.toDataURL();
			setCroppedUserPhotoUrl(dataURL);
		};
		img.src = photoUrl;
	}, [photoUrl, canvasRef, setCroppedUserPhotoUrl]);
}
