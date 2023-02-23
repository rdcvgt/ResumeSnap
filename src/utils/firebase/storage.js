import {
	ref,
	getDownloadURL,
	uploadBytes,
	deleteObject,
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
