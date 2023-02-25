<template>
  <component
    :is="heading"
    class="xf-banner xf-fw-800 xf-w-max-content xf-z-5 xf-h-max-content"
  >
    <div
      class="xf-px-1 xf-w-max-content xf-mb-1"
      :class="`xf-bg-${backgroundColour} xf-text-colour-${textColour} `"
      :style="`transform: rotate(-3deg); font-size: ${fontSize}px`"
    >
      <slot />
    </div>
  </component>
</template>

<script lang="ts" setup>
// ** Base **
withDefaults(
  defineProps<{
    backgroundColour?: string;
    fontSize?: number;
    textColour?: string;
    offsetY?: number;
    heading?: string;
  }>(),
  {
    fontSize: 24,
    backgroundColour: "black",
    textColour: "white",
    heading: "h2",
  }
);
</script>
