<script setup>
	import { useStore } from "../store";
	import {
		calcProficiencyBonus,
		calcAbilityModifier,
	} from "../utils";

	const props = defineProps({
		infoHeader: String,
		characterLevel: Number,
		skillProfs: Array,
		abilityScores: Object,
	});

	const store = useStore();

	function calcSkillBonus(ability, skill) {
		const mod = calcAbilityModifier(props.abilityScores[ability]);
		const pb = calcProficiencyBonus(props.characterLevel);
		const proficient = props.skillProfs?.includes(skill);

		const bonus = proficient ? mod + pb : mod;
		return bonus > 0 ? "+" + bonus : bonus;
	}
</script>

<template>
	<section class="info-block-container">
		<h2>{{ infoHeader }}</h2>
		<div class="skills-table-wrapper">
			<table class="skills-table">
				<thead>
					<tr>
						<th>Skill Name</th>
						<th>Bonus</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(abilityName, skillName) in store.skillsList"
						:key="skillName">
						<td>{{ skillName }}</td>
						<td>{{ calcSkillBonus(abilityName, skillName) }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.info-block-container {
		position: relative;
	}

	.skills-table-wrapper {
		overflow-x: auto;

		.skills-table {
			text-align: center;
			border-spacing: 0.5rem;
			min-width: 300px; // or whatever width triggers overflow
			width: 100%;

			& td,
			th {
				padding: 0.25rem 0.5rem;
				text-transform: capitalize;
			}

			& td:first-of-type {
				background-color: #dddddd;
			}

			& td:not(:first-of-type) {
				background-color: #fff;
			}

			& tr > td:first-of-type,
			tr > th:first-of-type {
				text-align: right;
			}
		}
	}
</style>
