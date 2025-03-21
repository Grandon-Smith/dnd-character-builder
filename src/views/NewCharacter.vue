<script setup>
	import ChooseCharacterCard from "../components/ChooseCharacterCard.vue";
	import NavHeader from "../components/NavHeader.vue";
	import TextInput from "../components/TextInput.vue";
	import { ref } from "vue";
	import { useUserDataStore } from "../store";
	import { onMounted } from "vue";

	const store = useUserDataStore();
	const characterName = ref({
		textVal: "",
		label: "Character Name",
		hasError: false,
		inputType: "text",
	});

	const characterStats = ref([{}]);

	onMounted(() => {
		console.log("new char mount");
	});
</script>

<template>
	<div class="choose-character-container">
		<NavHeader :headerText="'Choose Character'" />
		<main
			role="region"
			class="characters-container">
			<TextInput
				:errorMsg="characterName.errorMsg"
				:hasError="characterName.hasError"
				inputId="username"
				labelText="Character Name"
				placeHolder="Garthock Stonefist"
				:textInput="characterName.textVal"
				v-on:emitTextInput="
					(e) => (characterName.textVal = e.target.value)
				" />
		</main>
	</div>
</template>

<style scoped>
	.choose-character-container {
		background-image: url("../assets/login-bg.jpg");
		background-size: cover;
		height: 100%;
	}

	main {
		padding: 1rem;
	}
</style>
