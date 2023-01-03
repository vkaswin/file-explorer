<script lang="ts" setup>
import { ref, onMounted, computed, onUnmounted, toRefs } from "vue";
import { Files } from "@/types/Folder";
import { useFolder } from "@/store/folder";
import { storeToRefs } from "pinia";
import SearchFile from "./SearchFile.vue";

type SearchFileListProps = {
  search: string;
};

const props = defineProps<SearchFileListProps>();

const { search } = toRefs(props);
const activeIndex = ref(0);
const folderStore = useFolder();
const { folders } = storeToRefs(folderStore);

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    if (event.key === "ArrowDown") {
      activeIndex.value =
        activeIndex.value === files.value.length - 1
          ? 0
          : activeIndex.value + 1;
    } else if (event.key === "ArrowUp") {
      activeIndex.value =
        activeIndex.value === 0
          ? files.value.length - 1
          : activeIndex.value - 1;
    }
    let element = document.querySelector(
      `[data-file-id="${files.value[activeIndex.value].id}"]`
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

const files = computed<Files[]>(() => {
  if (search.value.length === 0) return [];

  return folders.value.reduce((files, folder) => {
    folder.files.forEach((file) => {
      if (
        Array.from(search.value).some((word) =>
          file.title.toLocaleLowerCase().includes(word)
        )
      ) {
        files.push(file);
      }
    });
    return files;
  }, [] as Files[]);
});
</script>

<template>
  <div :class="styles.container">
    <div v-if="search.length === 0" :class="styles.empty">
      <span>Enter File Name</span>
    </div>
    <div v-else-if="files.length === 0" :class="styles.empty">
      <span>No Files Found</span>
    </div>
    <template v-else>
      <SearchFile
        v-for="(file, index) in files"
        :key="file.id"
        :file="file"
        :highlight="activeIndex === index"
        :search="search"
      />
    </template>
  </div>
</template>

<style lang="scss" module="styles">
.container {
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
  max-height: 300px;
  overflow-y: auto;
  .empty {
    margin: 10px auto;
    span {
      color: #c7c7c2;
    }
  }
}
</style>
