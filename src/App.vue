<script setup>
	import { useRouter, useRoute } from "vue-router";
	import { onMounted } from "vue";
	import CharacterSheet from "./components/CharacterSheet.vue";
	import Home from "./views/Home.vue";
	import LoginScreen from "./views/LoginScreen.vue";

	const route = useRoute();
	const router = useRouter();

	onMounted(() => {
		// console.log(new Date())
	});
</script>

<template>
	<p>
		<router-link to="/login">go login</router-link>
	</p>
	<router-link to="/">go home</router-link>
	<router-view> </router-view>
</template>

<style scoped></style>
