<template>
  <div class="xf-menu">
    <span class="xf-cursor-pointer" @click="activateMenu">
      <slot name="activator" />
    </span>

    <div
      class="xf-menu-modal-backdrop xf-w-100 xf-h-100"
      :class="{ 'xf-menu-modal-show': isOpen }"
      @click="toggleMenu"
    >
      <div
        class="xf-menu-modal-content"
        :style="{
          top: position.top,
          left: position.left,
          right: position.right,
          bottom: position.bottom,
          width: `${width}px`,
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from "vue";
import { MenuPositions } from "@/types/app.types";

// ** Props **
const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    width?: number;
    position?: MenuPositions;
  }>(),
  {
    position: () => ({}),
  }
);

// ** Emits **
const emit = defineEmits(["update:modelValue"]);

// ** Data **
const { position } = toRefs(props);
const isOpen = ref<boolean>();

// ** Methods **
const activateMenu = (event: MouseEvent): void => {
  const navbar: HTMLElement | null =
    document.querySelector(".xf-navigation-bar");

  // Get the click position and subract the height of the navbar to position the menu correctly
  position.value.top = `${
    (navbar ? event.clientY - navbar.offsetHeight : event.clientY) + 10
  }px`;
  position.value.left = `${event.clientX - 5}px`;

  toggleMenu();
};

const toggleMenu = (): void => {
  isOpen.value = !isOpen.value;

  emit("update:modelValue", isOpen.value);
};

// ** Watchers **
watch(
  () => props.modelValue,
  (value) => {
    isOpen.value = value;
  }
);
</script>

<style lang="scss" scoped>
.xf-menu-modal {
  &-backdrop {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
    visibility: hidden;
    top: 0;
    left: 0;
    opacity: 0;
  }

  &-show {
    opacity: 1;
    visibility: visible;
    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
  }

  &-content {
    position: absolute;
    z-index: 50;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  }
}
</style>
