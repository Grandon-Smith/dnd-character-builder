<script setup>
import { onMounted } from "vue";
import { useStore } from "../store";
import { ref } from "vue";

const store = useStore();
const props = defineProps({
  headerText: String,
});

const floatingNavOptions = [
  {
    text: "Choose Character",
    path: "/choose-character",
  },
  {
    text: "Add Character",
    path: "/add-character",
  },
  // {
  // 	text: "Add Member",
  // 	path: "/add-member",
  // },
  {
    text: "Log Out",
    path: "/",
  },
];

const showFloatNav = ref(false);

function toggleFloatingNav() {
  showFloatNav.value = !showFloatNav.value;
}
</script>

<template>
  <nav class="flex bg-[#ffffff54] items-center p-2 relative">
    <div class="float-nav-container relative">
      <button
        aria-label="navigation menu"
        class="nav-btn"
        @click="toggleFloatingNav"
      >
        <div class="nav-btn-line"></div>
        <div class="nav-btn-line"></div>
        <div class="nav-btn-line"></div>
      </button>

      <ul
        class="floating-nav absolute top-full left-0 z-10 bg-[#e7e7e7] border border-[var(--clr-grey-1)]"
        v-if="showFloatNav"
      >
        <li v-for="link in floatingNavOptions" :key="link.path">
          <router-link
            :to="link.path"
            class="block whitespace-nowrap border-b border-[var(--clr-grey-1)] p-1 px-4 hover:bg-[#fce4f1]"
            >{{ link.text }}</router-link
          >
        </li>
      </ul>
    </div>
    <button class="btn-1" @click="store.fetchProfile()">GET PROFILE</button>
    <h1 class="text-2xl font-black uppercase w-full text-center">
      {{ headerText }}
    </h1>
  </nav>
</template>

<style scoped>
nav h1::before {
  background-color: var(--clr-red-1);
  border-radius: 100% 100% 100% 100%;
  content: "";
  width: 90%;
  height: 0.35rem;
  position: absolute;
  bottom: -0.25rem;
  right: 5%;
  display: block;
}

.nav-btn {
  aspect-ratio: 1/1;
  background: transparent;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0.25rem;
  height: 2rem;
}

.nav-btn-line {
  height: 2px;
  width: 100%;
  background-color: var(--clr-black-1);
}

.floating-nav li a:hover,
.floating-nav li a:focus {
  background-color: #fce4f1;
}
</style>
