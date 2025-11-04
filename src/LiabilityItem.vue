<script setup lang="ts">
import { type Liability } from '@/stores/types.ts'

defineProps<{
  liability: Liability
}>()
</script>

<template>
  <div class="list-row">
    <span class="item-name">
      {{ liability.name }}
      <span v-if="liability.remainingMonths" class="months-badge">
        ({{ liability.remainingMonths }})
      </span>
    </span>
    <span class="item-value liability-value">
      {{ liability.remainingAmount.toLocaleString() }}
    </span>
  </div>
</template>

<style scoped>
.list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75em 1em;
  margin: 0.25em 0;
  background: white;
  border-radius: 6px;
  border-left: 4px solid #e74c3c;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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

.months-badge {
  background: #ffeaa7;
  color: #e17055;
  padding: 0.2em 0.6em;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
}

.item-value {
  font-weight: 600;
}

.liability-value {
  color: #e74c3c;
}

/* Адаптивность */
@media (max-width: 480px) {
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
  .list-row {
    background: #495057;
    color: #f8f9fa;
  }

  .item-name {
    color: #f8f9fa;
  }

  .months-badge {
    background: #ffd43b;
    color: #495057;
  }
}
</style>
