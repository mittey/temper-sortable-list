<script setup lang="ts">
import { type SortingMove } from '@/stores/posts'
import { mapDirectionToIncrement } from '@/stores/posts'
import { computed } from 'vue'

const { moves } = defineProps<{ moves: SortingMove[] }>()
defineEmits<{ timeTravel: [moveOrder: number] }>()
</script>

<template>
  <div class="container">
    <p class="container__header">List of actions committed</p>
    <TransitionGroup v-if="moves.length > 0" name="list" tag="ul" class="container__list">
      <li class="list__item" v-for="move of moves.slice().reverse()" :key="move.id">
        {{
          `Moved Post ${move.postId} from index ${move.initialPosition} index ${move.initialPosition + mapDirectionToIncrement(move.direction)}`
        }}

        <button class="item__button" @click="$emit('timeTravel', move.id)">Time travel</button>
      </li>
    </TransitionGroup>

    <p class="container__announcement" v-if="moves.length === 0">No actions committed yet</p>
  </div>
</template>

<style scoped lang="scss">
@import '@/css/mixins.scss';
@import '@/css/variables.scss';

.container {
  @include box-shadow;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  height: 100%;
  min-width: 25em;
  border-radius: $border-radius;

  .container__header {
    @include top-border-radius;

    padding: $padding;
    background-color: $white-color;

    font-size: $larger-text;
  }

  .container__announcement {
    @include bottom-border-radius;

    padding-left: $padding;
    padding-top: 3 * $padding;
    padding-bottom: 3 * $padding;
    background-color: $list-container-color;
  }

  .container__list {
    @include bottom-border-radius;

    .list-move,
    .list-enter-active,
    .list-leave-active {
      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .list-enter-from,
    .list-leave-to {
      opacity: 0;
      transform: scaleY(0.01) translate(30px, 0);
    }

    .list-leave-active {
      position: absolute;
    }

    padding-left: 0;
    min-width: 15.625em;
    padding: 0.9375em;
    max-height: 75vh;

    background-color: $list-container-color;

    overflow: hidden;
    overflow-y: scroll;
    scrollbar-width: none;

    .list__item {
      padding: $padding;
      background-color: $white-color;

      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;

      &:first-child {
        @include top-border-radius;
      }

      &:last-child {
        @include bottom-border-radius;
      }

      &:not(:last-child) {
        margin-bottom: 0.0625em;
      }

      .item__button {
        background-color: $green-color;
        border: 0;
        border-radius: $border-radius;
        padding: $padding;

        cursor: pointer;
      }
    }
  }
}
</style>
