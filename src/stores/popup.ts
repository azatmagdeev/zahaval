import { ref, type VNode } from 'vue'
import { defineStore } from 'pinia'

export const usePopup = defineStore('popup', () => {
  const isOpen = ref(false)
  const content = ref<Component | VNode | string>(null)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    content.value = null
  }

  function setContent(newContent: Component | VNode | string) {
    content.value = newContent
    isOpen.value = true
  }

  return { isOpen, open, close, setContent, content }
})
