import { createWebHistory, createRouter } from "vue-router";
import LoginScreen from "../views/LoginScreen.vue";
import ChooseCharacter from "../views/ChooseCharacter.vue";
import NewCharacter from "../views/NewCharacter.vue";
import CharacterSheet from "../views/CharacterSheet.vue";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/login",
		name: "Login",
		component: LoginScreen,
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

export default router;
// get the store setup for vue and add a mock user. build app around that data.
