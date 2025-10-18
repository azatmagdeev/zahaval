<script setup lang="ts">
import GameHeader from '@/GameHeader.vue'
import GameFooter from '@/GameFooter.vue'
</script>

<template>
  <div class="app-container">
    <div class="app">
      <!-- ШАПКА -->
      <GameHeader />

      <!-- ОСНОВНОЕ ПОЛЕ -->
      <main class="main-content">
        <div class="content-placeholder">
          <p>Выберите раздел в меню ниже</p>
          <div class="placeholder-emoji">📱</div>
        </div>
      </main>

      <!-- ПОДВАЛ -->
      <GameFooter />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0 auto;
  max-width: 500px;
}

/* ОСНОВНОЕ ПОЛЕ */
.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
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

.placeholder-emoji {
  font-size: 48px;
  opacity: 0.7;
}

/* Анимации */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
