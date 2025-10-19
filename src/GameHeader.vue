<template>
  <header class="header">
    <!-- Прогресс-бар -->
    <div class="progress-section">
      <div class="progress-title">Общий долг: 2 845 000 руб</div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: 35 }"></div>
      </div>
      <div class="progress-labels">
        <span>Начало: 3 100 000р</span>
        <span>Цель: 0 руб!</span>
      </div>
    </div>

    <!-- Ключевые показатели -->
    <div class="indicators">
      <div class="indicator">
        <span class="indicator-label">Денежный поток</span>
        <span class="indicator-value positive">+45 000р</span>
      </div>
      <div class="indicator">
        <span class="indicator-label">Наличные</span>
        <span class="indicator-value">{{ 85000 + useCounterStore().count }}р</span>
      </div>
      <div class="indicator">
        <span class="indicator-label">Кредитка</span>
        <span class="indicator-value negative">-15 000р</span>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter.ts'
</script>

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
  margin-bottom: 12px;
}

.progress-title {
  font-size: 14px;
  color: #2c3e50;
  margin-bottom: 8px;
  text-align: center;
  font-weight: 600;
}

.progress-bar {
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin: 8px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #e74c3c, #27ae60);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
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

  .progress-title {
    font-size: 12px;
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
