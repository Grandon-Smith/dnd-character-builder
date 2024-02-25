<script setup>
	import ChooseCharacterCard from "../components/ChooseCharacterCard.vue";
	import NavHeader from "../components/NavHeader.vue";
	import { ref } from "vue";
	import { useUserDataStore } from "../store";
	import { onMounted } from "vue";

	const store = useUserDataStore();
	onMounted(() => {
		console.log("choose char mount", store);
	});
</script>

<template>
	<div class="choose-character-container">
		<NavHeader :headerText="'Choose Character'" />
		<p>
			<router-link to="/login">go login</router-link>
		</p>
		<router-link to="/">go home</router-link>
		<section
			role="region"
			class="characters-container">
			NEW CHARACTER SCREEN
		</section>
	</div>
</template>

<style scoped>
	.choose-character-container {
		background-image: url("../assets/login-bg.jpg");
		background-size: cover;
		height: 100%;
	}

	.characters-container {
		display: grid;
		grid-template-columns: 1fr;
	}
</style>
