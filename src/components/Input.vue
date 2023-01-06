<script setup lang="ts">
import { toRefs, computed } from "vue";
import { storeToRefs } from "pinia";
import { useFolder } from "@/store/folder";
import { getFileIcon } from "@/utils";

type AddFolderProps = {
  gap?: string;
};

const emit = defineEmits(["onEnter"]);

const props = withDefaults(defineProps<AddFolderProps>(), {
  gap: "0px",
});

const foldetStore = useFolder();

const { title, renameTitle, addType, renameType, error } =
  storeToRefs(foldetStore);

const { validateTitle } = foldetStore;

const { gap } = toRefs(props);

const icon = computed(() =>
  getFileIcon(addType.value ? title.value : renameTitle.value)
);

const handleInput = (event: Event) => {
  let { value } = event.target as HTMLInputElement;
  if (addType.value !== null) {
    title.value = value;
  } else if (renameType.value !== null) {
    renameTitle.value = value;
  }
  validateTitle();
};
</script>

<template>
  <div :class="styles.container" :style="{ '--gap': gap }">
    <svg
      v-if="addType === 'folder' || renameType === 'folder'"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
    <img
      v-if="addType === 'file' || renameType === 'file'"
      :src="icon"
      alt=""
    />
    <div :class="styles.field">
      <input
        v-if="addType !== null || renameType !== null"
        type="text"
        :value="
          addType !== null ? title : renameTitle !== null ? renameTitle : ''
        "
        :aria-invalid="error !== null"
        @keydown.enter="emit('onEnter')"
        @input="handleInput"
        required
        v-focus
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
  padding-left: var(--gap);
  z-index: 3;
  svg {
    fill: #cccccc;
  }
  img {
    width: 18px;
    height: 18px;
  }
  .field {
    position: relative;
    width: 100%;
    input {
      border: 1px solid;
      border-color: #017fd4;
      background-color: #2a2d2e;
      color: #cccccc;
      font-size: 16px;
      padding: 0px 5px;
      height: 32px;
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
      font-size: 14px;
      padding: 5px 10px;
    }
  }
}
</style>
