<script setup lang="ts">
import FolderList from "@/components/FolderList.vue";
import { onMounted, ref, onUnmounted } from "vue";
import SearchFiles from "@/components/SearchFiles.vue";

const showSearchFile = ref(false);

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "p" && event.ctrlKey) {
    event.preventDefault();
    showSearchFile.value = true;
  }
};
</script>

<template>
  <div :class="styles.container">
    <FolderList />
    <SearchFiles v-if="showSearchFile" />
  </div>
</template>

<style lang="scss" module="styles">
.container {
  background-color: #1e1e1e;
  height: 100%;
}
</style>
