<template>
  <nav ref="navRef" class="xf-nav xf-p-3" :class="`xf-bg-${navBackground}`">
    <slot />

    <div
      v-if="menuButton"
      class="xf-nav-btn"
      :class="{ 'xf-nav-btn-open': isNavDrawerOpen }"
      @click="isNavDrawerOpen = !isNavDrawerOpen"
    >
      <span v-for="i in 4" :key="i" />
    </div>
  </nav>

  <div
    v-if="isNavDrawerOpen"
    class="xf-nav-drawer"
    :class="`xf-bg-${navDrawerBackground}`"
    :style="`top: ${navbarHeight}px`"
  >
    <slot name="drawer" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

// ** Base **
withDefaults(
  defineProps<{
    menuButton?: boolean;
    navBackground?: string;
    navDrawerBackground?: string;
  }>(),
  {
    menuButton: true,
    navBackground: "white",
    navDrawerBackground: "white",
  }
);

// ** Data **
const isNavDrawerOpen = ref<boolean>(true);
const navRef = ref<HTMLElement>();
const navbarHeight = ref<number>(0);

// ** Methods **
onMounted(() => {
  navbarHeight.value = navRef.value.clientHeight;
});
</script>

<style lang="scss" scoped>
.xf-nav {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  z-index: 99;
  position: relative;

  &-drawer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
  }

  // Menu button
  &-btn {
    width: 25px;
    height: 15px;
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
