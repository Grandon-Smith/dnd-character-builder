<script setup>
	import { computed } from "vue";
	import { useStore } from "../store";
	import {
		calcProficiencyBonus,
		calcAbilityModifier,
	} from "../utils";

	const props = defineProps({
		charData: Object,
	});

	const store = useStore();

	const calcPassivePerception = computed(() => {
		let perceptionBonus =
			10 +
			calcAbilityModifier(props.charData.abilityScores["wisdom"]);

		if (props.charData.skillProfs?.includes("perception")) {
			//if proficient in perception skill, add that to bonus
			perceptionBonus += calcProficiencyBonus(props.charData.level);
		}

		return perceptionBonus;
	});
</script>

<template>
	<section>
		<h2>Base Stats</h2>
		<div>
			<div>
				Initiative: +{{
					calcAbilityModifier(charData.abilityScores["dexterity"])
				}}
			</div>
			<div>Speed: {{ charData.speed }}</div>
			<div>
				Proficiency: +{{ calcProficiencyBonus(charData.level) }}
			</div>
			Passive Perception: {{ calcPassivePerception }}
		</div>
	</section>
</template>

<style scoped lang="scss"></style>
