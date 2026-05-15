<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "../store";
import NavHeader from "../components/NavHeader.vue";
import { useRouter } from "vue-router";
import { characterServices } from "../services/characters";
import { classData } from "../data/classData";
import { backgroundData } from "../data/backgroundData";
import { raceData } from "../data/raceData";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
  ItemActions,
  ItemMedia,
  ItemGroup,
  ItemSeparator,
} from "@/components/ui/item";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import {
  PhIdentificationCard,
  PhFlag,
  PhSword,
  PhTrash,
  PhUserPlus,
} from "@phosphor-icons/vue";
const store = useStore();
const router = useRouter();

const character = ref({
  name: "Legolas Greenleaf",
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

const newClassLevel = ref(1);
const newClassName = ref("");

const selectedRace = computed(() => character.value.race.toLowerCase());

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

const racesList = Object.keys(raceData);

const addClass = () => {
  character.value.classes.push({
    name: newClassName.value,
    level: newClassLevel.value,
  });
  newClassName.value = "";
  newClassLevel.value = 1;
};

const removeClass = (index) => {
  character.value.classes.splice(index, 1);
};

const selectedClassNames = computed(() =>
  character.value.classes.map((c) => c.name),
);
const selectedBackground = computed(
  () => character.value.background?.toLowerCase() || "",
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
  backgroundSelectableSkills.value.forEach((skill) => skills.add(skill));

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
    0,
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
    (skill) => !autoSkills.value.includes(skill),
  ).length;
});

// Whether selecting more is allowed or not
const disableUnselected = computed(
  () => selectedSkillCount.value >= maxSkillChoices.value,
);

async function submitCharacter() {
  try {
    // await store.saveNewCharacterLocally(character.value);
    // router.push("/choose-character");
    character.value.level = character.value.classes.reduce(
      (sum, c) => sum + c.level,
      0,
    );

    const options = {
      method: "POST",
      credentials: "include",
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
      newList.includes(skill),
    );
});

watch(
  [autoSkills],
  () => {
    const current = character.value.skillProficiencies;

    // Remove any skill that is now auto
    const cleaned = current.filter(
      (skill) => !autoSkills.value.includes(skill),
    );

    character.value.skillProficiencies = [...autoSkills.value, ...cleaned];
  },
  { immediate: true },
);
</script>

<template>
  <div class="character-form max-w-4xl mx-auto p-8">
    <NavHeader headerText="Create Your Character" />
    <form @submit.prevent="submitCharacter" class="form-container">
      <!-- Basic Information -->
      <Card class="w-full mb-6">
        <CardHeader>
          <CardTitle class="text-2xl font-black"> Basic Information </CardTitle>
          <CardDescription class="scripty">
            Enter your character's basic information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ItemGroup class="gap-4">
            <Item>
              <ItemMedia variant="icon">
                <PhIdentificationCard />
              </ItemMedia>
              <ItemContent>
                <ItemTitle class="fonty font-extrabold"
                  >Character Name</ItemTitle
                >
                <ItemDescription class="scripty"
                  >Enter your character's name</ItemDescription
                >
              </ItemContent>
              <ItemActions>
                <Input
                  id="name"
                  v-model="character.name"
                  required
                  maxlength="50"
                  class="w-full max-w-[250px] fonty"
                />
              </ItemActions>
            </Item>
            <ItemSeparator />
            <Item>
              <ItemMedia variant="icon">
                <PhFlag />
              </ItemMedia>
              <ItemContent>
                <ItemTitle class="fonty font-extrabold">Race</ItemTitle>
                <ItemDescription class="scripty"
                  >Choose your character's race</ItemDescription
                >
              </ItemContent>
              <ItemActions>
                <Select id="race" v-model="character.race" required>
                  <SelectTrigger class="fonty">
                    <SelectValue placeholder="Select a race" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      class="fonty"
                      v-for="race in racesList"
                      :value="race"
                      :key="race"
                    >
                      {{ race.slice(0, 1).toUpperCase() + race.slice(1) }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </ItemActions>
            </Item>
            <ItemSeparator />
            <Item>
              <ItemMedia variant="icon">
                <PhSword />
              </ItemMedia>
              <ItemContent>
                <ItemTitle class="fonty font-extrabold">Background</ItemTitle>
                <ItemDescription class="scripty"
                  >Choose your character's background</ItemDescription
                >
              </ItemContent>
              <ItemActions>
                <Select id="background" v-model="character.background" required>
                  <SelectTrigger class="fonty">
                    <SelectValue placeholder="Select a background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      class="fonty"
                      v-for="bg in Object.keys(backgroundData)"
                      :value="bg"
                      :key="bg"
                    >
                      {{ bg.slice(0, 1).toUpperCase() + bg.slice(1) }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </ItemActions>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>

      <Card class="w-full mb-6">
        <CardHeader>
          <CardTitle class="text-2xl font-black"> Classes </CardTitle>
          <CardDescription class="scripty">
            Select your character's classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ItemGroup class="flex-row flex-wrap gap-2">
            <Item
              v-for="(cls, index) in character.classes"
              :key="index"
              class="max-w-sm min-w-sm"
            >
              <ItemContent>
                <ItemTitle class="fonty">{{
                  cls.name.slice(0, 1).toUpperCase() + cls.name.slice(1)
                }}</ItemTitle>
                <ItemDescription class="scripty"
                  >Level {{ cls.level }}</ItemDescription
                >
              </ItemContent>
              <ItemActions>
                <Button variant="destructive" @click="removeClass(index)">
                  <PhTrash />
                </Button>
              </ItemActions>
            </Item>
          </ItemGroup>
          <ItemSeparator class="my-4" />
          <div class="class-entry">
            <div
              class="class-inputs-row align-center flex flex-row gap-2 flex-basis-1/2"
            >
              <div class="form-group grid gap-1.5 mb-4">
                <Label for="class-name">Class Name</Label>
                <Select id="class-name" v-model="newClassName" required>
                  <SelectTrigger class="min-w-sm fonty">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent class="fonty">
                    <SelectItem
                      class="fonty"
                      v-for="charClass in store.classesList"
                      :value="charClass"
                      :key="charClass"
                    >
                      {{
                        charClass.slice(0, 1).toUpperCase() + charClass.slice(1)
                      }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="form-group">
                <NumberField id="class-level" :model-value="newClassLevel">
                  <Label for="class-level">Class Level</Label>
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
              </div>
            </div>
          </div>

          <ButtonGroup>
            <Button
              :disabled="store.fetchingData"
              type="button"
              @click="addClass"
              class="font-bold"
            >
              Add Class
            </Button>
            <Button
              :disabled="store.fetchingData"
              variant="outline"
              type="button"
              @click="removeClass(index)"
              class="font-bold"
            >
              Remove Class
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <!-- Ability Scores -->
      <Card class="mb-6">
        <CardHeader>
          <CardTitle class="text-2xl font-black">Ability Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <ItemGroup
            class="ability-scores-grid grid md:grid-cols-2 lg:grid-cols-3"
          >
            <Item
              v-for="(value, stat) in character.abilityScores"
              :key="stat"
              class="ability-score-item"
            >
              <NumberField
                :id="stat"
                :default-value="18"
                v-model="character.abilityScores[stat]"
                :min="0"
              >
                <Label class="text-lg font-bold" :for="stat">{{
                  stat.charAt(0).toUpperCase() + stat.slice(1)
                }}</Label>
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput class="fonty" />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>

      <!-- Combat Stats -->
      <Card class="mb-6">
        <CardHeader>
          <CardTitle class="text-2xl font-black">Combat Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <ItemGroup
            class="combat-stats-grid grid sm:grid-cols-2 lg:grid-cols-4"
          >
            <Item class="form-group">
              <NumberField
                id="hp-max"
                :default-value="10"
                v-model="character.hitPoints.max"
                :min="0"
              >
                <Label class="text-lg font-bold" for="hp-max">Max HP</Label>
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </Item>

            <Item class="form-group">
              <NumberField
                id="armor-class"
                :default-value="10"
                v-model="character.armorClass"
                :min="0"
              >
                <Label class="text-lg font-bold" for="armor-class"
                  >Armor Class</Label
                >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </Item>

            <Item class="form-group">
              <NumberField
                id="speed"
                :default-value="30"
                v-model="character.speed"
                :min="0"
              >
                <Label class="text-lg font-bold" for="speed">Speed</Label>
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </Item>

            <Item class="form-group">
              <NumberField
                id="initiative"
                :default-value="0"
                v-model="character.initiative"
                :min="-100"
                :max="100"
              >
                <Label class="text-lg font-bold" for="initiative"
                  >Initiative</Label
                >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>

      <!-- Skill Proficiencies -->
      <Card class="mb-6">
        <CardHeader>
          <CardTitle class="text-2xl font-black">Skill Proficiencies</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="skill-info">
            <p>
              Choose up to <strong>{{ maxSkillChoices }}</strong> skills
              <span class="skill-count"
                >({{ selectedSkillCount }}/{{ maxSkillChoices }} selected)</span
              >
            </p>
          </div>

          <!-- Auto-granted skills -->
          <div v-if="autoSkills.length" class="auto-skills">
            <h3>Automatic Proficiencies</h3>
            <ul>
              <li v-for="skill in autoSkills" :key="'auto-' + skill">
                ✔ {{ skill }}
              </li>
            </ul>
          </div>

          <!-- User-selectable skills -->
          <div class="selectable-skills">
            <h3>Select Additional Skills</h3>
            <div class="skills-grid">
              <Label
                v-for="skill in availableSkills"
                :key="skill"
                class="skill-checkbox"
              >
                <Checkbox
                  :value="skill"
                  v-model="character.skillProficiencies"
                  :disabled="
                    disableUnselected &&
                    !character.skillProficiencies.includes(skill)
                  "
                />
                <span>{{ skill }}</span>
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Submit -->
      <div class="form-actions">
        <Button
          size="lg"
          :disabled="store.fetchingData"
          type="submit"
          class="btn-1 btn-submit w-full cursor-pointer"
        >
          <PhUserPlus />
          Create Character
        </Button>
      </div>
    </form>
  </div>
</template>
