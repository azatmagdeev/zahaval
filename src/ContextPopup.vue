<script setup lang="ts">
type Props = {
  open: boolean
}

const props = defineProps<Props>()
</script>

<template>

  <div v-if="props.open">
    <slot>Oops... lost content...</slot>
  </div>
</template>

<style scoped>
div {
  position: absolute;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
  border: 1px solid grey;
  top: 2em;
  right: 1em;
}
</style>
