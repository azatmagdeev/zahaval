<script setup lang="ts">
import { type Asset, type Liability } from '@/stores/types.ts'
import { useGameStore } from '@/stores/game.ts'

const game = useGameStore()
</script>

<template>
  <h4>Активы ({{ game.totalAssetsValue.toLocaleString() }})</h4>

  <template v-for="asset in game.assets as Asset[]" :key="asset.name">
    <div class="list-row" v-if="!asset.hidden">
      <span>{{ asset.name }}</span>
      <span>{{ asset.value.toLocaleString() }}</span>
    </div>
  </template>

  <h4>Пассивы ({{ game.totalLiabilitiesValue.toLocaleString() }})</h4>

  <template v-for="liability in game.liabilities as Liability[]" :key="liability.name">
    <div class="list-row" v-if="!liability.hidden">
      <span>{{ liability.name }}</span>
      <span>{{ liability.remainingAmount.toLocaleString() }}</span>
    </div>
  </template>
</template>

<style>
h4 {
  margin: 1em 0;
}

.list-row {
  display: flex;
  justify-content: space-between;
}
</style>
