import { defineStore } from "pinia";

console.log("Store Initialized");
export const useStore = defineStore("appStore", {
  state: () => ({
    userData: null,
    fetchingData: false,
    characters: [],
    selectedCharacter: null,
    appKey: 0,
    errorMsg: "",
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
          (c) => c._id === id,
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
  },
});
