<script setup lang="ts">
import { toRefs, ref, onMounted, computed } from "vue";
import { ActionType } from "@/types/Folder";
import { storeToRefs } from "pinia";
import { useFolder } from "@/store/folder";
import { getFileIcon } from "@/utils";

type AddFolderProps = {
  gap?: number;
  actionType: ActionType;
  isFolder?: boolean;
};

const props = withDefaults(defineProps<AddFolderProps>(), {
  gap: 5,
});

const foldetStore = useFolder();

const inputRef = ref<HTMLInputElement>();

const { title, error, existingFiles, existingFolders } =
  storeToRefs(foldetStore);

const { createFolder, createFile, setError } = foldetStore;

const { gap, actionType } = toRefs(props);

onMounted(() => {
  if (!inputRef.value) return;
  inputRef.value.focus();
});

const validateField = () => {
  if (actionType.value === null) return;
  let error: string | null = null;
  if (title.value.length === 0) {
    error = `A ${
      actionType.value === "file" ? "File" : "Folder"
    } name must be provided`;
  } else {
    if (title.value === ".") {
      error = `The name <b>.</b> is not a valid as a file or folder name. So please choose different name.`;
    } else {
      let isExist =
        actionType.value === "file"
          ? existingFiles.value.includes(title.value.toLocaleLowerCase())
          : existingFolders.value.includes(title.value.toLocaleLowerCase());
      if (isExist) {
        error = `A ${actionType.value === "file" ? "File" : "Folder"} <b>${
          title.value
        }</b> already exists at this location. Please choose a different name`;
      } else {
        error = null;
      }
    }
  }
  setError(error);
};

const handleEnter = () => {
  actionType.value === "file" ? createFile() : createFolder();
};

const icon = computed(() => getFileIcon(title.value));
</script>

<template>
  <div :class="styles.container" :style="{ paddingLeft: `${gap}px` }">
    <svg
      v-if="actionType === 'folder'"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
    <img v-if="actionType === 'file'" :src="icon" />
    <div :class="styles.field">
      <input
        ref="inputRef"
        type="text"
        v-model="title"
        :aria-invalid="error !== null"
        @keydown.enter="handleEnter"
        @input="validateField"
        required
      />
      <div :class="styles.error" v-if="error !== null" v-html="error"></div>
    </div>
  </div>
</template>

<style lang="scss" module="styles">
.container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 3;
  svg {
    fill: #cccccc;
  }
  img {
    width: 15px;
    height: 15px;
  }
  .field {
    position: relative;
    width: 100%;
    input {
      border: 1px solid;
      border-color: #017fd4;
      background-color: #2a2d2e;
      color: #cccccc;
      font-size: 14px;
      padding: 0px 5px;
      height: 25px;
      width: 100%;
      outline: none;
      font-family: "Poppins", sans-serif;
    }
    input[aria-invalid="true"] {
      border-color: #ae170d;
    }
    .error {
      position: absolute;
      left: 0px;
      top: 100%;
      width: 100%;
      border: 1px solid #ae170d;
      background-color: #561e1e;
      color: white;
      border-top: 0px;
      font-size: 12px;
      padding: 5px 10px;
    }
  }
}
</style>
