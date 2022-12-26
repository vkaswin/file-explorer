<script setup lang="ts">
import { toRefs, ref } from "vue";
import Files from "./Files.vue";
import { Folder as FolderType } from "@/types/Folder";

type FolderProps = {
  gap?: number;
  folder: FolderType;
  selectedId: string | null;
};

type SelectFolder = (id: string) => void;

const props = withDefaults(defineProps<FolderProps>(), {
  gap: 1,
});

const emit = defineEmits(["onSelect"]);

const { folder, gap } = toRefs(props);

const isOpen = ref(false);

const selectFolder: SelectFolder = (id) => {
  emit("onSelect", id);
};

const toggleFolder = () => {
  isOpen.value = !isOpen.value;
  selectFolder(folder.value.id);
};
</script>

<template>
  <div :class="styles.container">
    <div
      :class="[styles.title, { [styles.selected]: folder.id === selectedId }]"
      :style="{ paddingLeft: `${gap * 5}px` }"
      tabindex="-1"
      @click="toggleFolder"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" v-if="isOpen">
        <path
          fill-rule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" v-else>
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <span>{{ folder.title }}</span>
    </div>
    <div v-if="folder.subFolders !== undefined && isOpen">
      <Folder
        v-for="subFolder in folder.subFolders"
        :gap="gap + 2"
        :key="subFolder.id"
        :folder="subFolder"
        :selected-id="selectedId"
        @on-select="selectFolder"
      />
    </div>
    <div :class="styles.files" v-if="isOpen">
      <Files
        :gap="gap * 5 + 15"
        :files="folder.files"
        :selected-id="selectedId"
      />
    </div>
  </div>
</template>

<style lang="scss" module="styles">
.container {
  position: relative;
  .title {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 0px 5px 10px;
    border: 1px solid transparent;
    user-select: none;
    cursor: pointer;
    &:is(.selected) {
      background-color: #37373d;
      border-color: #37373d;
    }
    &:focus {
      background-color: #05395e;
      border: 1px solid #017fd4;
    }
    &:hover:not(:focus) {
      background-color: #2a2d2e;
    }
    span {
      color: #cccccc;
      font-size: 16px;
    }
    svg {
      fill: #cccccc;
      widows: 12px;
      height: 12px;
    }
  }
  .files {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
