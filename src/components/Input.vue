<script setup lang="ts">
import { toRefs, ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useFolder } from "@/store/folder";
import { getFileIcon } from "@/utils";

type AddFolderProps = {
  gap?: number;
};

const emit = defineEmits(["onEnter"]);

const props = withDefaults(defineProps<AddFolderProps>(), {
  gap: 5,
});

const foldetStore = useFolder();

const inputRef = ref<HTMLInputElement>();

const { title, renameTitle, addType, renameType, error } =
  storeToRefs(foldetStore);

const { validateTitle } = foldetStore;

const { gap } = toRefs(props);

onMounted(() => {
  if (!inputRef.value) return;
  inputRef.value.focus();
});

const icon = computed(() =>
  getFileIcon(addType.value ? title.value : renameTitle.value)
);
</script>

<template>
  <div :class="styles.container" :style="{ paddingLeft: `${gap}px` }">
    <svg
      v-if="addType === 'folder' || renameType === 'folder'"
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
    <img
      v-if="addType === 'file' || renameType === 'file'"
      :src="icon"
      alt=""
    />
    <div :class="styles.field">
      <input
        v-if="addType !== null"
        ref="inputRef"
        type="text"
        v-model="title"
        :aria-invalid="error !== null"
        @keydown.enter="emit('onEnter')"
        @input="validateTitle"
        required
      />
      <input
        v-if="renameType !== null"
        ref="inputRef"
        type="text"
        v-model="renameTitle"
        :aria-invalid="error !== null"
        @keydown.enter="emit('onEnter')"
        @input="validateTitle"
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
