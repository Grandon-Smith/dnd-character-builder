import { defineStore } from "pinia";

console.log("Store Initialized");
export const useStore = defineStore("store", {
	state: () => ({
		userData: null,
		fetchingData: false,
		selectedCharacterIndex: 0,
		appKey: 0,
		errorMsg: "",
		user: {},
		token: localStorage.getItem("token") || null,
	}),
	getters: {
		charData(state) {
			return state.userData.characters[state.selectedCharacterIndex];
		},

		isFetching(state) {
			return state.fetchingData;
		},
	},
	actions: {
		incrementAppKey() {
			++this.appKey;
		},
		setErrorMsg(msg) {
			this.errorMsg = msg;
		},

		setFetchingData(value = false) {
			this.fetchingData = value;
		},
		setMockData() {
			this.userData = {
				name: "Dungeon Daddy",
				email: "fakeuser@gmail.com",
				id: "02934jfljklfa",
				characters: [],
			};
		},

		saveNewCharacterLocally(characterData) {
			this.userData.characters.push(characterData);
		},

		async login(email, password) {
			try {
				const response = await fetch(
					"http://localhost:3000/api/auth/login",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						credentials: "include", // Necessary for cookies
						body: JSON.stringify({ email, password }),
					}
				);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || "Login failed");
				}

				const data = await response.json();
				this.user = data.user;
				this.token = data.token;
				localStorage.setItem("token", this.token);

				return data;
			} catch (error) {
				throw error.message;
			}
		},
		async fetchProfile() {
			try {
				const response = await fetch(
					"http://localhost:3000/api/auth/profile",
					{
						method: "GET",
						headers: { Authorization: `Bearer ${this.token}` },
						credentials: "include",
					}
				);

				if (!response.ok) throw new Error("Unauthorized");

				const data = await response.json();
				console.log("user", data);
				this.user = {
					username: data.user.username,
					email: data.user.email,
					id: data.user._id,
				};
			} catch {
				this.user = null;
				this.token = null;
				localStorage.removeItem("token");
			}
		},
		async logout() {
			try {
				await fetch("http://localhost:3000/api/auth/logout", {
					method: "POST",
					credentials: "include",
				});
			} catch (error) {
				console.error("Logout failed:", error);
			} finally {
				this.user = null;
				this.token = null;
				localStorage.removeItem("token");
			}
		},
	},
});
