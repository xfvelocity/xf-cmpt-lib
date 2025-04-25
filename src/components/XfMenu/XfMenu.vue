<template>
  <div class="xf-menu">
    <span
      v-if="$slots.activator"
      class="xf-cursor-pointer"
      @click="activateMenu"
    >
      <slot name="activator" />
    </span>

    <div
      class="xf-menu-modal-backdrop xf-w-100 xf-h-100"
      :class="{ 'xf-menu-modal-show': isOpen }"
      @click="toggleMenu"
    >
      <div
        class="xf-menu-modal-content"
        ref="contentRef"
        :class="{ [`xf-bg-${backgroundColour}`]: backgroundColour }"
        :style="{
          top: position.top,
          left: position.left,
          right: position.right,
          bottom: position.bottom,
          width: `${width}px`,
        }"
        @click.stop=""
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch, onMounted, PropType } from "vue";
import { MenuPositions } from "@/types/app.types";

// ** Props **
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  activator: {
    type: String,
    default: "",
  },
  backgroundColour: {
    type: String,
    default: "white",
  },
  width: {
    type: String,
    default: "",
  },
  position: {
    type: Object as PropType<MenuPositions>,
    default: () => ({
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
    }),
  },
  centerAlign: {
    type: Boolean,
    default: false,
  },
});

// ** Emits **
const emit = defineEmits(["update:modelValue"]);

// ** Data **
const { position } = toRefs(props);

const contentRef = ref<HTMLDivElement>();
const isOpen = ref<boolean>(false);

// ** Methods **
const activateMenu = (event: MouseEvent): void => {
  const navbar: HTMLElement | null =
    document.querySelector(".xf-navigation-bar");

  position.value.top = `${
    (navbar ? event.clientY - navbar.offsetHeight : event.clientY) + 15
  }px`;

  const isTouchingRightSide: boolean =
    event.clientX + (contentRef.value?.clientWidth || 0) >=
    window.innerWidth - 10;

  if (props.centerAlign) {
    position.value.left = `${
      event.clientX - contentRef.value?.clientWidth / 2
    }px`;
  } else if (isTouchingRightSide) {
    position.value.right = `${window.innerWidth - event.clientX - 10}px`;
  } else {
    position.value.left = `${event.clientX - 5}px`;
  }

  toggleMenu();
};

const toggleMenu = (): void => {
  isOpen.value = !isOpen.value;

  emit("update:modelValue", isOpen.value);
};

// ** Lifecycle **
onMounted(() => {
  if (props.activator) {
    document
      .querySelector(props.activator)
      .addEventListener("click", activateMenu);
  }
});

// ** Watchers **
watch(
  () => props.modelValue,
  (value) => {
    isOpen.value = value;
  },
);
</script>

<style lang="scss" scoped>
.xf-menu-modal {
  &-backdrop {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
    transition:
      visibility 0s linear 0.5s,
      opacity 0.5s 0s,
      transform 0.5s;
    visibility: hidden;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 50;
  }

  &-show {
    opacity: 1;
    visibility: visible;
    transition:
      visibility 0s linear 0s,
      opacity 0.5s 0s,
      transform 0.5s;
  }

  &-content {
    position: absolute;
    z-index: 51;
    height: max-content;
    width: max-content;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  }
}
</style>
