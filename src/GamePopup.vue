<script setup lang="ts">
import { usePopup } from '@/stores/popup.ts'
import { h, type Component } from 'vue'

const popup = usePopup()

const renderContent = () => {

  if (!popup.content) return null

  // noinspection SuspiciousTypeOfGuard
  if (typeof popup.content === 'string') {
    return h('div', popup.content)
  }

  if (typeof popup.content === 'object') {
    return h(popup.content as Component)
  }

  return null
}



// Close on ESC key
const handleKeydown = (event:KeyboardEvent) => {
  if (event.key === 'Escape' && popup.isOpen) {
    popup.close()
  }
}

// Event listeners
document.addEventListener('keydown', handleKeydown)
</script>

<template>
  <div v-if="popup.isOpen" class="popup-overlay" @click="popup.close()">
    <div class="popup-content" @click.stop>
      <button class="close-button" @click="popup.close()">
        <!--suppress HtmlDeprecatedAttribute -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      <component :is="renderContent()" />
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.popup-content {
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 450px;
  height: 600px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: scaleIn 0.3s ease;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  color: #666;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background-color: #f5f5f5;
  color: #333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .popup-content {
    padding: 24px 20px;
    margin: 20px;
    max-width: calc(100% - 40px);
  }

  .close-button {
    top: 12px;
    right: 12px;
  }
}
</style>
