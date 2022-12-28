<script setup lang="ts">
import FolderList from "@/components/FolderList.vue";
</script>

<template>
  <div :class="styles.container">
    <FolderList />
  </div>
</template>

<style lang="scss" module="styles">
.container {
  background-color: #1e1e1e;
  height: 100%;
}
</style>
