<script setup lang="ts">
import { MoveDirections, type OrderedPost } from '@/stores/posts'
import BaseButton from './BaseButton.vue'

defineProps<{ posts: OrderedPost[] }>()
defineEmits<{ move: [postId: number, order: number, direction: MoveDirections] }>()
</script>

<template>
  <div class="post-list-container">
    <p>Sortable Post List</p>

    <ul>
      <li v-for="post of posts" :key="post.id">
        <p>Post {{ post.id }}</p>

        <div>
          <BaseButton @click="$emit('move', post.id, post.order, MoveDirections.Up)">Up</BaseButton>
          <BaseButton @click="$emit('move', post.id, post.order, MoveDirections.Down)">
            Down
          </BaseButton>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.post-list-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;

  ul {
    padding-left: 0;
    min-width: 250px;
    margin-top: 30px;

    li {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;

      box-shadow: 5px 5px 5px gray;

      background-color: white;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 20px;

      div {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }
    }
  }
}
</style>
