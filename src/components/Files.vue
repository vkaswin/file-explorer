<script setup lang="ts">
import { Files } from "@/types/Folder";

type FileProps = {
  files: Files[];
};

const { files } = defineProps<FileProps>();
</script>

<template>
  <div class="file" v-for="{ id, path, title } in files" :key="id">
    <span>{{ title }} | {{ path }}</span>
  </div>
</template>

<style></style>
