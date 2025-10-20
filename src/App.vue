<script setup lang="ts">
import GameHeader from '@/GameHeader.vue'
import GameFooter from '@/GameFooter.vue'
import GameMain from '@/GameMain.vue'
import GamePopup from '@/GamePopup.vue'
</script>

<template>
  <div class="app-container">
    <div class="app">

      <!-- ШАПКА -->
      <GameHeader />

      <!-- ОСНОВНОЕ ПОЛЕ -->
     <GameMain/>

      <!-- ПОДВАЛ -->
      <GameFooter />

      <!-- Попап -->
      <GamePopup/>

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
