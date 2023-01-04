<script lang="ts" setup>
import { Files } from "@/types/Folder";
import { getFileIcon } from "@/utils";
import { toRefs, computed } from "vue";

type SearchFileProps = {
  file: Files;
  highlight: boolean;
  search: string;
};

const props = defineProps<SearchFileProps>();

const { file, highlight, search } = toRefs(props);

const fileIcon = computed<string>(() => {
  return getFileIcon(file.value.title);
});
</script>

<template>
  <div
    :class="[styles.container, highlight && styles.selected]"
    :data-file-id="file.id"
  >
    <img :class="styles.icon" :src="fileIcon" />
    <div :class="styles.title">
      <div :class="styles.file">
        <span
          v-for="(word, index) in file.title"
          :key="index"
          :class="{ [styles.highlight]: search.includes(word) }"
          >{{ word }}</span
        >
      </div>
      <div :class="styles.path">
        <span>{{ file.path }}</span>
      </div>
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
    .file {
      span {
        color: #c7c7c2;
        font-size: 14px;
        font-weight: bold;
        &:is(.highlight) {
          color: #0095ff;
        }
      }
    }
    .path {
      span {
        color: #cccccc;
        font-size: 13px;
      }
    }
  }
}
</style>
