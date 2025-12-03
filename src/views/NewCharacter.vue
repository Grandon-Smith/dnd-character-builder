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
		background: "acolyte",
		skillProficiencies: [],
		savingThrowProficiencies: [],
		inventory: [],
		spells: [],
		notes: "",
		player: "",
	});

	const classData = {
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

		bard: {
			skillChoices: 3,
			skills: [
				"Acrobatics",
				"Animal Handling",
				"Arcana",
				"Athletics",
				"Deception",
				"History",
				"Insight",
				"Intimidation",
				"Investigation",
				"Medicine",
				"Nature",
				"Perception",
				"Performance",
				"Persuasion",
				"Religion",
				"Sleight of Hand",
				"Stealth",
				"Survival",
			],
			autoProficiencies: [],
		},

		cleric: {
			skillChoices: 2,
			skills: [
				"History",
				"Insight",
				"Medicine",
				"Persuasion",
				"Religion",
			],
			autoProficiencies: [],
		},

		druid: {
			skillChoices: 2,
			skills: [
				"Arcana",
				"Animal Handling",
				"Insight",
				"Medicine",
				"Nature",
				"Perception",
				"Religion",
				"Survival",
			],
			autoProficiencies: [],
		},

		fighter: {
			skillChoices: 2,
			skills: [
				"Acrobatics",
				"Animal Handling",
				"Athletics",
				"History",
				"Insight",
				"Intimidation",
				"Perception",
				"Survival",
			],
			autoProficiencies: [],
		},

		monk: {
			skillChoices: 2,
			skills: [
				"Acrobatics",
				"Athletics",
				"History",
				"Insight",
				"Religion",
				"Stealth",
			],
			autoProficiencies: [],
		},

		paladin: {
			skillChoices: 2,
			skills: [
				"Athletics",
				"Insight",
				"Intimidation",
				"Medicine",
				"Persuasion",
				"Religion",
			],
			autoProficiencies: [],
		},

		ranger: {
			skillChoices: 3,
			skills: [
				"Animal Handling",
				"Athletics",
				"Insight",
				"Investigation",
				"Nature",
				"Perception",
				"Stealth",
				"Survival",
			],
			autoProficiencies: [],
		},

		rogue: {
			skillChoices: 4,
			skills: [
				"Acrobatics",
				"Athletics",
				"Deception",
				"Insight",
				"Intimidation",
				"Investigation",
				"Perception",
				"Performance",
				"Persuasion",
				"Sleight of Hand",
				"Stealth",
			],
			autoProficiencies: ["Stealth", "Thieves' Tools"],
			// Tools will need separate handling
		},

		sorcerer: {
			skillChoices: 2,
			skills: [
				"Arcana",
				"Deception",
				"Insight",
				"Intimidation",
				"Persuasion",
				"Religion",
			],
			autoProficiencies: [],
		},

		warlock: {
			skillChoices: 2,
			skills: [
				"Arcana",
				"Deception",
				"History",
				"Intimidation",
				"Investigation",
				"Nature",
				"Religion",
			],
			autoProficiencies: [],
		},

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
			autoProficiencies: ["Arcana"],
		},
	};
	const backgroundData = {
		acolyte: {
			autoProficiencies: ["Insight", "Religion"],
			skillChoices: 0,
			skills: [],
		},

		charlatan: {
			autoProficiencies: ["Deception", "Sleight of Hand"],
			skillChoices: 0,
			skills: [],
		},

		criminal: {
			autoProficiencies: ["Deception", "Stealth"],
			skillChoices: 0,
			skills: [],
		},

		entertainer: {
			autoProficiencies: ["Acrobatics", "Performance"],
			skillChoices: 0,
			skills: [],
		},

		folkhero: {
			autoProficiencies: ["Animal Handling", "Survival"],
			skillChoices: 0,
			skills: [],
		},

		guildartisan: {
			autoProficiencies: ["Insight", "Persuasion"],
			skillChoices: 0,
			skills: [],
		},

		hermit: {
			autoProficiencies: ["Medicine", "Religion"],
			skillChoices: 0,
			skills: [],
		},

		noble: {
			autoProficiencies: ["History", "Persuasion"],
			skillChoices: 0,
			skills: [],
		},

		outlander: {
			autoProficiencies: ["Athletics", "Survival"],
			skillChoices: 0,
			skills: [],
		},

		sage: {
			autoProficiencies: ["Arcana", "History"],
			skillChoices: 0,
			skills: [],
		},

		sailor: {
			autoProficiencies: ["Athletics", "Perception"],
			skillChoices: 0,
			skills: [],
		},

		soldier: {
			autoProficiencies: ["Athletics", "Intimidation"],
			skillChoices: 0,
			skills: [],
		},

		urchin: {
			autoProficiencies: ["Sleight of Hand", "Stealth"],
			skillChoices: 0,
			skills: [],
		},
	};
	const raceData = {
		human: {
			skillChoices: 0,
			skills: [],
			autoProficiencies: [],
		},

		"variant human": {
			skillChoices: 1,
			skills: [
				"Acrobatics",
				"Animal Handling",
				"Arcana",
				"Athletics",
				"Deception",
				"History",
				"Insight",
				"Intimidation",
				"Investigation",
				"Medicine",
				"Nature",
				"Perception",
				"Performance",
				"Persuasion",
				"Religion",
				"Sleight of Hand",
				"Stealth",
				"Survival",
			],
			autoProficiencies: [],
		},

		elf: {
			skillChoices: 0,
			skills: [],
			autoProficiencies: [],
		},

		"wood elf": {
			skillChoices: 0,
			skills: [],
			autoProficiencies: ["Perception"], // PHB
		},

		"high elf": {
			skillChoices: 0,
			skills: [],
			autoProficiencies: [], // no skills
		},

		dwarf: {
			skillChoices: 0,
			skills: [],
			autoProficiencies: [], // no skills
		},

		halfling: {
			skillChoices: 0,
			skills: [],
			autoProficiencies: [],
		},

		halfelf: {
			skillChoices: 2,
			skills: [
				"Acrobatics",
				"Animal Handling",
				"Arcana",
				"Athletics",
				"Deception",
				"History",
				"Insight",
				"Intimidation",
				"Investigation",
				"Medicine",
				"Nature",
				"Perception",
				"Performance",
				"Persuasion",
				"Religion",
				"Sleight of Hand",
				"Stealth",
				"Survival",
			],
			autoProficiencies: [],
		},

		halforc: {
			skillChoices: 0,
			skills: [],
			autoProficiencies: ["Intimidation"], // PHB
		},

		tiefling: {
			skillChoices: 0,
			skills: [],
			autoProficiencies: [],
		},
	};

	const selectedRace = computed(() =>
		character.value.race.toLowerCase()
	);

	// Race-based auto skills
	const raceAutoSkills = computed(() => {
		const race = raceData[selectedRace.value];
		return race?.autoProficiencies || [];
	});

	// Race selectable skills
	const raceSelectableSkills = computed(() => {
		const race = raceData[selectedRace.value];
		return race?.skills || [];
	});

	const raceSkillChoices = computed(() => {
		const race = raceData[selectedRace.value];
		return race?.skillChoices || 0;
	});

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
	const selectedBackground = computed(
		() => character.value.background?.toLowerCase() || ""
	);

	const backgroundAutoSkills = computed(() => {
		const bg = backgroundData[selectedBackground.value];
		return bg?.autoProficiencies || [];
	});

	const backgroundSelectableSkills = computed(() => {
		const bg = backgroundData[selectedBackground.value];
		return bg?.skills || [];
	});

	const backgroundSkillChoices = computed(() => {
		const bg = backgroundData[selectedBackground.value];
		return bg?.skillChoices || 0;
	});

	const availableSkills = computed(() => {
		const skills = new Set();

		// Class choose-from
		selectedClassNames.value.forEach((cls) => {
			classData[cls]?.skills.forEach((skill) => skills.add(skill));
		});

		// Race choose-from
		raceSelectableSkills.value.forEach((skill) => skills.add(skill));

		// Background choose-from (PHB doesn't use this, but other books do)
		backgroundSelectableSkills.value.forEach((skill) =>
			skills.add(skill)
		);

		// Remove any auto skills
		autoSkills.value.forEach((auto) => skills.delete(auto));
		raceAutoSkills.value.forEach((auto) => skills.delete(auto));
		backgroundAutoSkills.value.forEach((auto) => skills.delete(auto));

		return [...skills];
	});

	// Total number of skills they are allowed to choose
	const maxSkillChoices = computed(() => {
		const classChoices = selectedClassNames.value.reduce(
			(sum, cls) => sum + (classData[cls]?.skillChoices || 0),
			0
		);

		const raceChoices = raceSkillChoices.value;
		const backgroundChoices = backgroundSkillChoices.value;

		return classChoices + raceChoices + backgroundChoices;
	});

	// Auto-proficiencies (free)
	const autoSkills = computed(() => {
		const set = new Set();

		// Class auto
		selectedClassNames.value.forEach((cls) => {
			classData[cls]?.autoProficiencies.forEach((s) => set.add(s));
		});

		// Race auto
		raceAutoSkills.value.forEach((s) => set.add(s));

		// Background auto
		backgroundAutoSkills.value.forEach((s) => set.add(s));

		return [...set];
	});

	// Combine selected + auto
	const selectedSkillCount = computed(() => {
		// Only count MANUAL selections
		return character.value.skillProficiencies.filter(
			(skill) => !autoSkills.value.includes(skill)
		).length;
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
		[autoSkills],
		() => {
			const current = character.value.skillProficiencies;

			// Remove any skill that is now auto
			const cleaned = current.filter(
				(skill) => !autoSkills.value.includes(skill)
			);

			character.value.skillProficiencies = [
				...autoSkills.value,
				...cleaned,
			];
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
