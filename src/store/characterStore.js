import { defineStore } from "pinia";
import { characterServices } from "../services/characters";

console.log("Store Initialized");
export const useCharacterStore = defineStore("characterStore", {
  state: () => ({
    characters: [],
    selectedCharacter: null,
    fetchingData: false,
    errorMsg: "",
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
    async createNewCharacter(options) {
      this.fetchingData = true;

      try {
        const character =
          await characterServices.createNewCharacterForUser(options);

        return character;
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.fetchingData = false;
      }
    },

    async getAllCharacters() {
      this.fetchingData = true;

      try {
        const options = {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };

        this.characters =
          await characterServices.getAllCharactersForUser(options);
      } catch (err) {
        this.error = err;
      } finally {
        this.fetchingData = false;
      }
    },

    setSelectedCharacter(id) {
      if (id && typeof id === "string") {
        this.selectedCharacter = this.userData.characters.find(
          (c) => c._id === id,
        );
      }
    },

    saveNewCharacterLocally(characterData) {
      this.characters.push(characterData);
    },
  },
});
