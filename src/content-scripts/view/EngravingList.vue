<template>
  <h4>Гравировки</h4>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <ul class="swiper-slide">
        <li
          v-for="engravingInfo in engravingList"
          class="swiper-slide-item"
        >
          <engraving
              :name="engravingInfo.name"
              :level="engravingInfo.level"
              :tooltip-text="engravingInfo.tooltipText"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Engraving from "./Engraving.vue";

const props = defineProps(
    {
      engravingList: Array
    })

</script>

<style scoped>
.swiper-slide-item {
  padding: 5px 30px !important;
}
</style>