<template>
  <inline-svg
    :class="{ [`xf-icon-colour-${fill}`]: fill }"
    :src="internal ? getImageUrl(`icons/${src}.svg`) : src"
    :height="size"
    :width="size"
  />
</template>

<script lang="ts" setup>
import { getImageUrl } from "@/composables/generic";

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
  internal: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables/colours";

@each $name, $colour in colours.$xf-colours {
  .xf-icon-colour-#{$name} {
    :deep(path),
    :deep(rect) {
      fill: #{$colour} !important;
    }
  }
}
</style>
