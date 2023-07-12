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
      {{ text }}
    </div>
  </component>
</template>

<script lang="ts" setup>
// ** Props **
defineProps({
  text: {
    type: String,
    default: "",
    required: true,
  },
  backgroundColour: {
    type: String,
    default: "black",
  },
  fontSize: {
    type: Number,
    default: 24,
  },
  textColour: {
    type: String,
    default: "white",
  },
  heading: {
    type: String,
    default: "h2",
  },
});
</script>
