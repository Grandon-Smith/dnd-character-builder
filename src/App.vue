<script setup>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "./store";
import { onMounted } from "vue";

const store = useStore();

const route = useRoute();
const router = useRouter();

onMounted(() => {
  store.setMockData();
  //remember to check out the DND API for data.
});
</script>

<template>
  <router-view :key="route.fullPath"> </router-view>
  <svg style="display: none">
    <filter id="paperTear">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.08"
        numOctaves="4"
        result="noise"
        seed="2"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="8"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
</template>

<style scoped></style>
