<script setup lang="ts">
import ListOfActions from './components/ListOfActions.vue'
import SortablePostList from './components/SortablePostList.vue'
import { MoveDirections, usePostsStore, type Post } from './stores/posts'

const postsStore = usePostsStore()

fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  // Only the first 5 posts should be displayed.
  .then((posts: Post[]) => postsStore.setPosts(posts.slice(0, 5)))

function handleMove(postId: number, order: number, moveDirection: MoveDirections) {
  postsStore.appendMove({
    initialPosition: order,
    direction: moveDirection,
    postId
  })
}

function handleTimeTravel(moveId: number) {
  postsStore.jumpToMove(moveId)
}
</script>

<template>
  <div class="app-container">
    <SortablePostList :posts="postsStore.sortedPosts" @move="handleMove" />
    <ListOfActions :moves="postsStore.moves" @time-travel="handleTimeTravel" />
  </div>
</template>

<style scoped lang="scss">
.app-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;

  padding: 2em;
}
</style>
