<template>
  <button
    class="xf-button xf-flex-center xf-fw-700 xf-px-6 xf-py-1"
    :class="[contentClass, buttonClass]"
    @click="$emit('click')"
  >
    <span :class="{ 'xf-flex-order-1': iconLeftSide }">
      {{ text }}
    </span>

    <xf-icon
      v-if="icon"
      :class="iconLeftSide ? 'xf-mr-2' : 'xf-ml-2'"
      :src="icon"
      :fill="textColour"
      :size="iconSize"
    />
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import XfIcon from "@/components/XfIcon/XfIcon.vue";

// ** Props **
const props = defineProps({
  text: {
    type: String,
    default: "",
    required: true,
  },
  backgroundColour: {
    type: String,
    default: "black",
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  textColour: {
    type: String,
    default: "white",
  },
  boxShadow: {
    type: Boolean,
    default: true,
  },
  fontSize: {
    type: Number,
    default: 14,
  },
  icon: {
    type: String,
    default: "",
  },
  iconSize: {
    type: Number,
    default: 14,
  },
  iconLeftSide: {
    type: Boolean,
    default: false,
  },
  contentClass: {
    type: String,
    default: "",
  },
});

// ** Emits **
defineEmits(["click"]);

// ** Computed **
const buttonClass = computed<(string | Record<string, boolean>)[]>(() => {
  return [
    props.outlined
      ? `xf-bg-none xf-border-${props.backgroundColour}`
      : `xf-bg-${props.backgroundColour}`,

    `xf-text-colour-${props.textColour} xf-text-${props.fontSize}`,
    {
      "button-box-shadow": props.boxShadow,
    },
  ];
});
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/assets/styles/variables/sizes";

.xf-button {
  border-radius: map.get(sizes.$xf-spacers, 1);
  border: none;
  transition: 0.2s ease-in-out;
  width: max-content;
  cursor: pointer;

  &-box-shadow {
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
