<script setup lang="ts"></script>

<template>
  <main class="main-content">
    <div class="content-placeholder">
      <div class="money-emoji">💰</div>
      <h1 class="game-title">Расплатись за HAVAL</h1>
      <p class="game-subtitle">Финансовый симулятор выживания</p>

      <div class="goal-section">
        <div class="goal-title">🎯 Цель игры</div>
        <p class="goal-text">
          Избавься от всех долгов! Тебя ждут кредиты, ипотека и долги родственникам. Принимай мудрые
          финансовые решения, инвестируй в себя и стань финансово свободным!
        </p>
      </div>

      <button class="next-button" onclick="nextPage()">Начать борьбу с долгами →</button>
    </div>
  </main>
</template>

<style scoped>
/* ОСНОВНОЕ ПОЛЕ */
.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.95);
  margin: 0 10px;
  border-radius: 16px;
}

.content-placeholder {
  text-align: center;
  color: white;
}

.content-placeholder p {
  font-size: 16px;
  margin-bottom: 12px;
  opacity: 0.8;
}

.game-title {
  color: #333;
  font-size: 2.5em;
  margin-bottom: 10px;
  font-weight: bold;
}

.game-subtitle {
  color: #666;
  font-size: 1.2em;
  margin-bottom: 30px;
}

.goal-section {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 30px;
  border-left: 5px solid #667eea;
}

.goal-title {
  color: #333;
  font-size: 1.4em;
  margin-bottom: 15px;
  font-weight: bold;
}

.goal-text {
  color: #555;
  font-size: 1.1em;
  line-height: 1.5;
}

.next-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.2em;
  border-radius: 50px;
  cursor: pointer;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  font-weight: bold;
}

.next-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.money-emoji {
  font-size: 2em;
  margin-bottom: 10px;
}
</style>
