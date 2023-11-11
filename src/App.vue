<script setup>
import CharacterSheet from './components/CharacterSheet.vue'
import Home from './views/Home.vue'
import LoginScreen from './views/LoginScreen.vue'
</script>

<template>
          <p>
          <router-link to="/login">go login</router-link>
          
        </p>
        <router-link to="/">go home</router-link>
  <router-view>
  </router-view>
</template>

<style scoped>

</style>
