<template>
  <div
    class="xf-tooltip xf-position-relative xf-d-inline-block"
    @mouseenter="isTooltipShowing = true"
    @mouseleave="isTooltipShowing = false"
  >
    <slot />

    <transition name="fade">
      <div
        v-if="isTooltipShowing"
        class="xf-tooltip-content xf-p-1 xf-border-radius-5"
        :class="`xf-tooltip-${position} xf-bg-${backgroundColour} xf-text-colour-${textColour}`"
      >
        <span class="xf-tooltip-text">{{ text }}</span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";

// ** Props **
defineProps({
  text: {
    type: String,
    default: "",
    required: true,
  },
  position: {
    type: String,
    default: "top",
    validator: (value: string) => ["top", "bottom"].includes(value),
  },
  backgroundColour: {
    type: String,
    default: "grey-darken-3",
  },
  textColour: {
    type: String,
    default: "white",
  },
});

// ** Data **
const isTooltipShowing = ref<boolean>(false);
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/assets/styles/variables/colours";

.xf-tooltip {
  position: relative;
  display: inline-block;

  &-content {
    font-size: 14px;
    z-index: 10;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    min-width: max-content;
    max-width: 250px;
    word-wrap: break-word;
    white-space: normal;
  }

  &-text {
    display: inline-block;
    width: 100%;
  }

  &-top {
    bottom: calc(100% + 10px);
  }

  &-bottom {
    top: calc(100% + 10px);
  }
}
</style>
