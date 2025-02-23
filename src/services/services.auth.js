import { useUserDataStore } from "../store";
import router from "../router/router.js";

const DOMAIN = "http://localhost:3000";

// Vue.use(router)

export const authServices = {
	handleLogin: async (OPTIONS) => {
		const store = useUserDataStore();
		await fetch(DOMAIN + "/api/auth/login", OPTIONS)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setTimeout(() => {
					if (res.ok && res.status === 200) {
						router.push("/choose-character");
					} else {
						store.setErrorMsg(res.errorMsg);
					}
					store.fetchingData = false;
				}, 1000);
			})
			.catch((err) => console.warn(err));
	},

	handleMakeNewUser: async (OPTIONS) => {
		const store = useUserDataStore();
		await fetch(DOMAIN + "/api/auth/newUser", OPTIONS)
			.then((res) => res.json())
			.then((res) => {
				setTimeout(() => {
					if (res.ok && res.status === 201) {
						router.push("/choose-character");
					} else {
						store.setErrorMsg(res.errorMsg);
					}
					store.fetchingData = false;
				}, 1000);
			})
			.catch((err) => console.warn(err));
	},
};
