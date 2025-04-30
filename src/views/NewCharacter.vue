<template>
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
					type="button"
					@click="removeClass(index)">
					Remove
				</button>
			</div>
			<button
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

			<label for="hp-current">Current HP</label>
			<input
				id="hp-current"
				v-model.number="character.hitPoints.current"
				type="number"
				required />

			<label for="hp-temp">Temporary HP</label>
			<input
				id="hp-temp"
				v-model.number="character.hitPoints.temporary"
				type="number" />
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
		<button type="submit">Create Character</button>
	</form>
</template>

<script setup>
	import { reactive } from "vue";

	const character = reactive({
		name: "test Name",
		race: "elf",
		classes: [{ name: "Wizard", level: 1 }],
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
		player: "680046f46896cf2706722b76",
	});

	const addClass = () => {
		character.classes.push({ name: "", level: 1 });
	};

	const removeClass = (index) => {
		character.classes.splice(index, 1);
	};

	const submitCharacter = async () => {
		try {
			// const OPTIONS = {
			// 	method: "GET",
			// 	headers: { "Content-Type": "application/json" },
			// 	credentials: "include", // Necessary for cookies
			// };
			// const user = await fetch(
			// 	"http://localhost:3000/api/auth/profile",
			// 	OPTIONS
			// );
			// const userData = await user.json();
			// console.log("asdfsdf", userData);
			const response = await fetch(
				"http://localhost:3000/api/character/create",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(character),
				}
			);

			if (!response.ok) throw new Error("Failed to create character");

			const data = await response.json();
			alert(`Character created! ID: ${data._id}`);
		} catch (error) {
			console.error(error);
			alert("Error creating character");
		}
	};
</script>
