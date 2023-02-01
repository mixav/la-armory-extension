<script setup>
import {onMounted, reactive} from "vue";

const state = reactive({loadAtStart: false, modifyEngravings: false, displayQuality: false})

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
  }, function () {
    let status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

onMounted(() => {
  restore_settings();
})
</script>

<template>
  <div style="min-width:400px">
    <label>
      <input type="checkbox" v-model="state.loadAtStart">
      <span>Загружать всех персонажей при открытии страницы</span>
    </label>
    <br>
    <label>
      <input type="checkbox" v-model="state.modifyEngravings">
      Список гравировок одним блоком(без разделения на страницы)
    </label>
    <label>
      <input type="checkbox" v-model="state.displayQuality">
      Отображать полоску с качеством
    </label>

  </div>
  <div id="status"></div>
  <button @click="save_settings" id="save">Save</button>
</template>

<style scoped>
</style>
