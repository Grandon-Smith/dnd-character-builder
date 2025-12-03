<script setup>
	import { ref, computed, watch } from "vue";
	import { useStore } from "../store";
	import NavHeader from "../components/NavHeader.vue";
	import { useRouter } from "vue-router";
	import { characterServices } from "../services/characters";

	const store = useStore();
	const router = useRouter();

	const character = ref({
		name: "test Name",
		race: "elf",
		classes: [{ name: "wizard", level: 1 }],
		level: 1,
		abilityScores: {
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
		skillProficiencies: [],
		savingThrowProficiencies: [],
		inventory: [],
		spells: [],
		notes: "",
		player: "",
	});

	const classData = {
		wizard: {
			skillChoices: 2,
			skills: [
				"Arcana",
				"History",
				"Insight",
				"Investigation",
				"Medicine",
				"Religion",
			],
			autoProficiencies: ["Arcana"], // optional
		},
		barbarian: {
			skillChoices: 2,
			skills: [
				"Animal Handling",
				"Athletics",
				"Intimidation",
				"Nature",
				"Perception",
				"Survival",
			],
			autoProficiencies: [],
		},
		// ...
	};

	const racesList = ["elf", "human", "half orc", "dwarf"];

	const addClass = () => {
		character.value.classes.push({ name: "", level: 1 });
	};

	const removeClass = (index) => {
		character.value.classes.splice(index, 1);
	};

	const selectedClassNames = computed(() =>
		character.value.classes.map((c) => c.name)
	);

	const availableSkills = computed(() => {
		const skills = new Set();

		selectedClassNames.value.forEach((cls) => {
			classData[cls]?.skills.forEach((skill) => skills.add(skill));
		});

		// Remove auto-proficiency skills from the selectable list
		autoSkills.value.forEach((auto) => skills.delete(auto));

		return [...skills];
	});

	// Total number of skills they are allowed to choose
	const maxSkillChoices = computed(() => {
		return selectedClassNames.value.reduce((total, cls) => {
			return total + (classData[cls]?.skillChoices || 0);
		}, 0);
	});

	// Auto-proficiencies (free)
	const autoSkills = computed(() => {
		const auto = new Set();
		selectedClassNames.value.forEach((cls) => {
			classData[cls]?.autoProficiencies?.forEach((p) => auto.add(p));
		});
		return [...auto];
	});

	// Combine selected + auto
	const selectedSkillCount = computed(() => {
		return (
			autoSkills.value.length +
			character.value.skillProficiencies.length
		);
	});

	// Whether selecting more is allowed or not
	const disableUnselected = computed(
		() => selectedSkillCount.value >= maxSkillChoices.value
	);

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
	watch(availableSkills, (newList) => {
		character.value.skillProficiencies =
			character.value.skillProficiencies.filter((skill) =>
				newList.includes(skill)
			);
	});

	watch(
		autoSkills,
		(newAuto) => {
			const current = character.value.skillProficiencies;

			// Remove any auto-skills the user might have manually selected before filtering
			const cleaned = current.filter(
				(skill) => !newAuto.includes(skill)
			);

			// Add auto skills to the beginning (or end)
			character.value.skillProficiencies = [...newAuto, ...cleaned];
		},
		{ immediate: true }
	);
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
				required
				maxlength="50" />

			<!-- Race -->
			<label for="race">Race</label>
			<select
				id="race"
				v-model="character.race"
				required>
				<option
					v-for="race in racesList"
					:value="race"
					:key="race">
					{{ race }}
				</option>
			</select>

			<!-- Multiclass -->
			<fieldset>
				<legend>Classes</legend>
				<div
					v-for="(cls, index) in character.classes"
					:key="index">
					<label :for="'class-name-' + index">Class Name</label>
					<select
						:id="'class-name-' + index"
						v-model="cls.name"
						required>
						<option
							v-for="charClass in store.classesList"
							:key="charClass"
							:value="charClass">
							{{ charClass }}
						</option>
					</select>

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
					v-for="(value, stat) in character.abilityScores"
					:key="stat">
					<label :for="stat">{{
						stat.charAt(0).toUpperCase() + stat.slice(1)
					}}</label>
					<input
						:id="stat"
						v-model.number="character.abilityScores[stat]"
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
			<!-- Skill Proficiencies -->
			<fieldset>
				<legend>Skill Proficiencies</legend>

				<p>
					Choose {{ maxSkillChoices }} skills
					<strong
						>{{ selectedSkillCount }}/{{ maxSkillChoices }}</strong
					>
					selected
				</p>

				<!-- Auto-granted skills -->
				<div v-if="autoSkills.length">
					<p><strong>Automatic Proficiencies:</strong></p>
					<ul>
						<li
							v-for="skill in autoSkills"
							:key="'auto-' + skill">
							✔ {{ skill }} (granted by class)
						</li>
					</ul>
				</div>

				<!-- User-selectable skills -->
				<div
					v-for="skill in availableSkills"
					:key="skill"
					style="margin-bottom: 6px">
					<label>
						<input
							type="checkbox"
							:value="skill"
							v-model="character.skillProficiencies"
							:disabled="
								disableUnselected &&
								!character.skillProficiencies.includes(skill)
							" />
						{{ skill }}
					</label>
				</div>
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
	input,
	select {
		padding: 0.25rem;
		margin: 0.5rem;
	}
</style>
