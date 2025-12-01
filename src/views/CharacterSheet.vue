<script setup>
	import { onBeforeMount, ref, computed } from "vue";
	import { useStore } from "../store";
	import { useRoute } from "vue-router";
	import { characterServices } from "../services/characters";
	import NavHeader from "../components/NavHeader.vue";
	import AbilityScoresTable from "../components/AbilityScoresTable.vue";
	import SkillsTable from "../components/SkillsTable.vue";
	import BaseStats from "../components/BaseStats.vue";

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
			<section class="stat-section health">
				<div class="img-container"></div>
				<h3>Level: {{ characterData.level }}</h3>
				<h3>Armor Class: {{ characterData.armorClass }}</h3>
				<h3>Add inspiration up here. btn to add it?</h3>
				<h3>Health</h3>
				<p>
					HP:
					{{ characterData.currentHealth }}/
					{{ characterData.maxHealth }}
				</p>
				<div class="full-health-bar">
					<div class="current-health-bar"></div>
				</div>
			</section>
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

			<!-- <section class="stat-section">
				<div class="equipment-info">
					<h2>Equipment</h2>
					<div
						class="ability-score-info-row"
						v-for="row in equipmentArr"
						:key="row.itemName">
						<p>{{ row.itemName }}</p>
						<p>{{ row.toolTip }}</p>
					</div>
				</div>
			</section> -->
		</div>
	</div>
</template>

<style scoped>
	.character-sheet-container {
		background-image: url("../assets/login-bg.jpg");
		background-size: cover;
		width: 100%;
	}

	.stats-sections-container {
		display: grid;
		grid-template-columns: 1fr;
		padding: 0.5rem 0.25rem;
	}

	.health {
		border: 1px solid blue;
		padding: 1rem;
	}

	.edit-btn {
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;
	}
	.img-container {
		background-color: black;
		width: 100px;
		aspect-ratio: 1/1;
	}

	.full-health-bar {
		background-color: rgb(132, 0, 0);
		position: relative;
		height: 20px;
	}

	.current-health-bar {
		background-color: rgb(255, 64, 64);
		height: 100%;
		position: absolute;
		width: 60%;
		left: 0;
		bottom: 0;
	}

	.ability-score-info-row {
		display: flex;
	}

	.ability-score-container {
		border: 1px solid black;
		margin-bottom: 1rem;
	}
	@media only screen and (min-width: 600px) {
	}
</style>
