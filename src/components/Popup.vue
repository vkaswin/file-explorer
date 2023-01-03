<script lang="ts" setup>
import { debounce } from "@/utils";
import { ref, onMounted } from "vue";

const inputValue = ref("");
const searchRef = ref<HTMLInputElement>();

onMounted(() => {
  if (!searchRef.value) return;
  searchRef.value.focus();
});

const handleChange = debounce((event: Event) => {
  let { value } = event.target as HTMLInputElement;
  inputValue.value = value;
}, 500);
</script>

<template>
  <div :class="styles.container">
    <input
      ref="searchRef"
      type="text"
      placeholder="Search files by name"
      @input="handleChange"
    />
    <slot :inputValue="inputValue"></slot>
    <slot name="hello"></slot>
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
