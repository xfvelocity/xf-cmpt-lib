<template>
  <inline-svg
    :class="{ [`xf-icon-colour-${fill}`]: fill }"
    :src="src"
    :height="size"
    :width="size"
  />
</template>

<script lang="ts" setup>
import InlineSvg from "vue-inline-svg";

// ** Props **
defineProps({
  src: {
    type: String,
    default: "",
    required: true,
  },
  fill: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 16,
  },
});
</script>

<style lang="scss" scoped>
@each $name, $colour in $xf-colours {
  .xf-icon-colour-#{$name} {
    :deep(path),
    :deep(rect) {
      fill: #{$colour} !important;
    }
  }
}
</style>
