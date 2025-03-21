import { createWebHistory, createRouter } from "vue-router";
import LoginAndNewUser from "../views/LoginAndNewUser.vue";
import ChooseCharacter from "../views/ChooseCharacter.vue";
import NewCharacter from "../views/NewCharacter.vue";
import CharacterSheet from "../views/CharacterSheet.vue";
import Home from "../views/Home.vue";

const isAuthenticated = () => {
	// You can replace this logic with actual authentication logic
	// return !!localStorage.getItem('authToken');
	return true;
};

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
		beforeEnter: (to, from, next) => {
			if (isAuthenticated()) {
				next(); // Proceed to the profile page
			} else {
				next({ name: "Login" }); // Redirect to the login page if not authenticated
			}
		},
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

export default router;
// get the store setup for vue and add a mock user. build app around that data.
