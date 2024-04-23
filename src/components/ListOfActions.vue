<script setup lang="ts">
import { type SortingMove } from '@/stores/posts'
import { mapDirectionToIncrement } from '@/stores/posts'

defineProps<{ moves: SortingMove[] }>()
defineEmits<{ timeTravel: [moveOrder: number] }>()
</script>

<template>
  <div class="actions-committed-container">
    <p>List of actions committed</p>

    <ul v-if="moves.length > 0">
      <li v-for="move of moves" :key="move.id">
        {{
          `Moved Post ${move.postId} from index ${move.initialPosition} index ${move.initialPosition + mapDirectionToIncrement(move.direction)}`
        }}
        <button @click="$emit('timeTravel', move.id)">Time travel</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.actions-committed-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background-color: gainsboro;

  height: 100%;
  min-width: 400px;
  padding: 15px;

  ul {
    padding-left: 0;
    min-width: 250px;
    margin-top: 30px;

    border: 1px solid gray;
    border-radius: 2px;

    li {
      display: block;
      padding: 10px;
      background-color: white;

      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;

      &:not(:last-child) {
        border-bottom: 1px solid gray;
      }
    }
  }
}
</style>
