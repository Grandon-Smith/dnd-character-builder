<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const abilityScoreDataArr = ref([
  {
    score: 10,
    abilityName: 'Strength',
    bonus: 0
  },
  {
    score: 10,
    abilityName: 'Dexterity',
    bonus: 0
  },
  {
    score: 10,
    abilityName: 'Constitution',
    bonus: 0
  },
  {
    score: 10,
    abilityName: 'Intelligence',
    bonus: 0
  },
  {
    score: 10,
    abilityName: 'Wisdom',
    bonus: 0
  },
  {
    score: 10,
    abilityName: 'Charisma',
    bonus: 0
  },
])

const equipmentArr = ref([
  {
    itemName: 'Mithral Chain Mail',
    toolTip: '+2 AC',
  },
  {
    itemName: 'Mithral Chain Mail',
    toolTip: '+2 AC',
  },
  {
    itemName: 'Mithral Chain Mail',
    toolTip: '+2 AC',
  },
 
])
const skillsDataArr = ref([
  {
    bonus: '+3',
    skillName: 'Acrobatics',
  },
  {
    bonus: '+3',
    skillName: 'Animal Handling',
  },
  {
    bonus: '+3',
    skillName: 'Arcana',
  },
  {
    bonus: '+3',
    skillName: 'Athletics',
  },
])


</script>

<template>
  <div class="character-sheet-container">

  <section class="column-1">
    <div class="img-container"></div>
    <div class="health-info-container">
      <h2>Health</h2>
      <p>HP: 35/50</p>
      <div class="full-health-bar">
        <div class="current-health-bar"></div>
      </div>
    </div>
  </section>
  <section class="column-1">
    <div class="ability-score-container">
      <h2>Ability Scores</h2>
      <div class="ability-score-info-row" v-for="row in abilityScoreDataArr">
        <input type="text" v-model="row.score">
        <p>{{row.abilityName}}</p>
        <p>{{ row.bonus }}</p>
      </div>
    </div>

    <div class="ability-score-container">
      <h2>Skills</h2>
      <div class="ability-score-info-row" v-for="row in skillsDataArr">
        <p>{{ row.bonus }}</p>
        <p>{{row.skillName}}</p>
      </div>
    </div>
  </section>


  <section class="column-1">
    <div class="equipment-info">
      <h2>Equipment</h2>
      <div class="ability-score-info-row" v-for="row in equipmentArr">
        <p>{{ row.itemName }}</p>
        <p>{{row.toolTip}}</p>
      </div>
    </div>
  </section>
</div>

  
</template>

<style scoped>
.character-sheet-container {
 display: grid;
 grid-template-columns: 1fr 1fr 1fr;
}
.column-1 {
border: 1px solid blue;
padding: 1rem;
}
.img-container {
  background-color: black;
  height: 200px;
  width: 200px;
}

.full-health-bar {
  background-color: rgb(132, 0, 0);
  position: relative;
  height: 20px;
}

.current-health-bar {
  background-color: rgb(255, 64, 64);
  height: 100%;
  position: absolute;
  width: 60%;
  left: 0;
  bottom: 0;
}

.ability-score-info-row {
  display: flex;
}

.ability-score-container {
  border: 1px solid black;
  margin-bottom: 1rem;
}
</style>
