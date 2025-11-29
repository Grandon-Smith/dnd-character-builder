<script setup>
	import NavHeader from "../components/NavHeader.vue";
	import { ref } from "vue";
	import { useStore } from "../store";

	const store = useStore();

	defineProps({
		msg: String,
	});

	const abilityScoreDataArr = ref([
		{
			score: 10,
			abilityName: "Strength",
			bonus: 0,
		},
		{
			score: 10,
			abilityName: "Dexterity",
			bonus: 0,
		},
		{
			score: 10,
			abilityName: "Constitution",
			bonus: 0,
		},
		{
			score: 10,
			abilityName: "Intelligence",
			bonus: 0,
		},
		{
			score: 10,
			abilityName: "Wisdom",
			bonus: 0,
		},
		{
			score: 10,
			abilityName: "Charisma",
			bonus: 0,
		},
	]);

	const equipmentArr = ref([
		{
			itemName: "Mithral Chain Mail",
			toolTip: "+2 AC",
		},
		{
			itemName: "Mithral Chain Mail",
			toolTip: "+2 AC",
		},
		{
			itemName: "Mithral Chain Mail",
			toolTip: "+2 AC",
		},
	]);
	const skillsDataArr = ref([
		{
			bonus: "+3",
			skillName: "Acrobatics",
		},
		{
			bonus: "+3",
			skillName: "Animal Handling",
		},
		{
			bonus: "+3",
			skillName: "Arcana",
		},
		{
			bonus: "+3",
			skillName: "Athletics",
		},
	]);

	const editingSection = ref(null);
</script>

<template>
	<div class="character-sheet-container">
		<NavHeader headerText="Char Name" />
		<div class="stats-sections-container">
			<section class="stat-section health">
				<div class="img-container"></div>
				<h3>Level: {{ store.charData.level }}</h3>
				<!-- <div class="health-info-container"> -->
				<h3>Armor Class: {{ store.charData.armorClass }}</h3>
				<h3>Health</h3>
				<p>
					HP:
					{{ store.charData.currentHealth }}/
					{{ store.charData.maxHealth }}
				</p>
				<div class="full-health-bar">
					<div class="current-health-bar"></div>
				</div>
				<!-- </div> -->
				<!-- <div class="health-info-container"> -->
				<!-- </div> -->
			</section>

			<section class="stat-section scores">
				<div class="ability-score-container">
					<h2>Ability Scores</h2>
					<button
						class="edit-btn"
						@click="editingSection = 'stats'">
						edit
					</button>
					<div
						class="abilty-score-container"
						v-if="editingSection === 'stats'">
						<div
							class="ability-score-info-row"
							:key="row.abilityName"
							v-for="row in abilityScoreDataArr">
							<input
								type="text"
								v-model="row.score" />
							<p>{{ row.abilityName }}</p>
							<p>{{ row.bonus }}</p>
						</div>
					</div>
					<div
						class="abilty-score-container"
						v-else>
						<div
							class="ability-score-info-row"
							:key="row.abilityName"
							v-for="row in abilityScoreDataArr">
							<p>{{ row.score }}</p>
							<p>{{ row.abilityName }}</p>
							<p>{{ row.bonus }}</p>
						</div>
					</div>
				</div>

				<div class="ability-score-container">
					<h2>Skills</h2>
					<div
						class="ability-score-info-row"
						:key="row.abilityName"
						v-for="row in skillsDataArr">
						<p>{{ row.bonus }}</p>
						<p>{{ row.skillName }}</p>
					</div>
				</div>
			</section>

			<section class="stat-section">
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
			</section>
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

	.stat-section {
		position: relative;
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
