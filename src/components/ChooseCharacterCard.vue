<script setup>
	import { useRouter, useRoute } from "vue-router";
	import { ref, defineProps, onMounted } from "vue";
	import { useUserDataStore } from "../store";

	const route = useRoute();
	const router = useRouter();

	const store = useUserDataStore();
	const props = defineProps({
		characterObj: {
			type: Object,
			required: true,
		},
	});

	function handleCharacterSelect() {
		router.push("/character-sheet");
	}

	onMounted(() => {
		console.log("character card mount", props.characterObj);
	});
</script>

<template>
	<button
		class="character-container"
		@click="handleCharacterSelect">
		<!-- <router-link
		class="character-container"
		to="/"> -->
		<div class="character-img-wrapper"></div>
		<div class="character-info-container">
			<h3>{{ characterObj.name }}</h3>
			<p>
				Class:
				<span v-for="classes in characterObj.classes"
					>{{ classes.class + " " }}
				</span>
			</p>
			<p>Level: {{ characterObj.level }}</p>
		</div>
		<!-- </router-link> -->
	</button>
</template>

<style scoped>
	.character-container {
		border: 1px solid grey;
		border-radius: 8px;
		margin: 0.75em 0.75em 0 0.75em;
		padding: 1em;
		display: flex;
	}

	.character-img-wrapper {
		width: 75px;
		aspect-ratio: 1/1;
		background-color: pink;
	}

	.character-info-container {
		text-align: left;
		margin-left: 3%;
	}
</style>
