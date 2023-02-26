<script setup>
import SettingsPage from './components/SettingsPage.vue'
import {ref} from 'vue'
import MariShop from "./components/MariShop.vue";

const tab = ref(null)
</script>

<template>
  <div style="min-width:600px">
    <v-card>
      <v-tabs
          v-model="tab"
          bg-color="primary"
      >
<!--        <v-tab value="shop">Shop</v-tab>-->
        <v-tab value="settings">Settings</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
<!--          <v-window-item value="shop">-->
<!--            <MariShop/>-->
<!--          </v-window-item>-->
          <v-window-item value="settings">
            <SettingsPage/>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>
