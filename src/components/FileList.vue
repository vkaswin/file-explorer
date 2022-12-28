<script setup lang="ts">
import { ref, toRefs } from "vue";
import File from "./File.vue";
import { Files } from "@/types/Folder";

type FileProps = {
  gap: number;
  files: Files[];
  selectedId: string | null;
  dragOver: boolean;
};

const dragId = ref<string | null>(null);

const emit = defineEmits(["onSelect", "onDragStart", "onDragEnter"]);

const { files, dragOver } = defineProps<FileProps>();
</script>

<template>
  <div :class="[styles.container, dragOver && styles.drag_over]">
    <div
      v-for="{ id, path, title } in files"
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
      <File :title="title" />
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
    border: 1px solid;
    border-color: #252526;
    user-select: none;
    cursor: pointer;
    &:is(.selected) {
      background-color: #37373d;
      border-color: #37373d;
    }
    &:focus {
      background-color: #05395e;
      border-color: #017fd4;
    }
    &:hover:not(:focus) {
      background-color: #2a2d2e;
      border-color: #2a2d2e;
    }
  }
}
</style>
