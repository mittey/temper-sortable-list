<script setup lang="ts">
import ArrowIcon from '@/components/ArrowIcon.vue'

defineProps<{ direction: 'up' | 'down' }>()
</script>

<template>
  <button class="button">
    <ArrowIcon class="button__icon" :class="{ '--direction-down': direction === 'down' }" />
  </button>
</template>

<style scoped lang="scss">
@import '@/css/variables.scss';

.button {
  background-color: transparent;
  border: none;
  color: $purple-color;
  font-weight: bold;
  padding: 0;

  .button__icon {
    width: 2em;

    &.--direction-down {
      transform: rotate(180deg);
    }
  }
}
</style>
