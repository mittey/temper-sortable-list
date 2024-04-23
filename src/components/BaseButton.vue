<script setup lang="ts"></script>

<template>
  <button>
    <span><slot /></span>
  </button>
</template>

<style scoped>
button {
  background-color: white;
  border: none;

  span {
    color: blueviolet;
    font-weight: bold;
  }
}
</style>
