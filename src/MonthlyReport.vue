<script setup lang="ts">
import { useGameStore } from '@/stores/game.ts'
import { usePopup } from '@/stores/popup.ts'

const game = useGameStore()
const monthlyReports = game.monthlyReports
const monthlyReport = monthlyReports[monthlyReports.length - 1]
const popup = usePopup()

const closePopup = () => {
  popup.close()
}
</script>

<template>
  <div class="report" v-if="monthlyReport">
    <h2 class="report-title">Отчет за месяц</h2>

    <div class="report-item">
      <span class="label">Месяц:</span>
      <span class="value">{{ monthlyReport.month }}</span>
    </div>

    <div class="report-item">
      <span class="label">Доход:</span>
      <span class="value positive">{{ monthlyReport.income.toLocaleString() }} ₽</span>
    </div>

    <div class="report-item">
      <span class="label">Расход:</span>
      <span class="value negative">-{{ monthlyReport.expenses.toLocaleString() }} ₽</span>
    </div>

    <div class="report-item">
      <span class="label">Денежный поток:</span>
      <span class="value" :class="monthlyReport.cashFlow >= 0 ? 'positive' : 'negative'">
        {{ monthlyReport.cashFlow >= 0 ? '+' : '' }}{{ monthlyReport.cashFlow.toLocaleString() }} ₽
      </span>
    </div>

    <button class="close-button" @click="closePopup">Продолжить</button>
  </div>
</template>

<style scoped>
.report {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  max-width: 300px;
  padding: 16px;
  margin: auto;
}

.report-title {
  text-align: center;
  color: #333;
  margin-bottom: 16px;
  font-size: 1.2em;
  border-bottom: 2px solid #eee;
  padding-bottom: 8px;
}

.report-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 4px 0;
}

.label {
  font-weight: bold;
  color: #333;
}

.value {
  font-weight: 500;
}

.positive {
  color: #22c55e;
}

.negative {
  color: #ef4444;
}

.close-button {
  width: 100%;
  padding: 10px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: #2563eb;
}

.close-button:active {
  background-color: #1d4ed8;
}
</style>
