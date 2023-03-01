<template>
  <button
    class="xf-button xf-fw-700 xf-w-max-content xf-cursor-pointer xf-px-6 xf-py-1"
    :class="buttonClass"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

// ** Base **
const props = withDefaults(
  defineProps<{
    backgroundColour?: string;
    outlined?: boolean;
    textColour?: string;
    boxShadow?: boolean;
    fontSize?: number;
  }>(),
  {
    backgroundColour: "black",
    textColour: "white",
    boxShadow: true,
  }
);

defineEmits(["click"]);

// ** Computed **
const buttonClass = computed<(string | Record<string, boolean>)[]>(() => {
  const backgroundColor = props.outlined
    ? `xf-bg-none xf-border-${props.backgroundColour}`
    : `xf-bg-${props.backgroundColour}`;

  return [
    backgroundColor,
    props.fontSize ? `xf-text-${props.fontSize}` : `xf-text-14 xf-text-18-lg`,
    `xf-text-colour-${props.textColour}`,
    { "button-box-shadow": props.boxShadow },
  ];
});
</script>

<style lang="scss" scoped>
.xf-button {
  border-radius: map-get($xf-spacers, 1);
  border: none;
  transition: 0.2s ease-in-out;

  &-box-shadow {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
