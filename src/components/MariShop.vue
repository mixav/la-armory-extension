<template>
  <v-table>
    <tbody>
    <tr v-for="item in lastGoods">
      <MariShopItem
          :name=item.name
          :url=getImage(item.goodsId)
      />
      <ItemCrystal :price=item.price
      />
    </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import MariShopItem from "./MariShopItem.vue";
import ItemCrystal from "./ItemCrystal.vue";

const goodsMap = ref(new Map())
const lastVersion = ref('')
const nextRenewDate = ref('')
const itemData = ref([])

onMounted(() => {
  chrome.runtime.sendMessage({
        type: 'load-mari-shop'
      }, (response) => {
        goodsMap.value = response.goodsData.goodsList.reduce(
            (entryMap, e) => entryMap.set(e.goodsVersion, [...entryMap.get(e.goodsVersion) || [], e]),
            new Map()
        );
        lastVersion.value = response.goodsData.latestGoodsVersion
        nextRenewDate.value = response.goodsData.nextRenewDate
        itemData.value = response.itemData.data.reduce((obj, item) => (obj[item.goods_id] = item.image, obj), {});
      }
  )
})

const nextDate = computed(() =>
    new Date(nextRenewDate.value * 1000)
)
const lastGoods = computed(() => {
      const timestamps = Array.from(goodsMap.value.keys());
      if (timestamps.find(el => el === lastVersion.value)) {
        return goodsMap.value.get(lastVersion.value)
      } else {
        return goodsMap.value.get(timestamps.sort().reverse()[0])
      }
    }
)

const getImage = function (id) {
  return itemData.value[id];
}

</script>

<style scoped>

</style>