import { useStore } from "../store.js";
import router from "../router/router.js";

const API_URL =
	import.meta.VITE_API_URL_DEV || "http://localhost:3000/api/auth";

export const authServices = {
	handleLogin: async (options) => {
		const store = useStore();
		store.setFetchingData(true);

		await fetch(API_URL + "/login", options)
			.then((res) => res.json().then((data) => ({ raw: res, data })))
			.then(({ raw, data }) => {
				// data = parsed JSON body    raw = original response with status, ok, etc.
				setTimeout(() => {
					if (raw.ok && (raw.status === 200 || raw.status === 201)) {
						store.user = {
							username: data.user,
							email: data.email,
							id: data.id,
						};
						localStorage.setItem("token", data.token);

						router.push("/choose-character");
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

	handleMakeNewUser: async (options) => {
		const store = useStore();

		store.setFetchingData(true);
		await fetch(API_URL + "/newUser", options)
			.then((res) => res.json())
			.then((res) => {
				console.log("new user res", res);
				setTimeout(() => {
					if (res.ok && res.status === 201) {
						store.user = data.user;
						router.push("/choose-character");
					} else {
						store.setErrorMsg(res.errorMsg);
					}
				}, 1000);
			})
			.catch((err) => console.warn(err));
		store.setFetchingData();
	},
};
