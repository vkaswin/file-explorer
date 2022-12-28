<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { getScrollParent } from "@/utils";

let scrollRef: HTMLElement | null = null;
let parentRef: HTMLElement | null = null;

onMounted(() => {
  if (!scrollRef) return;
  const parentElement = getScrollParent(scrollRef);
  if (!parentElement) return;
  parentRef = parentElement;
  parentRef.onscroll = handleScroll;
  parentRef.onmouseenter = handleMouseEnter;
  parentRef.onmouseleave = handleMouseLeave;
  handleScrollBarPositon();
  window.addEventListener("resize", handleScrollBarPositon);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleScrollBarPositon);
});

const handleScrollBarPositon = () => {
  if (!scrollRef || !parentRef) return;
  let { clientWidth } = scrollRef;
  let { scrollHeight, clientHeight, offsetTop } = parentRef;
  let { top, left, width } = parentRef.getBoundingClientRect();
  scrollRef.style.height = `${
    (clientHeight / scrollHeight) * clientHeight - offsetTop
  }px`;
  scrollRef.style.top = `${top}px`;
  scrollRef.style.left = `${left + width - clientWidth}px`;
};

const handleMouseEnter = () => {
  if (!scrollRef) return;
  scrollRef.setAttribute("aria-hidden", "true");
};

const handleMouseLeave = () => {
  if (!scrollRef) return;
  scrollRef.setAttribute("aria-hidden", "false");
};

const handleScroll = (event: Event) => {
  if (!scrollRef || !parentRef) return;
  let { scrollTop, offsetTop } = event.target as HTMLElement;
  scrollRef.style.top = `${scrollTop + offsetTop}px`;
};
</script>

<template>
  <div :class="styles.container" ref="scrollRef"></div>
</template>

<style lang="scss" module="styles">
.container {
  position: fixed;
  width: 10px;
  background-color: #515151;
  opacity: 0;
  transition: opacity 0.2s ease-in;
}
// .container[aria-hidden="true"] {
//   opacity: 1;
// }
</style>
