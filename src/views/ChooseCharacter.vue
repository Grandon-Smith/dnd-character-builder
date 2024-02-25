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
	<NavHeader
		:headerText="'Choose Character ' + store.userData.name" />
	<div class="choose-character-container">
		<ChooseCharacterCard
			v-for="character in store.userData.characters"
			:characterObj="character.characterData" />
	</div>
</template>

<style scoped>
	.choose-character-container {
		display: grid;
		grid-template-columns: 1fr;
	}
</style>
