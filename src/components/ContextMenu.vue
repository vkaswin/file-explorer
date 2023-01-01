<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { createPopper, VirtualElement } from "@popperjs/core";

type ContextMenuProps = {
  selector: string;
};

type EventName = "onRename" | "onDelete" | "onCopyPath";

type Options = {
  label: string;
  icon: string;
  event: EventName;
};

const options: Options[] = [
  {
    label: "Copy Path",
    event: "onCopyPath",
    icon: `<path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>`,
  },
  {
    label: "Rename",
    event: "onRename",
    icon: `<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>`,
  },
  {
    label: "Delete",
    event: "onDelete",
    icon: `<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>`,
  },
];

const generateGetBoundingClientRect = (x = 0, y = 0) => {
  return () => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
  });
};

const emit = defineEmits(["onRename", "onDelete", "onCopyPath"]);
const popperRef = ref<HTMLElement>();
const popperInstance = ref();
const referenceNode = ref<HTMLElement>();
const virtualNode = ref({
  getBoundingClientRect: generateGetBoundingClientRect(),
});

const isOpen = ref(false);

const { selector } = defineProps<ContextMenuProps>();

onMounted(() => {
  let element = document.querySelector(selector) as HTMLElement;
  if (!element) return;
  element.oncontextmenu = handleContextMenu;
  referenceNode.value = element;
});

const closePopper = (event?: MouseEvent) => {
  if (
    event &&
    popperRef.value &&
    popperRef.value.contains(event.target as HTMLElement)
  )
    return;

  isOpen.value = false;
  if (popperInstance.value) {
    popperInstance.value.destroy();
    popperInstance.value = null;
  }
  document.removeEventListener("pointerdown", closePopper);
};

const handleContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  let { x, y } = event;
  virtualNode.value.getBoundingClientRect = generateGetBoundingClientRect(x, y);
  isOpen.value = !isOpen.value;
  document.addEventListener("pointerdown", closePopper);
};

watch(virtualNode.value, () => {
  if (!popperInstance.value) return;
  popperInstance.value.update();
});

const setPopperNode = (element: unknown) => {
  if (
    !(element instanceof HTMLElement) ||
    !referenceNode.value ||
    popperInstance.value
  )
    return;

  popperRef.value = element;
  popperInstance.value = createPopper(
    virtualNode.value as VirtualElement,
    element
  );
};

const toggleOption = (event: EventName) => {
  closePopper();
  emit(event);
};
</script>

<template>
  <Teleport v-if="isOpen" to="body">
    <div :ref="setPopperNode" :class="styles.container">
      <div
        :class="styles.options"
        v-for="{ event, icon, label } in options"
        @click="toggleOption(event)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          v-html="icon"
        ></svg>
        <span>{{ label }}</span>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" module="styles">
.container {
  display: flex;
  flex-direction: column;
  background-color: #2a2d2e;
  border-radius: 4px;
  padding: 5px;
  min-width: 110px;
  z-index: 999;
  .options {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 2px 5px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #05395e;
    }
    svg {
      width: 14px;
      height: 14px;
      fill: #cccccc;
    }
    span {
      color: #cccccc;
      font-size: 14px;
    }
  }
}
</style>
