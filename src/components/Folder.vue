<script setup lang="ts">
import { toRefs, computed, ref, useCssModule } from "vue";
import FileList from "./FileList.vue";
import { Folder as FolderType } from "@/types/Folder";
import { useFolder } from "@/store/folder";
import { storeToRefs } from "pinia";
import Input from "./Input.vue";
import ContextMenu from "./ContextMenu.vue";

type FolderProps = {
  gap?: number;
  folder: FolderType;
};

const folderStore = useFolder();

const { selectedId, addType, expandedFolderIds, renameId, renameType, hover } =
  storeToRefs(folderStore);

const {
  setSelectedId,
  toggleFolder,
  expandFolder,
  setDragSource,
  setDragDestination,
  deleteFile,
  deleteFolder,
  setRenameId,
  createFolderOrFile,
  renameFolderOrFile,
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
  setSelectedId(folder.value.id);
};

const showInput = computed(() => {
  let isSelected =
    addType.value &&
    ((folder.value.path === "/" && selectedId.value === null) ||
      selectedId.value === folder.value.id ||
      folder.value.files.findIndex(({ id }) => id === selectedId.value) !== -1);
  return isSelected;
});

const isOpen = computed(() => {
  return folder.value.path !== "/"
    ? expandedFolderIds.value.includes(folder.value.id)
    : true;
});

const handleDragStart = (type: "folder" | "file", id?: string) => {
  setDragSource({ folderId: folder.value.id, fileId: id || null, type });
};

const handleDragEnter = () => {
  setDragDestination({
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
  setRenameId(type, folder.value.id, fileId);
};

const handleCopyPath = (path: string) => {
  navigator.clipboard.writeText(path);
};

const handleMouseDown = () => {
  if (renameType.value || addType.value) return;
  isDragging.value = true;
};
</script>

<template>
  <div
    :class="[styles.container, dragOver && styles.drag_over]"
    @dragenter.stop="dragEnter"
    @dragleave.stop="dragOver = false"
    @drop="dragOver = false"
    :style="{ '--gap': `${gap * 5}px` }"
  >
    <div v-if="renameType && renameId === folder.id">
      <Input :gap="`${gap * 5}px`" @on-enter="renameFolderOrFile(folder.id)" />
    </div>
    <template v-else>
      <div
        :id="`folder-${folder.id}`"
        :class="[styles.title, { [styles.selected]: folder.id === selectedId }]"
        tabindex="-1"
        :draggable="isDragging && !addType && !renameType"
        :rename-id="renameId"
        @mousedown="handleMouseDown"
        @click="handleFolder"
        @dragstart="handleDragStart('folder')"
        @dragenter="handleDragEnter"
      >
        <div v-if="folder.path !== '/'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            v-if="isOpen"
          >
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
        </div>
        <span>{{ folder.title }}</span>
      </div>
      <ContextMenu
        :selector="`#folder-${folder.id}`"
        @on-rename="handleRename('folder')"
        @on-delete="handleDelete('folder')"
        @on-copy-path="handleCopyPath(folder.path)"
      />
    </template>
    <Input
      v-if="showInput"
      :gap="`${folder.path === '/' ? 5 : gap * 5 + 10}px`"
      @on-enter="createFolderOrFile"
    />
    <Folder
      v-if="folder.subFolders !== undefined && isOpen"
      v-for="subFolder in folder.subFolders"
      :gap="gap + 2"
      :key="subFolder.id"
      :folder="subFolder"
    />
    <FileList
      v-if="isOpen"
      :gap="folder.path === '/' ? 5 : gap * 5 + 10"
      :drag-over="dragOver"
      :files="folder.files"
      :selected-id="selectedId"
      :add-type="addType"
      :rename-type="renameType"
      :rename-id="renameId"
      @on-select="setSelectedId"
      @on-drag-start="handleDragStart"
      @on-drag-enter="handleDragEnter"
      @on-rename="handleRename"
      @on-delete="handleDelete"
      @on-copy-path="handleCopyPath"
      @on-enter="(fileId) => renameFolderOrFile(folder.id, fileId)"
    />
    <Transition
      :duration="10000"
      :enter-active-class="styles.show_line"
      :leave-active-class="styles.hide_line"
    >
      <div
        v-if="folder.path !== '/' && (hover || selectedId === folder.id)"
        :class="styles.line"
      ></div>
    </Transition>
  </div>
</template>

<style lang="scss" module="styles">
.container {
  position: relative;
  width: fit-content;
  &:is(.drag_over) {
    background-color: #37373d;
    .title {
      border-color: #37373d;
    }
  }
  .show_line {
    animation: fadeIn 0.2s ease forwards;
  }
  .hide_line {
    animation: fadeOut 0.2s ease forwards;
  }
  .line {
    position: absolute;
    top: 27px;
    left: calc(var(--gap) + 7px);
    height: calc(100% - 27px);
    width: 1px;
    background-color: #585858;
  }
  .title {
    display: flex;
    align-items: center;
    gap: 5px;
    border: 1px solid transparent;
    padding: 0px 20px 0px var(--gap);
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
    &:hover:not(:focus, .selected) {
      background-color: #2a2d2e;
    }
    > div {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    span {
      color: #cccccc;
      font-size: 16px;
    }
    svg {
      fill: #cccccc;
      width: 15px;
      height: 15px;
    }
    img {
      width: 17px;
      height: 17px;
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
