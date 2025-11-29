import { useStore } from "../store.js";
import router from "../router/router.js";

const API_PATH =
	import.meta.VITE_API_URL_DEV ||
	"http://localhost:3000/api/character";

export const characterServices = {
	createNewCharacter: async (options) => {
		const store = useStore();
		store.setFetchingData(true);
		console.log("creating character func", options);
		await fetch(API_PATH + "/create", options)
			.then((res) => res.json().then((data) => ({ raw: res, data })))
			.then(({ raw, data }) => {
				// data = parsed JSON body    raw = original response with status, ok, etc.
				setTimeout(() => {
					if (raw.ok && (raw.status === 200 || raw.status === 201)) {
						console.log("new char res", data);
						store.saveNewCharacterLocally(data);
						// router.push("/choose-character");
					} else {
						console.log("error~!!");
						store.setErrorMsg(data.message);
					}
				}, 2000);
			})
			.catch((err) => {
				console.warn(err);
				throw err.message;
			});
		store.setFetchingData();
	},
	getAllCharactersForUser: async (options) => {
		const store = useStore();
		store.setFetchingData(true);
		console.log("getting all characters", options);
		await fetch(API_PATH + "/get-all")
			.then((res) => res.json().then((data) => ({ raw: res, data })))
			.then(({ raw, data }) => {
				// data = parsed JSON body    raw = original response with status, ok, etc.
				setTimeout(() => {
					if (raw.ok && (raw.status === 200 || raw.status === 201)) {
						console.log("all characters:", data);
						store.userData.characters = data;
						// router.push("/choose-character");
					} else {
						console.log("error~!!");
						store.setErrorMsg(data.message);
					}
				}, 2000);
			})
			.catch((err) => {
				console.warn(err);
				throw err.message;
			});
		store.setFetchingData();
	},
};
