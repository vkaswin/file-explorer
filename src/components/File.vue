<script setup lang="ts">
import { getFileIcon } from "@/utils";
import { toRefs, computed } from "vue";

type FileType = {
  title: string;
};

const props = defineProps<FileType>();

const { title } = toRefs(props);

const fileIcon = computed(() => {
  return getFileIcon(title.value);
});
</script>

<template>
  <img :src="fileIcon" alt="" />
  <span>{{ title }} </span>
</template>

<style scoped>
span {
  color: #cccccc;
  font-size: 14px;
}
img {
  width: 14px;
  height: 14px;
}
</style>
