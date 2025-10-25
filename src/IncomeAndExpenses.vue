<script setup lang="ts">
import { useGameStore } from '@/stores/game.ts'
import { type IncomeExpenseItem } from '@/stores/types.ts'

const game = useGameStore();

</script>

<template>
  <h4>Доходы ({{ game.totalAssetIncome.toLocaleString() }})</h4>

  <template v-for="income in game.incomeBreakdown as IncomeExpenseItem[]" :key="income.name">
    <div class="list-row">
      <span>{{ income.name }}</span>
      <span>{{ income.amount.toLocaleString() }}</span>
    </div>
  </template>

  <h4>Расходы ({{game.totalLiabilityExpenses.toLocaleString()}})</h4>

  <template v-for="expense in game.expensesBreakdown as IncomeExpenseItem[]" :key="expense.name">
    <div class="list-row">
      <span>{{ expense.name }}</span>
      <span>{{ expense.amount.toLocaleString() }}</span>
    </div>
  </template>
</template>

<style scoped></style>
