<script setup lang="ts">
import { type Asset, type Liability } from '@/stores/types.ts'
import { useGameStore } from '@/stores/game.ts'
import LiabilityItem from './LiabilityItem.vue'

const game = useGameStore()
</script>

<template>
  <div class="financial-statement">
    <h4 class="section-title">Активы ({{ game.totalAssetsValue.toLocaleString() }})</h4>

    <div class="assets-list">
      <template v-for="asset in game.assets as Asset[]" :key="asset.name">
        <div class="list-row" v-if="!asset.hidden">
          <span class="item-name">{{ asset.name }}</span>
          <span class="item-value">{{ asset.value.toLocaleString() }}</span>
        </div>
      </template>
    </div>

    <h4 class="section-title liabilities-title">Пассивы ({{ game.totalLiabilitiesValue.toLocaleString() }})</h4>

    <div class="liabilities-list">
      <template v-for="liability in game.liabilities as Liability[]" :key="liability.name">
        <LiabilityItem
          v-if="!liability.hidden"
          :liability="liability"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.financial-statement {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  max-width: 500px;
  margin: 0 auto;
}

.section-title {
  margin: 1.5em 0 0.75em 0;
  padding: 0.5em 0;
  border-bottom: 2px solid #e0e0e0;
  font-size: 1.1em;
  font-weight: 600;
  color: #2c3e50;
}

.liabilities-title {
  color: #c44569;
  border-bottom-color: #f8a5c2;
}

.assets-list,
.liabilities-list {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 0.5em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Стили для активов остаются здесь */
.assets-list .list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75em 1em;
  margin: 0.25em 0;
  background: white;
  border-radius: 6px;
  border-left: 4px solid #27ae60;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.assets-list .list-row:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.item-name {
  font-weight: 500;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.item-value {
  font-weight: 600;
  color: #27ae60;
}

/* Адаптивность */
@media (max-width: 480px) {
  .financial-statement {
    max-width: 100%;
    padding: 0 1em;
  }

  .assets-list .list-row {
    padding: 0.6em 0.8em;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25em;
  }

  .item-value {
    align-self: flex-end;
    font-size: 1.1em;
  }
}

/* Анимации */
.assets-list .list-row {
  animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Темная тема */
@media (prefers-color-scheme: dark) {
  .financial-statement {
    color: #f8f9fa;
    background: transparent;
  }

  .section-title {
    color: #f8f9fa;
    border-bottom-color: #495057;
  }

  .assets-list,
  .liabilities-list {
    background: #343a40;
  }

  .assets-list .list-row {
    background: #495057;
    color: #f8f9fa;
  }

  .item-name {
    color: #f8f9fa;
  }
}
</style>
