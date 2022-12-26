<script setup lang="ts">
import { toRefs } from "vue";

type AddFolderProps = {
  gap?: number;
};
const props = withDefaults(defineProps<AddFolderProps>(), {
  gap: 5,
});

const { gap } = toRefs(props);
</script>

<template>
  <div :class="styles.container" :style="{ paddingLeft: `${gap}px` }">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
    <input />
  </div>
</template>

<style lang="scss" module="styles">
.container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  z-index: 3;
  svg {
    fill: #cccccc;
    widows: 12px;
    height: 12px;
  }
  input {
    border: 1px solid #017fd4;
    background-color: #2a2d2e;
    color: #cccccc;
    font-size: 14px;
    padding: 5px 10px;
    height: 25px;
    width: 100%;
    outline: none;
  }
}
</style>
