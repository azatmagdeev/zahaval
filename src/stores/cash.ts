import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCash = defineStore('cash', () => {
  const cash = ref(15000)

  function updateCash(value: number) {
    cash.value += value
    console.log('new cash = ' + cash.value)
  }

  return { cash, updateCash }
})
