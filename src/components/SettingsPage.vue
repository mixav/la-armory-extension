<script setup>
import {onMounted, reactive} from "vue";

const state = reactive({loadAtStart: true, modifyEngravings: true, displayQuality: true})

function restore_settings() {
  chrome.storage.sync.get({
    loadAtStart: true,
    modifyEngravings: true,
    displayQuality: true
  }, function (items) {
    state.loadAtStart = items.loadAtStart;
    state.modifyEngravings = items.modifyEngravings;
    state.displayQuality = items.displayQuality;
  });
}

function save_settings() {
  chrome.storage.sync.set({
    loadAtStart: state.loadAtStart,
    modifyEngravings: state.modifyEngravings,
    displayQuality: state.displayQuality
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
  <div>
    <label>
      <input type="checkbox" v-model="state.loadAtStart">
      Загружать всех персонажей при открытии страницы
    </label>
    <br>
    <label>
      <input type="checkbox" v-model="state.modifyEngravings">
      Список гравировок одним блоком(без разделения на страницы)
    </label>
    <br>
    <label>
      <input type="checkbox" v-model="state.displayQuality">
      Отображать полоску с качеством
    </label>
  </div>
  <v-btn variant="outlined" @click="save_settings" id="save" color="normal">Save</v-btn>
  <div id="status"></div>
</template>
