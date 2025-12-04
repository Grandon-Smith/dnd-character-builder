<script setup>
	import { computed } from "vue";

	const props = defineProps({
		currentHP: Number,
		maxHP: Number,
		tempHP: Number,
	});

	const calcHPBarWidth = computed(() => {
		if (props.currentHP && props.maxHP) {
			return Math.floor((props.currentHP / props.maxHP) * 100);
		}
		return 0;
	});
</script>

<template>
	<div v-if="calcHPBarWidth">
		<h3>Health and Temp HP</h3>
		<p>
			HP:
			{{ currentHP }}/
			{{ maxHP }}
		</p>
		<div class="health-bar-wrapper">
			<div
				class="current-health-bar"
				:style="{ width: calcHPBarWidth + '%' }"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.health-bar-wrapper {
		background-color: rgb(132, 0, 0);
		position: relative;
		height: 1.75rem;
		padding: 5px;

		.current-health-bar {
			background-color: rgb(255, 64, 64);
			height: 100%;
			width: 5rem;
		}
	}
</style>
