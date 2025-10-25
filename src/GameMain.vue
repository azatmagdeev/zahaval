<script setup lang="ts">
import { useGameStore } from '@/stores/game.ts'
import WelcomePage from '@/WelcomePage.vue'
import { computed } from 'vue'
import EventCardPage from '@/EventCardPage.vue'

const game = useGameStore()

const currentMove = computed(() => game.currentMove)
</script>

<template>
  <main class="main-content">
    <div class="content-placeholder">
      <WelcomePage v-if="currentMove === 0" />
      <EventCardPage v-if="currentMove !== 0" />
    </div>
  </main>
</template>

<style>
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

</style>
