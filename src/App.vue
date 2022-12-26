<script setup lang="ts">
import FolderTree from "@/components/FolderTree.vue";
</script>

<template>
  <div :class="styles.container">
    <FolderTree />
  </div>
</template>

<style lang="scss" module="styles">
.container {
  background-color: #1e1e1e;
  height: 100%;
}
</style>
