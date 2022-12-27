<script setup lang="ts">
import { Files } from "@/types/Folder";
import { getFileIcon } from "@/helper";

type FileProps = {
  gap: number;
  files: Files[];
  selectedId: string | null;
};

const emit = defineEmits(["onSelect"]);

const { files } = defineProps<FileProps>();
</script>

<template>
  <div :class="styles.container">
    <div
      v-for="{ id, path, title } in files"
      :class="[styles.title, { [styles.selected]: id === selectedId }]"
      tabindex="-1"
      :style="{ paddingLeft: `${gap}px` }"
      :key="id"
      @click="emit('onSelect', id)"
    >
      <img :src="getFileIcon(title)" alt="Hello" />
      <span>{{ title }} </span>
    </div>
  </div>
</template>

<style lang="scss" module="styles">
.container {
  display: flex;
  flex-direction: column;
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
    span {
      color: #cccccc;
      font-size: 14px;
    }
    img {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
