<script setup lang="ts">
import { useGameStore } from '@/stores/game.ts'

const game = useGameStore()

const nextMove = () => {
  if (game.currentMove % 4 === 0) {
    console.log(game.monthlyReports)
  }
  game.nextMove()
  console.log(game.goalProgress)
}

// const handleAction = (action: string) => {
//   //game.processCardAction(action)
// }
</script>

<template>
  <div class="card-container">
    <div class="event-card" v-if="game.currentCard">
      <div class="card-header">
        <div class="card-type">{{ game.currentCard.type }}</div>
        <h2 class="card-title">{{ game.currentCard.title }}</h2>
      </div>

      <div class="card-content">
        <p class="card-description">{{ game.currentCard.description }}</p>

        <div class="card-details" v-if="game.currentCard.gain || game.currentCard.cost">
          <div v-if="game.currentCard.gain" class="detail-item positive">
            💰 +{{ game.currentCard.gain }} руб.
          </div>
          <div v-if="game.currentCard.cost" class="detail-item negative">
            💸 -{{ game.currentCard.cost }} руб.
          </div>
        </div>
      </div>

      <div class="card-actions">
<!--        <button-->
<!--          v-if="game.currentCard.action === 'accept_income'"-->
<!--          @click="handleAction('accept_income')"-->
<!--          class="btn btn-primary"-->
<!--        >-->
<!--          Получить доход-->
<!--        </button>-->

<!--        <button-->
<!--          v-if="game.currentCard.action === 'buy'"-->
<!--          @click="handleAction('buy')"-->
<!--          class="btn btn-primary"-->
<!--        >-->
<!--          Купить-->
<!--        </button>-->

        <button
          @click="nextMove"
          class="btn btn-secondary"
        >
          Пропустить
        </button>
      </div>
    </div>

    <div v-else class="no-card">
      <p>Нет активных событий</p>
      <button @click="nextMove" class="btn btn-primary">
        Следующий ход
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.event-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid #e0e0e0;
}

.card-header {
  margin-bottom: 16px;
}

.card-type {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 8px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.card-content {
  margin-bottom: 24px;
}

.card-description {
  color: #555;
  line-height: 1.5;
  margin-bottom: 16px;
}

.card-details {
  display: flex;
  gap: 12px;
}

.detail-item {
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
}

.detail-item.positive {
  background: #e8f5e8;
  color: #2e7d32;
}

.detail-item.negative {
  background: #ffebee;
  color: #c62828;
}

.card-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #2196f3;
  color: white;
}

.btn-primary:hover {
  background: #1976d2;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.no-card {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>
