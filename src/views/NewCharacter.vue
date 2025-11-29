<script setup>
	import { ref } from "vue";
	import { useStore } from "../store";
	import NavHeader from "../components/NavHeader.vue";
	import { useRouter } from "vue-router";
	import { characterServices } from "../services/characters";

	const store = useStore();
	const router = useRouter();

	const character = ref({
		name: "test Name",
		race: "elf",
		classes: [{ name: "Wizard", level: 1 }],
		level: 1,
		stats: {
			strength: 10,
			dexterity: 10,
			constitution: 10,
			intelligence: 10,
			wisdom: 10,
			charisma: 10,
		},
		hitPoints: {
			max: 10,
			current: 10,
			temporary: 0,
		},
		armorClass: 10,
		speed: 30,
		initiative: 2,
		proficiencies: [],
		inventory: [],
		spells: [],
		notes: "",
		player: "",
	});

	const addClass = () => {
		character.value.classes.push({ name: "", level: 1 });
	};

	const removeClass = (index) => {
		character.value.classes.splice(index, 1);
	};

	async function submitCharacter() {
		try {
			// await store.saveNewCharacterLocally(character.value);
			// router.push("/choose-character");
			character.value.level = character.value.classes.reduce(
				(sum, c) => sum + c.level,
				0
			);

			const options = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(character.value),
			};

			characterServices.createNewCharacter(options);
		} catch (error) {
			console.error(error);
			alert("Error creating character");
		}
	}
</script>

<template>
	<div>
		<NavHeader headerText="Create Your Character" />
		<form @submit.prevent="submitCharacter">
			<!-- Character Name -->
			<label for="name">Character Name</label>
			<input
				id="name"
				v-model="character.name"
				required />

			<!-- Race -->
			<label for="race">Race</label>
			<input
				id="race"
				v-model="character.race"
				required />

			<!-- Multiclass -->
			<fieldset>
				<legend>Classes</legend>
				<div
					v-for="(cls, index) in character.classes"
					:key="index">
					<label :for="'class-name-' + index">Class Name</label>
					<input
						:id="'class-name-' + index"
						v-model="cls.name"
						required />

					<label :for="'class-level-' + index">Class Level</label>
					<input
						:id="'class-level-' + index"
						v-model.number="cls.level"
						type="number"
						min="1"
						required />

					<button
						:disabled="store.fetchingData"
						class="btn-1"
						type="button"
						@click="removeClass(index)">
						Remove
					</button>
				</div>
				<button
					:disabled="store.fetchingData"
					class="btn-1"
					type="button"
					@click="addClass">
					Add Class
				</button>
			</fieldset>

			<!-- Stats -->
			<fieldset>
				<legend>Ability Scores</legend>
				<div
					v-for="(value, stat) in character.stats"
					:key="stat">
					<label :for="stat">{{
						stat.charAt(0).toUpperCase() + stat.slice(1)
					}}</label>
					<input
						:id="stat"
						v-model.number="character.stats[stat]"
						type="number"
						required />
				</div>
			</fieldset>

			<!-- Hit Points -->
			<fieldset>
				<legend>Hit Points</legend>
				<label for="hp-max">Max HP</label>
				<input
					id="hp-max"
					v-model.number="character.hitPoints.max"
					type="number"
					required />
			</fieldset>

			<!-- Combat -->
			<fieldset>
				<legend>Combat Stats</legend>
				<label for="ac">Armor Class</label>
				<input
					id="ac"
					v-model.number="character.armorClass"
					type="number"
					required />

				<label for="speed">Speed</label>
				<input
					id="speed"
					v-model.number="character.speed"
					type="number"
					required />

				<label for="initiative">Initiative</label>
				<input
					id="initiative"
					v-model.number="character.initiative"
					type="number"
					required />
			</fieldset>

			<!-- Submit -->
			<button
				:disabled="store.fetchingData"
				type="submit"
				class="btn-1">
				Create Character
			</button>
		</form>
	</div>
</template>

<style lang="scss">
	input {
		padding: 0.25rem;
		margin: 0.5rem;
	}
</style>
