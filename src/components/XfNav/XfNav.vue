<template>
  <div
    v-if="isNavDrawerOpen && $slots.drawer && !(fixed || transparent)"
    :style="`height: ${navbarHeight}px`"
  />

  <div
    id="navbar"
    :class="{
      'xf-nav-open': isNavDrawerOpen && $slots.drawer,
      'xf-nav-transparent': transparent,
    }"
  >
    <nav
      ref="navRef"
      class="xf-nav"
      :class="[
        `xf-bg-${backgroundColour} xf-p-${innerPadding}`,
        {
          'xf-nav-fixed': fixed || transparent,
        },
      ]"
    >
      <slot />

      <div
        v-if="menuButton"
        id="nav-menu-btn"
        class="xf-nav-btn"
        :class="{ 'xf-nav-btn-open': isNavDrawerOpen && $slots.drawer }"
        @click="menuButtonClick(!!$slots.drawer)"
      >
        <span v-for="i in 4" :class="`xf-bg-${menuButtonColour}`" :key="i" />
      </div>
    </nav>

    <xf-menu
      v-if="$slots.menu"
      v-model="isNavDrawerOpen"
      :background-colour="menuBackgroundColour"
      activator="#nav-menu-btn"
    >
      <slot name="menu" />
    </xf-menu>

    <transition name="fade">
      <div
        v-if="isNavDrawerOpen && $slots.drawer && !transparent"
        class="xf-nav-drawer-overlay"
        :style="`top: ${navbarHeight}px`"
      />
    </transition>

    <transition name="slide-left">
      <div
        v-if="isNavDrawerOpen && $slots.drawer"
        class="xf-nav-drawer-content"
        :class="`xf-bg-${drawerBackgroundColour}`"
        :style="
          transparent
            ? `height: 100%; width: ${drawerWidth}`
            : [
                `--height: ${navbarHeight}px; top: ${navbarHeight}px; width: ${drawerWidth}`,
              ]
        "
      >
        <slot name="drawer" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

import XfMenu from "@/components/XfMenu/XfMenu.vue";

// ** Props **
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  menuButtonColour: {
    type: String,
    default: "grey-darken-2",
  },
  menuButton: {
    type: Boolean,
    default: true,
  },
  menuBackgroundColour: {
    type: String,
    default: "",
  },
  backgroundColour: {
    type: String,
    default: "white",
  },
  drawerBackgroundColour: {
    type: String,
    default: "white",
  },
  drawerWidth: {
    type: String,
    default: "100%",
  },
  fixed: {
    type: Boolean,
    default: false,
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  innerPadding: {
    type: Number,
    default: 3,
  },
});

// ** Emits **
const emit = defineEmits(["update:modelValue"]);

// ** Data **
const isNavDrawerOpen = ref<boolean>(false);
const navRef = ref<HTMLElement>();
const navbarHeight = ref<number>(0);

// ** Methods **
const menuButtonClick = (isDrawer: boolean): void => {
  if (isDrawer) {
    isNavDrawerOpen.value = !isNavDrawerOpen.value;
  }
};

// ** Lifecycle **
onMounted(() => {
  navbarHeight.value = navRef.value.clientHeight;

  if (props.transparent) {
    window.addEventListener("scroll", () => {
      const navbar = document.getElementById("navbar");
      const contentOffset = navbar.offsetTop;

      if (window.scrollY > contentOffset) {
        navbar.classList.add("xf-nav-scrolled");
      } else {
        navbar.classList.remove("xf-nav-scrolled");
      }
    });
  }
});

// ** Watchers **
watch(
  () => props.modelValue,
  (value) => {
    if (value !== isNavDrawerOpen.value) {
      isNavDrawerOpen.value = props.modelValue;
    }
  },
);

watch(isNavDrawerOpen, (value) => {
  if (value !== props.modelValue) {
    emit("update:modelValue", value);
  }
});
</script>

<style lang="scss" scoped>
.xf-nav {
  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, 0.2),
    0 4px 5px 0 rgba(0, 0, 0, 0.12);
  z-index: 50;
  display: flex;
  align-items: center;
  position: relative;
  transition: background-color 0.5s ease-in-out;

  &-fixed {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 51;
  }

  &-transparent {
    &:not(.xf-nav-scrolled) {
      .xf-nav {
        box-shadow: none !important;
      }

      nav {
        background-color: transparent !important;
      }
    }

    .xf-nav-drawer-content {
      background-color: rgba(0, 0, 0, 0.9) !important;
    }
  }

  &-open {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 50;
    top: 0;
  }

  &-drawer {
    &-content,
    &-overlay {
      overflow: hidden;
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
    }

    &-content {
      z-index: 50;
      height: calc(100% - var(--height));
    }

    &-overlay {
      z-index: 49;
      background: rgba(0, 0, 0, 0.4);
      height: 100%;
    }
  }

  // Menu button
  &-btn {
    width: 25px;
    height: 20px;
    position: relative;
    transform: rotate(0deg);
    transition: 0.5s ease-in-out;
    cursor: pointer;
    margin-left: auto;

    span {
      position: absolute;
      height: 3px;
      width: 100%;
      background: #363636;
      border-radius: 10px;
      left: 0;
      transform: rotate(0deg);
      transition: 0.25s ease-in-out;

      &:nth-child(1) {
        top: 0px;
      }

      &:nth-child(2),
      &:nth-child(3) {
        top: 7px;
      }

      &:nth-child(4) {
        top: 14px;
      }
    }

    &-open span {
      &:nth-child(1),
      &:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
      }
      &:nth-child(2) {
        transform: rotate(45deg);
      }
      &:nth-child(3) {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
