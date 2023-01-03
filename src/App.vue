<script setup lang="ts">
import FolderList from "@/components/FolderList.vue";
import { onMounted, ref, onUnmounted } from "vue";
import Popup from "@/components/Popup.vue";
import SearchFileList from "./components/SearchFileList.vue";

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
    <Popup v-if="showSearchFile" v-slot="{ inputValue }">
      <SearchFileList :search="inputValue" />
    </Popup>
  </div>
</template>

<style lang="scss" module="styles">
.container {
  background-color: #1e1e1e;
  height: 100%;
}
</style>
