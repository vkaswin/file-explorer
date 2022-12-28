<script setup lang="ts">
import { onMounted } from "vue";
import { getScrollParent } from "@/utils";

let scrollRef: HTMLElement | null = null;

const scrollHeight = "100px";

onMounted(() => {
  if (!scrollRef) return;
  const parentElement = getScrollParent(scrollRef);
  if (!parentElement) return;
  parentElement.onscroll = handleScroll;
  parentElement.onmouseenter = handleMouseEnter;
  parentElement.onmouseleave = handleMouseLeave;
});

const handleMouseEnter = () => {
  if (!scrollRef) return;
  scrollRef.setAttribute("aria-hidden", "true");
};

const handleMouseLeave = () => {
  if (!scrollRef) return;
  scrollRef.setAttribute("aria-hidden", "false");
};

const handleScroll = (event: Event) => {
  console.log("scroll");
  let element = event.target as HTMLElement;
  console.log(element);
};
</script>

<template>
  <div :class="styles.container" ref="scrollRef"></div>
</template>

<style lang="scss" module="styles">
.container {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 10px;
  height: v-bind(scrollHeight);
  background-color: #515151;
  transition: opacity 0.2s ease-in;
}
.container[aria-hidden="true"] {
  opacity: 1;
}
.container[aria-hidden="false"] {
  opacity: 0;
}
</style>
