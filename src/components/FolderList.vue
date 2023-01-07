<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useFolder } from "@/store/folder";
import { Icon, Folder as FolderType } from "@/types/Folder";
import Folder from "./Folder.vue";
// import ScrollBar from "./ScrollBar.vue";

const folderStore = useFolder();
const { foldersList, addType, renameType } = storeToRefs(folderStore);

const {
  toggleAddIcon,
  handleDrop,
  setFolders,
  setExpandedFolderIds,
  setSelectedId,
  setHover,
} = folderStore;

const folderRef = ref<HTMLDivElement>();

onMounted(() => {
  let expandedFolderIds = JSON.parse(
    localStorage.getItem("expandedFolderIds") ?? "[]"
  );
  let selectedId = localStorage.getItem("selectedId") ?? null;
  let folders = JSON.parse(localStorage.getItem("folders") ?? "[]");
  if (selectedId) {
    setSelectedId(selectedId);
  }
  if (Array.isArray(expandedFolderIds) && expandedFolderIds.length > 0) {
    setExpandedFolderIds(expandedFolderIds);
  }
  setFolders(folders as FolderType[]);
});

const handleClickOutSide = (event: MouseEvent) => {
  if (!folderRef.value) return;
  let element = event.target as HTMLElement;
  if (folderRef.value.contains(element)) return;
  window.removeEventListener("click", handleClickOutSide);
  toggleAddIcon();
};

const handleIcon = (addType: Icon) => {
  window.addEventListener("click", handleClickOutSide);
  toggleAddIcon(addType);
};
</script>

<template>
  <div ref="folderRef" :class="styles.container">
    <div :class="styles.header">
      <b>Vue Folder Structure</b>
      <div :class="styles.add_icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          @click="handleIcon('file')"
        >
          <path
            d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"
          />
          <path
            d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          @click="handleIcon('folder')"
        >
          <path
            d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"
          />
          <path
            d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"
          />
        </svg>
      </div>
    </div>
    <div
      :class="styles.wrapper"
      @dragover.prevent
      @drop="handleDrop"
      @mouseenter="setHover(true)"
      @mouseleave="setHover(false)"
    >
      <Folder v-for="folder in foldersList" :key="folder.id" :folder="folder" />
      <!-- <ScrollBar /> -->
      <div
        :class="styles.overlay"
        v-if="addType !== null || renameType !== null"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" module="styles">
.container {
  display: flex;
  flex-direction: column;
  background-color: #252526;
  --folder-width: 300px;
  width: var(--folder-width);
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px;
    b {
      font-size: 18px;
      color: #cccccc;
    }
    .add_icon {
      display: flex;
      align-items: center;
      gap: 10px;
      svg {
        fill: #cccccc;
        user-select: none;
        cursor: pointer;
        &:first-child {
          width: 19px;
          height: 19px;
        }
        &:last-child {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .wrapper {
    position: relative;
    max-height: 100%;
    height: 100%;
    overflow: auto;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
    .overlay {
      position: fixed;
      top: 0px;
      left: 0px;
      width: var(--folder-width);
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;
    }
  }
}
</style>
