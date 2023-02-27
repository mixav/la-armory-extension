<template>
  <v-card>
    <v-list-subheader inset>Добавить</v-list-subheader>
    <v-text-field @update:model-value="notifyUpdate" clearable label="Имя персонажа"></v-text-field>
    <v-divider></v-divider>
    <v-list v-if="state.characterInfo.type==='success'" lines="one">
      <v-list-item
          :title="state.characterInfo.name"
          :subtitle="state.characterInfo.gs+' ilvl'"
      >
        <template v-slot:prepend>
          <v-img width="36" :src="CLASS_TABLE[state.characterInfo.class].icon" alt=""/>
        </template>

        <template v-slot:append>
          <v-btn
              :icon="mdiPlusCircle"
              variant="plain"
              density="compact"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider v-if="state.characterInfo.type==='success'"></v-divider>
    <v-list lines="one">
      <v-list-item v-for="item in state.blacklistedCharacters"
                   :title="item.name"
                   :subtitle="item.class"
      >
        <template v-slot:prepend>
          <v-img width="36" :src="CLASS_TABLE[item.class].icon" alt=""/>
        </template>

        <template v-slot:append>
          <v-btn
              :icon="mdiCloseCircle"
              variant="plain"
              density="compact"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import {reactive} from "vue";
import {mdiCloseCircle,mdiPlusCircle} from '@mdi/js'
import {CLASS_TABLE} from "../constants/ClassTable";
import {getCharacterInfo} from "../content-scripts/modules/gs-personal.js"

const state = reactive(
    {
      blacklistedCharacters: [{name: 'Траути', class: 'Менестрель'}],
      characterInfo: {
        type: 'error'
      }
    })

const notifyUpdate = async function (value) {
  if (value.length >= 3) {
    state.characterInfo = await getCharacterInfo(value);
  }
}
</script>

<style scoped>

</style>