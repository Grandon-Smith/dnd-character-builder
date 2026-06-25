import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "../store/authStore.js";
import LoginAndCreateAcct from "../views/LoginAndCreateAcct.vue";
import ChooseCharacter from "../views/ChooseCharacter.vue";
import NewCharacter from "../views/NewCharacter.vue";
import CharacterSheet from "../views/CharacterSheet.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginAndCreateAcct,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/create-account",
    name: "Create Account",
    component: LoginAndCreateAcct,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/add-character",
    name: "New Character",
    component: NewCharacter,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/character-sheet/:id",
    name: "Character Sheet",
    component: CharacterSheet,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/choose-character",
    name: "Choose Character",
    component: ChooseCharacter,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/Test.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// global route auth guard
router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return "/login";
  }
});

export default router;
// get the store setup for vue and add a mock user. build app around that data.
