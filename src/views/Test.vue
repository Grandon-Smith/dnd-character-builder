<template>
  <h1>Test</h1>
  <button @click="attemptUserGrab">Test</button>
  <p>test output</p>
  <p v-if="output">{{ output }}</p>
</template>
<script setup>
import { ref } from "vue";
const output = ref("");

async function attemptUserGrab() {
  const response = await fetch("http://localhost:3000/api/test/user", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  output.value = data;
}
</script>
