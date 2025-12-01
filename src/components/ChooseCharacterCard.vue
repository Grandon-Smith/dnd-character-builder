<script setup>
	const props = defineProps({
		characterObj: {
			type: Object,
			required: true,
		},
	});
</script>

<template>
	<router-link
		class="character-container"
		:to="'/character-sheet/' + characterObj._id">
		<div class="character-img-wrapper"></div>
		<div class="character-info-container">
			<h3>{{ characterObj.name }}</h3>
			<p>
				Class:
				<span
					v-for="classes in characterObj.classes"
					:key="classes.name"
					>{{ classes.name + " " }}
				</span>
			</p>
			<p>Level: {{ characterObj.level }}</p>
		</div>
	</router-link>
</template>

<style scoped lang="scss">
	.character-container {
		border: 1px solid var(--clr-black-1);
		border-radius: 8px;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
		padding: 0.75em;
		max-width: 22rem;
		min-width: 15rem;
		width: 100%;
		transition: transform 0.2s;

		&:hover {
			transform: scale(1.05);
		}
	}

	.character-img-wrapper {
		width: 30%;
		aspect-ratio: 1/1;
		background-color: pink;
	}

	.character-info-container {
		margin-top: 0.75rem;
		text-align: left;
		width: 100%;
	}

	.character-info-container h3 {
		font-weight: 500;
		line-height: 1.25rem;
	}

	@media only screen and (min-width: 400px) {
		.character-container {
			flex-direction: row;
			align-items: center;
			margin: 0 auto;
			padding: 1rem;
		}
		.character-info-container {
			text-align: left;
			margin-left: 3%;
			margin-top: 0;
		}
	}
</style>
