<template>
  <div style="justify-content: space-between;">
      <span :class="{'negative-engraving':isNegative}">
        {{ props.name }}
      </span>
    <span>
        {{ props.level }} ур.
      </span>
  </div>
  <div class="profile-ability-tooltip">
    <p>{{ props.tooltipText }}</p>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {NEGATIVE_ENGRAVINGS} from "../../constants/NegativeEngravings";

const props = defineProps(
    {
      name: String,
      level: Number,
      tooltipText: String
    })

const isNegative = computed(() =>
    NEGATIVE_ENGRAVINGS.includes(props.name)
)
</script>

<style scoped>
.negative-engraving {
  color: red !important;
}
</style>