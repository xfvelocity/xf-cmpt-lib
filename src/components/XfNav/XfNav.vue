<template>
  <div :class="{ 'xf-nav-open': isNavDrawerOpen }">
    <nav
      ref="navRef"
      class="xf-nav xf-p-3"
      :class="`xf-bg-${backgroundColour}`"
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

    <transition name="slide-left">
      <div
        v-if="isNavDrawerOpen && $slots.drawer"
        class="xf-nav-drawer"
        :class="`xf-bg-${drawerBackgroundColour}`"
        :style="`--height: ${navbarHeight}px; top: ${navbarHeight}px`"
      >
        <slot name="drawer" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import XfMenu from "@/components/XfMenu/XfMenu.vue";

// ** Props **
withDefaults(
  defineProps<{
    menuButtonColour?: string;
    menuButton?: boolean;
    menuBackgroundColour?: string;
    backgroundColour?: string;
    drawerBackgroundColour?: string;
  }>(),
  {
    menuButton: true,
    backgroundColour: "white",
    drawerBackgroundColour: "white",
    menuButtonColour: "grey-darken-2",
  }
);

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
});
</script>

<style lang="scss" scoped>
.xf-nav {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.12);
  z-index: 50;
  display: flex;
  align-items: center;
  position: relative;

  &-open {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 50;
  }

  &-drawer {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - var(--height));
    z-index: 49;
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
