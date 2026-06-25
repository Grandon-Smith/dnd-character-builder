<script setup>
import ChooseCharacterCard from "../components/ChooseCharacterCard.vue";
import NavHeader from "../components/NavHeader.vue";
import { characterServices } from "../services/characters";
import { useStore } from "../store/appStore.js";
import { onBeforeMount } from "vue";

const store = useStore();

onBeforeMount(() => {
  console.log("choose char mount", store);
  if (!store.characters.length) {
    const options = {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    characterServices.getAllCharactersForUser(options);
  }
});
</script>

<template>
  <div class="choose-character-container">
    <NavHeader :headerText="'Choose Character'" />
    <p>
      <router-link to="/login">go login</router-link>
    </p>
    <router-link to="/">go home</router-link>
    <section
      v-if="store.characters.length"
      role="region"
      class="characters-container"
    >
      <ChooseCharacterCard
        v-for="(character, i) in store.characters"
        :characterObj="character"
        :cardIndex="i"
        :key="i"
      />
    </section>
    <p v-if="!store.characters.length" class="no-character-warn">
      Looks like you don't have a character yet. Lets change that!
    </p>
    <router-link to="/add-character"
      ><button class="new-char-btn btn-1">
        Create a new character!
      </button></router-link
    >
  </div>
</template>

<style scoped>
.choose-character-container {
  background-image: url("../assets/login-bg.jpg");
  background-size: cover;
  height: 100%;
}

.characters-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

.no-character-warn {
  padding: 1rem;
}

.new-char-btn {
  margin: 1.5rem auto;
}

@media only screen and (min-width: 600px) {
  .characters-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
