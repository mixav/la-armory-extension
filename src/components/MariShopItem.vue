<template>
  <td>
    <div class="d-flex flex-row justify-start">
      <v-img
          max-height="24"
          max-width="32"
          :src=url alt=""/>
      <span>{{ name }}</span>
    </div>
  </td>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  name: String,
  url: String
})

</script>

<style scoped>

</style>