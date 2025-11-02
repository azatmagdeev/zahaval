import { type Component, ref, type VNode, markRaw } from 'vue'
import { defineStore } from 'pinia'

export const usePopup = defineStore('popup', () => {
  const isOpen = ref(false)
  const content = ref<Component | VNode | string | null>(null)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    content.value = null
  }

  function setContent(newContent: Component | VNode | string) {
    if (typeof newContent === 'object' && newContent !== null && 'render' in newContent) {
      content.value = markRaw(newContent)
    } else {
      content.value = newContent
    }
    isOpen.value = true
  }

  return { isOpen, open, close, setContent, content }
})
