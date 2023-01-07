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
    <div :class="styles.folder_list">
      <FolderList />
    </div>
    <div :class="styles.wrapper">
      <span>Go to file </span>
      <div><code>Ctrl</code> <span>+</span> <code>P</code></div>
    </div>
  </div>
  <Popup v-if="showSearchFile" v-slot="{ inputValue }">
    <SearchFileList :search="inputValue" />
  </Popup>
</template>

<style lang="scss" module="styles">
.container {
  display: flex;
  background-color: #1e1e1e;
  height: 100%;
  --folder-width: 300px;
  .folder_list {
    width: var(--folder-width);
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: calc(100% - var(--folder-width));
    span {
      color: white;
      font-size: 20px;
    }
    code {
      background-color: #cccccc;
      border-radius: 4px;
      padding: 5px 10px;
    }
  }
}
</style>
