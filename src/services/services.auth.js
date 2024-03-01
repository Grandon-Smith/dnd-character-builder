import { useUserDataStore } from "../store";
import router from "../Router/router.js";

// Vue.use(router)

export const authServices = {
	handleLogin: async (OPTIONS) => {
		const store = useUserDataStore();
		console.log("login test", store);
		await fetch("http://localhost:3000/api/auth/login", OPTIONS)
			.then((res) => res.json())
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
		const router = useRouter();
		await fetch("http://localhost:3000/api/auth/newUser", OPTIONS)
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
