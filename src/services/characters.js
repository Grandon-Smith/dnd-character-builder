import { useCharacterStore } from "../store/characterStore.js";
import router from "../router/router.js";

const API_PATH =
  import.meta.VITE_API_URL_DEV || "http://localhost:3000/api/character";

export const characterServices = {
  createNewCharacterForUser: async (options) => {
    console.log("character service create new");
    try {
      const response = await fetch(API_PATH + "/create", options);

      if (!response.ok) {
        return null;
      }

      const newCharacterData = await response.json();
      return newCharacterData;
    } catch (err) {
      return err;
    }
  },

  getAllCharactersForUser: async (options) => {
    console.log("character service getting all characters");
    try {
      const response = await fetch(API_PATH + "/get-all", options);

      if (!response.ok) {
        return null;
      }

      const charactersData = await response.json();
      return charactersData;
    } catch {
      return null;
    }
  },
};
