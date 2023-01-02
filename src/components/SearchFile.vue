<script lang="ts" setup>
import { Files } from "@/types/Folder";
import { getFileIcon } from "@/utils";
import { toRefs, computed } from "vue";

type SearchFileProps = {
  file: Files;
  selectedId: string | null;
  searchText: string;
};

const props = defineProps<SearchFileProps>();

const { file, selectedId, searchText } = toRefs(props);

const fileIcon = computed<string>(() => {
  return getFileIcon(file.value.title);
});
</script>

<template>
  <div :class="[styles.container, file.id === selectedId && styles.selected]">
    <img :class="styles.icon" :src="fileIcon" />
    <div :class="styles.title">
      <div :class="styles.file_name">
        <span
          v-for="(word, index) in file.title"
          :key="index"
          :class="{ [styles.highlight]: searchText.includes(word) }"
          >{{ word }}</span
        >
      </div>
      <span :class="styles.path">{{ file.path }}</span>
    </div>
  </div>
</template>

<style lang="scss" module="styles">
.container {
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  padding: 5px 15px;
  cursor: pointer;
  &:is(.selected) {
    background-color: #05395e;
    .title {
      color: white;
    }
  }
  &:hover:not(.selected) {
    background-color: #2a2d2e;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
  .title {
    display: flex;
    align-items: center;
    gap: 10px;
    .file_name {
      span {
        color: #c7c7c2;
        font-size: 14px;
        font-weight: bold;
        &:is(.highlight) {
          //   color: #2088d5;
          color: #0095ff;
        }
      }
    }
    .path {
      color: #cccccc;
      font-size: 13px;
    }
  }
}
</style>
