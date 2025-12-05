<script setup>
	import { onBeforeMount, ref, computed } from "vue";
	import { useStore } from "../store";
	import { useRoute } from "vue-router";
	import { characterServices } from "../services/characters";
	import NavHeader from "../components/NavHeader.vue";
	import HealthBar from "../components/HealthBar.vue";
	import BaseStats from "../components/BaseStats.vue";
	import AbilityScoresTable from "../components/AbilityScoresTable.vue";
	import SkillsTable from "../components/SkillsTable.vue";
	import EquipmentList from "../components/EquipmentList.vue";

	const store = useStore();
	const route = useRoute();

	const editingSection = ref(null);
	const characterData = computed(() => store.selectedCharacterData);

	onBeforeMount(async () => {
		console.log("character sheet mount", route);
		store.setSelectedCharacter(route.params.id);
		if (!characterData.value) {
			console.log("inside if statement");
			const options = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			};
			await characterServices.getAllCharactersForUser(options);
			setTimeout(() => {
				store.setSelectedCharacter(route.params.id);
			}, 1000);
		}
	});
</script>

<template>
	<div
		class="character-sheet-container"
		v-if="characterData">
		<NavHeader :headerText="characterData.name" />
		<div class="stats-sections-container">
			<section class="heading-section">
				<div class="img-container"></div>
				<div>
					<h3>Class: {{ characterData.classes[0].name }}</h3>
					<h3>Level: {{ characterData.level }}</h3>
					<h3>
						Background: {{ characterData.background || "acolyte" }}
					</h3>
					<h3>Add inspiration up here. btn to add it?</h3>
				</div>
			</section>
			<HealthBar
				:currentHP="characterData.hitPoints.current"
				:maxHP="characterData.hitPoints.max"
				:tempHP="characterData.hitPoints.temporary" />
			<BaseStats :charData="characterData" />
			<AbilityScoresTable
				infoHeader="Ability Scores"
				:infoArray="characterData.abilityScores"
				:characterLevel="characterData.level"
				:savingThrowProfs="characterData.savingThrowProficiencies" />
			<SkillsTable
				infoHeader="Skills"
				:characterLevel="characterData.level"
				:skillProfs="characterData.skillProficiencies"
				:abilityScores="characterData.abilityScores" />
			<EquipmentList />
		</div>
	</div>
</template>

<style scoped lang="scss">
	.character-sheet-container {
		background-image: url("../assets/login-bg.jpg");
		background-size: cover;
		width: 100%;
	}

	.stats-sections-container {
		display: grid;
		grid-template-columns: 1fr;
		padding: 0.5rem 0.25rem;

		& > * {
			min-width: 0;
			margin-bottom: 1.5rem;
		}

		.heading-section {
			display: flex;
			flex-direction: column;
			width: 100%;

			.img-container {
				background-color: black;
				width: clamp(5rem, 40%, 12rem);
				aspect-ratio: 1/1;
				margin: 1.5rem auto;
			}
		}
	}

	@media only screen and (min-width: 600px) {
		.stats-sections-container {
			.heading-section {
				flex-direction: row;
				gap: 1rem;

				padding: 0.5rem;

				.img-container {
					margin: 0;
				}
			}
		}
	}
</style>
