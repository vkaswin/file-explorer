<script setup lang="ts">
import { useFile } from "@/store/useFile";
import FolderList from "@/components/FolderList.vue";
const { filesByModule } = useFile();
</script>

<template>
  <div :class="styles.container">
    <FolderList />
  </div>
</template>

<style lang="scss" module="styles">
.container {
  background-color: black;
  height: 100%;
}
</style>
