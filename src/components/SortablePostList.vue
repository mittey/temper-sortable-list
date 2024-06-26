<script setup lang="ts">
import ArrowButton from '@/components/ArrowButton.vue'
import { MoveDirections, type OrderedPost } from '@/stores/posts'

defineProps<{ posts: OrderedPost[] }>()
defineEmits<{ move: [postId: number, order: number, direction: MoveDirections] }>()
</script>

<template>
  <div class="container">
    <p class="container__header">Sortable Post List</p>

    <TransitionGroup name="list" tag="ul" class="container__list">
      <li class="list__item" v-for="post of posts" :key="post.id">
        <p class="item__text">Post {{ post.id }}</p>

        <div class="item__buttons">
          <ArrowButton
            v-if="post.order !== 0"
            @click="$emit('move', post.id, post.order, MoveDirections.Up)"
            :direction="'up'"
          />
          <ArrowButton
            v-if="post.order !== posts.length - 1"
            @click="$emit('move', post.id, post.order, MoveDirections.Down)"
            :direction="'down'"
          />
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
@import '@/css/mixins.scss';
@import '@/css/variables.scss';

.container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;

  .container__header {
    color: $white-color;
    background-color: $purple-color;
    font-size: $larger-text;
    padding: $padding;
    padding-left: 0;
  }

  .container__list {
    @include list-animations;

    padding-left: 0;
    min-width: 15.625em;

    .list__item {
      @include box-shadow;

      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;

      background-color: $white-color;
      border-radius: $border-radius;
      padding: $padding;
      margin-bottom: $padding;
      min-height: 3.75em;

      .item__buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }
    }
  }
}
</style>
