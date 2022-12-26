<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFolder } from "@/store/useFolder";
import Folder from "./Folder.vue";

const folder = useFolder();
const { foldersList, selectedId } = storeToRefs(folder);
const { createFolder, updateFolder, deleteFolder, updateSelectedId } = folder;
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.header">
      <b>Vue Folder Structure</b>
    </div>
    <Folder
      v-for="folder in foldersList"
      :key="folder.id"
      :folder="folder"
      :selected-id="selectedId"
      @on-select="updateSelectedId"
    />
  </div>
</template>

<style lang="scss" module="styles">
.container {
  display: flex;
  flex-direction: column;
  background-color: #252526;
  width: 300px;
  max-height: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #515151;
  }
  .header {
    padding: 10px;
    b {
      font-size: 16px;
      color: #cccccc;
    }
  }
}
</style>
