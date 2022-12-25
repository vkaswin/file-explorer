<script setup lang="ts">
import { toRefs } from "vue";
import Files from "./Files.vue";
import { Folder as FolderType } from "@/types/Folder";

type FolderProps = {
  folder: FolderType;
};

const props = defineProps<FolderProps>();

const { folder } = toRefs(props);
</script>

<template>
  <div>
    <div class="title">
      <span>{{ folder.title }}</span>
    </div>
    <div v-if="folder.subFolders !== undefined">
      <Folder
        v-for="subFolder in folder.subFolders"
        :key="subFolder.id"
        :folder="subFolder"
      />
    </div>
    <div class="files">
      <Files :files="folder.files" />
    </div>
  </div>
</template>

<style lang="scss"></style>
