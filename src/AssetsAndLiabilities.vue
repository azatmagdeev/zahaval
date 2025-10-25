<script setup lang="ts">
import { type Asset, type Liability, useGameStore } from '@/stores/game.ts'

const game = useGameStore()
console.log(game.assets)
console.log(game.liabilities)

</script>

<template>
  <h4>Активы {{game.totalAssetsValue}}</h4>

  <template v-for="asset in game.assets as Asset[]" :key="asset.name">
    <div class="list-row" v-if="!asset.hidden">
      <span>{{ asset.name }}</span>
      <span>{{ asset.value }}</span>
    </div>
  </template>

  <h4>Пассивы {{game.totalLiabilitiesValue}}</h4>

  <template v-for="liability in game.liabilities as Liability[]" :key="liability.name">
    <div class="list-row">
      <span>{{ liability.name }}</span>
      <span>{{ liability.remainingAmount }}</span>
    </div>
  </template>
</template>

<style scoped>
h4 {
  margin: 1em 0;
}

.list-row {
  display: flex;
  justify-content: space-between;
}
</style>
