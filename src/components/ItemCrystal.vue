<template>
  <td>
    {{ price }}
    <v-img
        max-height="24"
        max-width="32"
        src="" alt=""/>
  </td>
</template>

<script setup>
const props = defineProps({
  price: Number
})
</script>

<style scoped>

</style>