import { defineStore } from "pinia";

export const useUserDataStore = defineStore("user", {
	state: () => ({
		userData: null,
		fetchingData: false,
	}),
	getters: {
		doubleCount(state) {},
	},
	actions: {
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
							class: "Barbarian",
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
							class: "Ranger",
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
	},
});
