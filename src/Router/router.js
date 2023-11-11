import { createWebHistory, createRouter } from 'vue-router';
import LoginScreen from '../views/LoginScreen.vue';
import CharacterSheet from '../components/CharacterSheet.vue';
import Home from '../views/Home.vue';

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: LoginScreen,
	},
	{
		path: '/character-sheet',
		name: 'Character Sheet',
		component: CharacterSheet,
	},
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
// get the store setup for vue and add a mock user. build app around that data.