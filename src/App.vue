<script setup lang="ts">
import { useFolder } from "@/store/useFolder";
import Folder from "@/components/Folder.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const folder = useFolder();
const { foldersList } = storeToRefs(folder);
const { createFolder } = folder;

onMounted(() => {
  createFolder({
    id: crypto.randomUUID(),
    title: "Aswin",
    path: "/src/World/Demo/Aswin",
    files: [
      {
        id: crypto.randomUUID(),
        title: "index.scss",
        path: "/src/World/Demo/index.js",
      },
      {
        id: crypto.randomUUID(),
        title: "index.js",
        path: "/src/World/Demo/index.js",
      },
      {
        id: crypto.randomUUID(),
        title: "hello.js",
        path: "/src/World/Demo/hello.js",
      },
      {
        id: crypto.randomUUID(),
        title: "Aswin.js",
        path: "/src/World/Demo/index.js",
      },
    ],
  });
});
</script>

<template>
  <div :class="styles.container">
    <Folder v-for="folder in foldersList" :key="folder.id" :folder="folder" />
  </div>
</template>

<style lang="scss" module="styles">
.container {
  background-color: black;
  color: white;
}
</style>
