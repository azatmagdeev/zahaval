<script setup lang="ts">
import { useGameStore } from '@/stores/game.ts'
import { type IncomeExpenseItem } from '@/stores/types.ts'

const game = useGameStore()
</script>

<template>
  <div class="income-expense-statement">
    <h4 class="section-title">Доходы ({{ game.totalAssetIncome.toLocaleString() }})</h4>

    <div class="income-list">
      <template v-for="income in game.incomeBreakdown as IncomeExpenseItem[]" :key="income.name">
        <div class="list-row" v-if="income.amount">
          <span class="item-name">{{ income.name }}</span>
          <span class="item-value income-value">{{ income.amount.toLocaleString() }}</span>
        </div>
      </template>
    </div>

    <h4 class="section-title expenses-title">Расходы ({{ game.totalLiabilityExpenses.toLocaleString() }})</h4>

    <div class="expenses-list">
      <template v-for="expense in game.expensesBreakdown as IncomeExpenseItem[]" :key="expense.name">
        <div class="list-row" v-if="expense.amount">
          <span class="item-name">{{ expense.name }}</span>
          <span class="item-value expense-value">{{ expense.amount.toLocaleString() }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.income-expense-statement {
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

.expenses-title {
  color: #c44569;
  border-bottom-color: #f8a5c2;
}

.income-list,
.expenses-list {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 0.5em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75em 1em;
  margin: 0.25em 0;
  background: white;
  border-radius: 6px;
  border-left: 4px solid transparent;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.income-list .list-row {
  border-left-color: #27ae60;
}

.expenses-list .list-row {
  border-left-color: #e74c3c;
}

.list-row:hover {
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
}

.income-value {
  color: #27ae60;
}

.expense-value {
  color: #e74c3c;
}

/* Индикаторы для положительных/отрицательных значений */
.income-value::before {
  content: "+";
  margin-right: 2px;
}

/* Адаптивность */
@media (max-width: 480px) {
  .income-expense-statement {
    max-width: 100%;
    padding: 0 1em;
  }

  .list-row {
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
.list-row {
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
  .income-expense-statement {
    color: #f8f9fa;
    background: transparent;
  }

  .section-title {
    color: #f8f9fa;
    border-bottom-color: #495057;
  }

  .income-list,
  .expenses-list {
    background: #343a40;
  }

  .list-row {
    background: #495057;
    color: #f8f9fa;
  }

  .item-name {
    color: #f8f9fa;
  }
}

/* Дополнительные стили для пустых состояний */
.income-list:empty::after,
.expenses-list:empty::after {
  content: "Нет данных";
  display: block;
  text-align: center;
  padding: 2em;
  color: #6c757d;
  font-style: italic;
}
</style>
