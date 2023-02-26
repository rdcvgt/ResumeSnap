import {
	ref,
	getDownloadURL,
	uploadBytes,
	deleteObject,
	listAll,
} from "firebase/storage";
import { storage } from "./firebaseInit";
import "firebase/storage";

export function uploadUserPhoto(newFile, resumeId) {
	const storageRef = ref(storage, `userPhoto/${newFile.name}`);

	//將上傳的照片取得照片網址，並回傳 promise
	const promise = uploadBytes(storageRef, newFile).then((snapshot) => {
		return getDownloadURL(snapshot.ref).then((downloadURL) => {
			return downloadURL;
		});
	});
	return promise;
}

export function deleteUserPhoto(photoName) {
	const deleteRef = ref(storage, `userPhoto/${photoName}`);

	//將上傳的照片取得照片網址，並回傳 promise
	const result = deleteObject(deleteRef)
		.then(() => {
			return true;
		})
		.catch((error) => {
			console.log(error);
			return false;
		});

	return result;
}

export function uploadResumePreview(uid, resumeId, blob) {
	if (!uid) return;
	const storageRef = ref(storage, `/resumesPreview/${uid}/${resumeId}`);
	uploadBytes(storageRef, blob);
}

//傳遞履歷預覽的照片連結
export function getResumePreview(uid) {
	const userResumesRef = ref(storage, `/resumesPreview/${uid}`);

	//listAll 爲 promise
	return listAll(userResumesRef).then((list) => {
		//使用 map 來製作 promises 陣列，蒐集 getDownloadURL API promise
		const promises = list.items.map((itemRef) => {
			// getDownloadURL 爲 promise
			return getDownloadURL(itemRef).then((url) => {
				//回傳一個物件
				return { name: itemRef.name, url: url };
			});
		});

		//將 promises 全部一起 resolve
		return Promise.all(promises).then((results) => {
			//定義 resumePreviewList 空物件
			const resumePreviewList = {};

			//results 爲 promise(來自 getDownloadURL)
			results.forEach((result) => {
				resumePreviewList[result.name] = result.url;
			});
			//回傳 resumePreviewList 物件
			return resumePreviewList;
		});
	});
}

export function deleteResumePreview(uid, resumeId) {
	const deleteRef = ref(storage, `/resumesPreview/${uid}/${resumeId}`);

	//將上傳的照片取得照片網址，並回傳 promise
	const result = deleteObject(deleteRef)
		.then(() => {
			return true;
		})
		.catch((error) => {
			console.log(error);
			return false;
		});

	return result;
}
