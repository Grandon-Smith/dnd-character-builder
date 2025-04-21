import { useUserDataStore } from "../store.js";
import router from "../router/router.js";

const DOMAIN = "http://localhost:3000";

export const authServices = {
	handleLogin: async (data) => {
		const { email, password } = data;
		const STORE = useUserDataStore();
		const OPTIONS = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include", // Necessary for cookies
			body: JSON.stringify({ email, password }),
		};

		try {
			const res = await fetch(
				"http://localhost:3000/api/auth/login",
				OPTIONS
			);
			const data = await res.json();
			if (res.ok && res.status === 200) {
				STORE.user = data.user;
				STORE.token = data.token;
				localStorage.setItem("token", data.token);
				router.push("/choose-character");
			} else {
				const errorData = await res.json();
				STORE.setErrorMsg(res.errorMsg);
				throw new Error(errorData.message || "Login failed");
			}

			STORE.fetchingData = false;
			return data;
		} catch (error) {
			throw error.message;
		}
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
