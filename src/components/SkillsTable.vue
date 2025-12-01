<script setup>
	import { onMounted, ref } from "vue";
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

		return proficient ? mod + pb : mod;
	}
	onMounted(() => {
		console.log(calcSkillBonus("dexterity", "acrobatics"));
	});
</script>

<template>
	<section class="info-block-container">
		<h2>{{ infoHeader }}</h2>
		<div class="ability-table-wrapper">
			<table class="ability-table">
				<thead>
					<tr>
						<th>Bonus</th>
						<th>Skill Name</th>
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

	.edit-btn {
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;
	}

	.ability-table-wrapper {
		overflow-x: auto;

		.ability-table {
			width: 100%;
			text-align: center;
			border-spacing: 0.5rem;

			& td,
			th {
				padding: 0.25rem 0.5rem;
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
