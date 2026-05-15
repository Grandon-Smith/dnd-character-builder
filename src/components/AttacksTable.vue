<script setup>
	import { ref } from "vue";
	import {
		calcProficiencyBonus,
		calcAbilityModifier,
	} from "../utils";

	const props = defineProps({
		infoArray: {
			required: true,
		},
		infoHeader: String,
		characterLevel: Number,
		savingThrowProfs: Array,
	});

	const isEditing = ref(false);

	function calcSavingThrow(key) {
		const mod = calcAbilityModifier(props.infoArray[key]);
		const pb = calcProficiencyBonus(props.characterLevel);
		const proficient = props.savingThrowProfs?.includes(key);

		return proficient ? mod + pb : mod;
	}
</script>

<template>
	<section class="info-block-container">
		<h2>{{ infoHeader }}</h2>
		<div class="attacks-table-wrapper">
			<table class="attacks-table">
				<thead>
					<tr>
						<th>Attack Name</th>
						<th>Attack Bonus</th>
						<th>Damage Roll</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(value, key, i) in infoArray"
						:key="key + i">
						<td>{{ key }}</td>
						<td>{{ value }}</td>
						<td>
							<span>
								{{
									calcAbilityModifier(value) >= 0
										? "+" + calcAbilityModifier(value)
										: calcAbilityModifier(value)
								}}
							</span>
						</td>
						<td>
							{{
								calcSavingThrow(key) >= 0
									? "+" + calcSavingThrow(key)
									: calcSavingThrow(key)
							}}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.info-block-container {
		position: relative;

		.attacks-table-wrapper {
			overflow-x: auto;

			.attacks-table {
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
	}
</style>
