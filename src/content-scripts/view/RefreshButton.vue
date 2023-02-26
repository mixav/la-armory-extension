<template>
  <button @click="refreshCharactersGS">&#8635;</button>
</template>

<script setup>
import {loadAllCharacters} from "../modules/gs-personal";

const props = defineProps(
    {
      characterList: Array
    })

function refreshCharactersGS() {
  loadAllCharacters(props.characterList)
}
</script>

<style scoped>

</style>