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
  <img :class="styles.icon" :src="fileIcon" alt="" />
  <span :class="styles.title">{{ title }} </span>
</template>

<style lang="scss" module="styles">
.title {
  color: #cccccc;
  font-size: 16px;
}
.icon {
  width: 17px;
  height: 17px;
}
</style>
