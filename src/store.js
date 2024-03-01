import { defineStore } from "pinia";

export const useUserDataStore = defineStore("user", {
	state: () => ({
		userData: null,
		fetchingData: false,
		characterIdx: 0,
		appKey: 0,
		errorMsg: "",
		showFloatingNav: false,
	}),
	getters: {
		charData(state) {
			return state.userData.characters[state.characterIdx]
				.characterData;
		},

		isFetching(state) {
			return state.fetchingData;
		},
	},
	actions: {
		incrementAppKey() {
			console.log("ashfdkj");
			++this.appKey;
		},
		setErrorMsg(msg) {
			this.errorMsg = msg;
		},
		setMockData() {
			this.userData = {
				name: "Dungeon Daddy",
				characters: [
					{
						meta: {
							creationDate:
								"Sat Nov 11 2023 11:38:23 GMT-0700 (Mountain Standard Time)",
							lastPlayedDate:
								"Sat Nov 11 2023 11:39:23 GMT-0700 (Mountain Standard Time)",
							system: "DND 5E",
						},
						characterData: {
							name: "Harlog the hearty",
							classes: [
								{ class: "Barbarian", subClass: "Zealot", level: 3 },
								{
									class: "Ranger",
									subClass: "Beastmaster",
									level: 2,
								},
							],
							level: 5,
							currentHealth: 22,
							maxHealth: 31,
							armorClass: 15,
							abilityScores: {
								strength: 15,
								dexterity: 11,
								constitution: 12,
								intelligence: 12,
								wisdom: 8,
								charisma: 10,
							},
							equipment: [
								{
									itemName: "Great Sword",
									tags: ["martial", "weapon", "mundane", "heavy"],
									desc: "A simple but effective two-handed great sword",
									damage: "2D6 + strength",
									bonusEffects: [],
								},
								{
									itemName: "+1 Shield",
									tags: ["shield", "magical"],
									desc: "A magical +1 shield",
									damage: "",
									bonusEffects: [
										"grants +1 to AC in addition to the +2 of the shield.",
									],
								},
								{
									itemName: "Rope",
									tags: ["mundane"],
									desc: "A 50ft long length of rope",
									damage: "",
									bonusEffects: [],
								},
							],
						},
					},
					{
						meta: {
							creationDate:
								"Sat Nov 11 2023 11:38:23 GMT-0700 (Mountain Standard Time)",
							lastPlayedDate:
								"Sat Nov 11 2023 11:39:23 GMT-0700 (Mountain Standard Time)",
							system: "DND 5E",
						},
						characterData: {
							name: "garthock the mighty",
							classes: [
								{
									class: "Ranger",
									subClass: "Beastmaster",
									level: 2,
								},
							],
							level: 3,
							health: 22,
							armorClass: 15,
							abilityScores: {
								strength: 15,
								dexterity: 11,
								constitution: 12,
								intelligence: 12,
								wisdom: 8,
								charisma: 10,
							},
							equipment: [
								{
									itemName: "Great Sword",
									tags: ["martial", "weapon", "mundane", "heavy"],
									desc: "A simple but effective two-handed great sword",
									damage: "2D6 + strength",
									bonusEffects: [],
								},
								{
									itemName: "+1 Shield",
									tags: ["shield", "magical"],
									desc: "A magical +1 shield",
									damage: "",
									bonusEffects: [
										"grants +1 to AC in addition to the +2 of the shield.",
									],
								},
								{
									itemName: "Rope",
									tags: ["mundane"],
									desc: "A 50ft long length of rope",
									damage: "",
									bonusEffects: [],
								},
							],
						},
					},
				],
			};
		},

		toggleFloatNav() {
			this.showFloatingNav = !this.showFloatingNav;
		},
	},
});
