<script setup lang="ts">
import { ref } from "vue";
import File from "./File.vue";
import { ActionType, Files } from "@/types/Folder";
import ContextMenu from "./ContextMenu.vue";
import Input from "./Input.vue";

type FileProps = {
  gap: number;
  files: Files[];
  selectedId: string | null;
  dragOver: boolean;
  renameId: string | null;
  actionType: ActionType;
};

type EmitType = {
  (event: "onSelect", id: string): void;
  (event: "onDragStart", type: "file", id: string): void;
  (event: "onDragEnter"): void;
  (
    event: "onDelete" | "onRename" | "onCoypPath",
    type: "file",
    fileId: string
  ): void;
};

const dragId = ref<string | null>(null);

const emit = defineEmits<EmitType>();

const { files, dragOver, renameId } = defineProps<FileProps>();
</script>

<template>
  <div :class="[styles.container, dragOver && styles.drag_over]">
    <div
      v-for="{ id, path, title } in files"
      :id="`file-${id}`"
      :class="[styles.title, { [styles.selected]: id === selectedId }]"
      tabindex="-1"
      :style="{ paddingLeft: `${gap}px` }"
      :key="id"
      :draggable="dragId === id"
      @mousedown="dragId = id"
      @click="emit('onSelect', id)"
      @dragstart="emit('onDragStart', 'file', id)"
      @dragenter="emit('onDragEnter')"
    >
      <Input :action-type="actionType" v-if="id === renameId" />
      <File v-else :file-id="id" :title="title" />
      <ContextMenu
        :selector="`#file-${id}`"
        @on-delete="emit('onDelete', 'file', id)"
        @on-rename="emit('onRename', 'file', id)"
        @on-copy-path="emit('onCoypPath', 'file', id)"
      />
    </div>
  </div>
</template>

<style lang="scss" module="styles">
.container {
  display: flex;
  flex-direction: column;
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
  }
}
</style>
