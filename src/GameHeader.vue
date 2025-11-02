<script lang="ts" setup>
import { useGameStore } from '@/stores/game.ts'
import ContextPopup from '@/ContextPopup.vue'
import { ref } from 'vue'

const game = useGameStore()

const isOpenCreditCardMenu = ref(false)

</script>

<template>
  <header class="header">
    <!-- Прогресс-бар -->
    <div class="progress-section">
      <div>
        <progress class="progress-bar" max="100" :value="game.goalProgress"></progress>

        <div class="progress-labels">
          <span>Прогресс {{ game.goalProgress }}%</span>
        </div>
      </div>
      <div>
        🗓️ <span class="progress-labels">Осталось:</span> {{ game.remainingMonths }}
        <span class="progress-labels">мес.</span>
      </div>
    </div>

    <!-- Ключевые показатели -->
    <div class="indicators">
      <div class="indicator">
        <span class="indicator-label">Денежный поток</span>
        <span class="indicator-value positive">{{ game.cashFlow.toLocaleString() }}</span>
      </div>
      <div class="indicator">
        <span class="indicator-label">Наличные</span>
        <span class="indicator-value">{{ game.cashAsset.value.toLocaleString() }}р</span>
      </div>
      <div class="indicator" @click="isOpenCreditCardMenu=true">
        <span class="indicator-label">Долг по кредитке</span>
        <span class="indicator-value negative">{{ game.creditCard.remainingAmount.toLocaleString() }}</span>
        <ContextPopup :open="isOpenCreditCardMenu"/>
      </div>
    </div>
  </header>
</template>

<style>
/* ШАПКА */
.header {
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 16px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.progress-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-bar {
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin: 8px 0;
}

.progress-labels {
  font-size: 11px;
  color: #7f8c8d;
}

/* Индикаторы */
.indicators {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}

.indicator-label {
  font-size: 10px;
  color: #7f8c8d;
  margin-bottom: 4px;
  text-align: center;
}

.indicator-value {
  font-size: 14px;
  font-weight: 700;
  color: #2c3e50;
}

.indicator-value.positive {
  color: #27ae60;
}

.indicator-value.negative {
  color: #e74c3c;
}

@media (max-height: 600px) {
  .header {
    padding: 8px 12px;
  }

  .indicator-label {
    font-size: 9px;
  }

  .indicator-value {
    font-size: 12px;
  }
}

.header {
  animation: fadeIn 0.3s ease;
}
</style>
