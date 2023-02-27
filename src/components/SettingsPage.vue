<script setup>
import {onMounted, reactive} from "vue";
import BlacklistSettings from "./BlacklistSettings.vue";

const state = reactive({loadAtStart: true, modifyEngravings: true, displayQuality: true, blacklist: true})

function restore_settings() {
  chrome.storage.sync.get({
    loadAtStart: true,
    modifyEngravings: true,
    displayQuality: true,
    blacklist: false
  }, function (items) {
    state.loadAtStart = items.loadAtStart;
    state.modifyEngravings = items.modifyEngravings;
    state.displayQuality = items.displayQuality;
    state.blacklist = items.blacklist;
  });
}

function save_settings() {
  chrome.storage.sync.set({
    loadAtStart: state.loadAtStart,
    modifyEngravings: state.modifyEngravings,
    displayQuality: state.displayQuality,
    blacklist: state.blacklist
  }, saved_successfully);
}

function saved_successfully() {
  const status = document.getElementById('status');
  status.textContent = 'Options saved.';
  setTimeout(function () {
    status.textContent = '';
  }, 750);
}

onMounted(() => {
  restore_settings();
})
</script>

<template>
  <v-switch
      inset
      hide-details
      v-model="state.loadAtStart"
      label="Загружать всех персонажей при открытии страницы"
  ></v-switch>
  <v-divider/>
  <v-switch
      inset
      hide-details
      v-model="state.modifyEngravings"
      label="Список гравировок одним блоком(без разделения на страницы)"
  ></v-switch>
  <v-divider/>
  <v-switch
      inset
      hide-details
      v-model="state.displayQuality"
      label="Отображать полоску с качеством"
  ></v-switch>
  <v-divider/>
  <v-switch
      inset
      hide-details
      v-model="state.blacklist"
      label="Черный список"
  ></v-switch>
  <blacklistSettings v-if="state.blacklist"/>
  <v-divider/>
  <v-col>
    <v-btn variant="outlined" @click="save_settings" id="save" color="normal">Save</v-btn>
  </v-col>
  <div id="status"></div>
</template>
