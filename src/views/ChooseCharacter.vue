<script setup>
import { Button } from "@/components/ui/button";
import { useStore } from "../store";
import { onBeforeMount } from "vue";

const store = useStore();

onBeforeMount(() => {
  console.log("choose char mount", store);
  if (!store.userData.characters.length) {
    const options = {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    // characterServices.getAllCharactersForUser(options);
  }
});
</script>

<template>
  <div
    class="choose-character-container flex flex-col items-center justify-center min-h-screen"
  >
    <div class="text-center space-y-6 p-8 rounded-lg">
      <h1 class="text-4xl font-bold mb-4">Character Selection</h1>

      <div v-if="!store.userData.characters.length" class="space-y-4">
        <p class="text-lg">
          Looks like you don't have a character yet. Let's change that!
        </p>

        <Button size="lg" class="text-lg px-8 py-3">
          <router-link to="/add-character" class="flex items-center gap-2">
            Create a new character!
          </router-link>
        </Button>
      </div>

      <div v-else class="">
        <!-- Character cards would go here when characters exist -->
        <p>Characters will be displayed here</p>
      </div>

      <div class="flex gap-4 mt-8">
        <Button
          variant="outline"
          class="border-white hover:bg-white hover:text-black"
        >
          <router-link to="/">Home</router-link>
        </Button>
        <Button
          variant="outline"
          class="border-white hover:bg-white hover:text-black"
          @click="store.logout()"
        >
          Logout
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.choose-character-container {
  background-image: url("../assets/login-bg.jpg");
}
</style>
