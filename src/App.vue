<script setup lang="ts">
import FolderList from "@/components/FolderList.vue";
import { onMounted, ref } from "vue";

const isLoading = ref(true);

onMounted(() => {
  document.fonts.onloadingdone = () => {
    isLoading.value = false;
  };
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else :class="styles.container">
    <FolderList />
  </div>
</template>

<style lang="scss" module="styles">
.container {
  background-color: #1e1e1e;
  height: 100%;
}
</style>
