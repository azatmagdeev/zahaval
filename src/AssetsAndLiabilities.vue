<script setup lang="ts">
import { actives } from '@/data/assets.ts'
import { passives } from '@/data/assets.ts'
import type { Active } from '@/stores/types.ts'
</script>

<template>
  <h4>Активы</h4>

  <template v-for="active in actives as Active[]" :key="active.name">
    <div class="list-row" v-if="!active.hidden">
      <span>{{ active.name }}</span>
      <span>{{ active.worth }}/{{ active.income }}</span>
    </div>
  </template>

  <h4>Пассивы</h4>

  <template v-for="passive in passives as Passive[]" :key="passive.name">
    <div class="list-row">
      <span>{{ passive.name }}</span>
      <span>{{ passive.worth }}/{{ passive.cost }}</span>
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
