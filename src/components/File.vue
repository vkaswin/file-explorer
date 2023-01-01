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
  font-size: 16px;
}
img {
  width: 17px;
  height: 17px;
}
</style>
