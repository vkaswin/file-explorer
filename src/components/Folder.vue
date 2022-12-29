<script setup lang="ts">
import { toRefs, computed, ref, useCssModule } from "vue";
import FileList from "./FileList.vue";
import { Folder as FolderType } from "@/types/Folder";
import { useFolder } from "@/store/folder";
import { storeToRefs } from "pinia";
import AddInput from "./AddInput.vue";
import ContextMenu from "./ContextMenu.vue";

type FolderProps = {
  gap?: number;
  folder: FolderType;
  selectedId: string | null;
};

const folderStore = useFolder();

const { selectedId, addType, expandedFolderIds, folders } =
  storeToRefs(folderStore);

const {
  updateSelectedId,
  toggleFolder,
  expandFolder,
  updateDragSource,
  updateDragDestination,
  deleteFile,
  deleteFolder,
} = folderStore;

const props = withDefaults(defineProps<FolderProps>(), {
  gap: 1,
});

const isDragging = ref(false);

const dragOver = ref(false);

const { folder, gap } = toRefs(props);

const styles = useCssModule("styles");

const handleFolder = () => {
  toggleFolder(folder.value.id);
  updateSelectedId(folder.value.id);
};

const showInput = computed(() => {
  let isSelected =
    addType.value &&
    (selectedId.value === folder.value.id ||
      folder.value.files.findIndex(({ id }) => id === selectedId.value) !== -1);
  return isSelected;
});

const isOpen = computed(() => {
  return expandedFolderIds.value.includes(folder.value.id);
});

const handleDragStart = (type: "folder" | "file", id?: string) => {
  updateDragSource({ folderId: folder.value.id, fileId: id || null, type });
};

const handleDragEnter = () => {
  updateDragDestination({
    folderId: folder.value.id,
  });
};

const dragEnter = () => {
  dragOver.value = true;
  expandFolder(folder.value.id);
};

const handleDelete = (type: "folder" | "file", fileId?: string) => {
  if (type === "file" && fileId) {
    deleteFile(folder.value.id, fileId);
  } else {
    deleteFolder(folder.value.id);
  }
};

const handleRename = (type: "folder" | "file", fileId?: string) => {
  console.log("rename", folder.value.id, type, fileId);
};

const handleCopyPath = (type: "folder" | "file", fileId?: string) => {
  let path: string | undefined;
  let selectedFolder = folders.value.find(({ id }) => id === folder.value.id);
  if (!selectedFolder) return;
  if (type === "file" && fileId) {
    let file = selectedFolder.files.find(({ id }) => id === fileId);
    if (!file) return;
    path = file.path;
  } else {
    path = selectedFolder.path;
  }
  navigator.clipboard.writeText(path);
};
</script>

<template>
  <div
    :class="[styles.container, dragOver && styles.drag_over]"
    @dragenter.stop="dragEnter"
    @dragleave.stop="dragOver = false"
    @drop="dragOver = false"
  >
    <div
      :id="`folder-${folder.id}`"
      :class="[styles.title, { [styles.selected]: folder.id === selectedId }]"
      :style="{ paddingLeft: `${gap * 5}px` }"
      tabindex="-1"
      :draggable="isDragging"
      @mousedown="isDragging = true"
      @click="handleFolder"
      @dragstart="handleDragStart('folder')"
      @dragenter="handleDragEnter"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" v-if="isOpen">
        <path
          fill-rule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" v-else>
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <span>{{ folder.title }}</span>
    </div>
    <ContextMenu
      :selector="`#folder-${folder.id}`"
      @on-rename="handleRename('folder')"
      @on-delete="handleDelete('folder')"
      @on-copy-path="handleCopyPath('folder')"
    />
    <AddInput v-if="showInput" :gap="gap * 5 + 5" :add-type="addType" />
    <Folder
      v-if="folder.subFolders !== undefined && isOpen"
      v-for="subFolder in folder.subFolders"
      :gap="gap + 2"
      :key="subFolder.id"
      :folder="subFolder"
      :selected-id="selectedId"
      @on-select="updateSelectedId"
    />
    <FileList
      v-if="isOpen"
      :gap="gap * 5 + 10"
      :drag-over="dragOver"
      :files="folder.files"
      :selected-id="selectedId"
      @on-select="updateSelectedId"
      @on-drag-start="handleDragStart"
      @on-drag-enter="handleDragEnter"
      @on-rename="handleRename"
      @on-delete="handleDelete"
      @on-coyp-path="handleCopyPath"
    />
  </div>
</template>

<style lang="scss" module="styles">
.container {
  position: relative;
  &:is(.drag_over) {
    background-color: #37373d;
    .title {
      border-color: #37373d;
    }
  }
  .title {
    display: flex;
    align-items: center;
    gap: 5px;
    border: 1px solid transparent;
    user-select: none;
    cursor: pointer;
    &:is(.selected) {
      background-color: #37373d;
      border-color: #37373d;
    }
    &:focus {
      background-color: #05395e;
      border: 1px solid #017fd4;
    }
    &:hover:not(:focus) {
      background-color: #2a2d2e;
    }
    span {
      color: #cccccc;
      font-size: 16px;
    }
    svg {
      fill: #cccccc;
      width: 12px;
      height: 12px;
    }
  }
}
</style>
