import { createWebHistory, createRouter } from "vue-router";
import LoginAndNewUser from "../views/LoginAndNewUser.vue";
import ChooseCharacter from "../views/ChooseCharacter.vue";
import NewCharacter from "../views/NewCharacter.vue";
import CharacterSheet from "../views/CharacterSheet.vue";
import Home from "../views/Home.vue";

const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

const publicRoutes = ["/", "/login", "/create-account"];

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginAndNewUser,
  },
  {
    path: "/create-account",
    name: "Create Account",
    component: LoginAndNewUser,
  },
  {
    path: "/add-character",
    name: "New Character",
    component: NewCharacter,
  },
  {
    path: "/character-sheet",
    name: "Character Sheet",
    component: CharacterSheet,
  },
  {
    path: "/choose-character",
    name: "Choose Character",
    component: ChooseCharacter,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// global route auth guard
router.beforeEach((to, from, next) => {
  if (!publicRoutes.includes(to.path) && !isAuthenticated()) {
    // force user to /login, change this if needed
    next("/login");
  } else {
    // user is authenticated or route is public
    next();
  }
});

export default router;
// get the store setup for vue and add a mock user. build app around that data.
