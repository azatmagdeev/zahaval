<script setup lang="ts">
import { type Component, ref } from 'vue'
import { usePopup } from '@/stores/popup.ts'
import AssetsAndLiabilities from '@/AssetsAndLiabilities.vue'
import IncomeAndExpenses from '@/IncomeAndExpenses.vue'

interface FooterButton {
  id: string
  icon: string
  text: string
  content?: Component
}

const popup = usePopup()

const footerButtons = ref<FooterButton[]>([
  { id: 'cashflow', icon: '💰', text: 'Доходы/Расходы', content :IncomeAndExpenses },
  { id: 'assets', icon: '📊', text: 'Активы/Пассивы' , content: AssetsAndLiabilities},
  // { id: 'chart', icon: '📈', text: 'График' },
  // { id: 'journal', icon: '📝', text: 'Журнал' },
  { id: 'settings', icon: '⚙️', text: 'Настройки' },
])

// Реактивные данные
const activeTab = ref('')

// Методы
const switchTab = (button:FooterButton) => {
  activeTab.value = button.id
  popup.setContent(button.content || button.text)
}
</script>

<template>
  <footer class="footer">
    <button
      v-for="button in footerButtons"
      :key="button.id"
      class="footer-button"
      :class="{ active: activeTab === button.id }"
      @click="switchTab(button)"
    >
      <span class="button-icon">{{ button.icon }}</span>
      <span class="button-text">{{ button.text }}</span>
    </button>
  </footer>
</template>

<style scoped>
/* ПОДВАЛ */
.footer {
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 4px;
  border-radius: 16px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.footer-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 50px;
}

.footer-button:active {
  background: rgba(52, 152, 219, 0.1);
  transform: scale(0.95);
}

.footer-button.active {
  background: rgba(52, 152, 219, 0.15);
}

.button-icon {
  font-size: 20px;
}

.button-text {
  font-size: 10px;
  color: #2c3e50;
  text-align: center;
  font-weight: 500;
  line-height: 1.1;
}

/* Адаптивность для очень маленьких экранов */
@media (max-height: 600px) {
  .footer-button {
    padding: 6px 2px;
    min-height: 44px;
  }

  .button-icon {
    font-size: 18px;
  }

  .button-text {
    font-size: 9px;
  }
}

.footer {
  animation: fadeIn 0.3s ease;
}
</style>
