<script lang="ts" setup>
import { debounce } from "@/utils";
import { ref, onMounted, computed } from "vue";
import { Files } from "@/types/Folder";
import { useFolder } from "@/store/folder";
import { storeToRefs } from "pinia";
import SearchFile from "./SearchFile.vue";

const searchText = ref("");
const searchRef = ref<HTMLInputElement>();
const selectedId = ref<string | null>("21c1cfba-0938-44cb-b131-30d997a0da9b");
const folderStore = useFolder();
const { folders } = storeToRefs(folderStore);

onMounted(() => {
  if (!searchRef.value) return;
  searchRef.value.focus();
});

const handleChange = debounce((event: Event) => {
  let { value } = event.target as HTMLInputElement;
  searchText.value = value;
}, 500);

const files = computed<Files[]>(() => {
  if (searchText.value.length === 0) return [];

  return folders.value.reduce((files, folder) => {
    folder.files.forEach((file) => {
      if (
        Array.from(searchText.value).some((word) =>
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
    <input
      ref="searchRef"
      type="text"
      placeholder="Search files by name"
      @input="handleChange"
    />
    <div :class="styles.wrapper">
      <div v-if="searchText.length === 0" :class="styles.empty">
        <span>Enter File Name</span>
      </div>
      <div v-else-if="files.length === 0" :class="styles.empty">
        <span>No Files Found</span>
      </div>
      <template v-else>
        <SearchFile
          v-for="file in files"
          :key="file.id"
          :file="file"
          :selectedId="selectedId"
          :searchText="searchText"
        />
      </template>
    </div>
  </div>
</template>

<style lang="scss" module="styles">
.container {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #252526;
  box-shadow: rgb(0 0 0 / 36%) 0px 0px 8px 2px;
  max-width: 500px;
  width: 100%;
  padding: 10px 10px 0px 10px;
  input {
    background-color: #3c3c3c;
    border: 1px solid #017fd4;
    outline: none;
    color: #cccccc;
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    height: 32px;
    padding: 0px 10px;
    border-radius: 2px;
    width: 100%;
    &::placeholder {
      color: #cccccc;
    }
  }
  .wrapper {
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
}
</style>
