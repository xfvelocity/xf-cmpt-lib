<template>
  <button
    class="xf-button xf-fw-700 xf-px-6 xf-py-1"
    :class="buttonClass"
    @click="$emit('click')"
  >
    <slot />

    <xf-icon
      v-if="icon"
      class="xf-ml-2"
      :src="icon"
      :fill="textColour"
      :size="iconSize"
    />
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import XfIcon from "@/components/XfIcon/XfIcon.vue";

// ** Base **
const props = withDefaults(
  defineProps<{
    backgroundColour?: string;
    outlined?: boolean;
    textColour?: string;
    boxShadow?: boolean;
    fontSize?: number;
    icon?: string;
    iconSize?: number;
  }>(),
  {
    backgroundColour: "black",
    textColour: "white",
    boxShadow: true,
    iconSize: 14,
  }
);

defineEmits(["click"]);

// ** Computed **
const buttonClass = computed<(string | Record<string, boolean>)[]>(() => {
  return [
    props.outlined
      ? `xf-bg-none xf-border-${props.backgroundColour}`
      : `xf-bg-${props.backgroundColour}`,
    `xf-text-colour-${props.textColour} xf-text-${props.fontSize || 14}`,
    { "button-box-shadow": props.boxShadow },
  ];
});
</script>

<style lang="scss" scoped>
.xf-button {
  display: flex;
  align-items: center;
  border-radius: map-get($xf-spacers, 1);
  border: none;
  transition: 0.2s ease-in-out;
  width: max-content;
  cursor: pointer;

  &-box-shadow {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
