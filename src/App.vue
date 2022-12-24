<script setup lang="ts">
import { useStore } from "@/store/useStore";
import FolderList from "@/components/FolderList.vue";
const { foldersList } = useStore();
console.log(foldersList);
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
