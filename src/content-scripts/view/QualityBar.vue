<template class="bar">
  <img :src=props.url alt="">
  <div class="bar">
    <div class="quality" :style=computedStyle>
    </div>
  </div>
</template>

<script setup>
import {COLOR_TABLE} from "../../constants/ColorTable";
import {computed} from "vue";

const props = defineProps(
    {
      quality: Number,
      url: String
    })


const computedStyle = computed(() => ({
  backgroundColor: (function () {
    let colorId;
    switch (true) {
      case props.quality === 0:
        colorId = 0;
        break;
      case props.quality < 39:
        colorId = 25;
        break;
      case props.quality < 70:
        colorId = 50;
        break;
      case props.quality < 90:
        colorId = 70;
        break;
      case props.quality < 100:
        colorId = 90;
        break;
      case props.quality === 100:
        colorId = 100;
        break;
    }
    return COLOR_TABLE[colorId];
  })(),
  width: props.quality !== 0 ? props.quality + '%' : '100%'
}))
</script>

<style scoped>
.bar {
  width: 90%;
  background-color: lightgray;
  border-radius: 3px;
  padding: 1px;
}

.quality {
  height: 6px;
  border-radius: 3px;
}
</style>