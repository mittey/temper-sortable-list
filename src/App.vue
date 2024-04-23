<script setup lang="ts">
import { MoveDirections, usePostsStore, type Post } from './stores/posts'
import SortablePostList from './components/SortablePostList.vue'
import ListOfActions from './components/ListOfActions.vue'

const postsStore = usePostsStore()

fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((posts: Post[]) => postsStore.setPosts(posts))

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
  <SortablePostList :posts="postsStore.sortedPosts" @move="handleMove" />
  <ListOfActions :moves="postsStore.moves" @time-travel="handleTimeTravel" />
</template>

<style scoped></style>
