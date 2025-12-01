import { defineStore } from "pinia";

console.log("Store Initialized");
export const useStore = defineStore("store", {
	state: () => ({
		userData: null,
		fetchingData: false,
		selectedCharacter: null,
		appKey: 0,
		errorMsg: "",
		user: {},
		token: localStorage.getItem("token") || null,
		skillsList: {
			acrobatics: "dexterity",
			animalHandling: "wisdom",
			arcana: "intelligence",
			athletics: "strength",
			deception: "charisma",
			history: "intelligence",
			insight: "wisdom",
			intimidation: "charisma",
			investigation: "intelligence",
			medicine: "wisdom",
			nature: "intelligence",
			perception: "wisdom",
			performance: "charisma",
			persuasion: "charisma",
			religion: "intelligence",
			sleightOfHand: "dexterity",
			stealth: "dexterity",
			survival: "wisdom",
		},
		abilitiesList: [
			"strength",
			"dexterity",
			"constitution",
			"intelligence",
			"wisdom",
			"charisma",
		],
		classesList: [
			"barbarian",
			"bard",
			"cleric",
			"druid",
			"fighter",
			"monk",
			"paladin",
			"ranger",
			"rogue",
			"sorcerer",
			"warlock",
			"wizard",
		],
	}),

	getters: {
		isFetching(state) {
			return state.fetchingData;
		},
		selectedCharacterData(state) {
			return state.selectedCharacter;
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

		setSelectedCharacter(id) {
			if (id && typeof id === "string") {
				this.selectedCharacter = this.userData.characters.find(
					(c) => c._id === id
				);
			}
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
