<template>
  <inline-svg
    :src="`/icons/${src}.svg`"
    :fill="fill"
    :height="size"
    :width="size"
  />
</template>

<script lang="ts" setup>
import InlineSvg from "vue-inline-svg";

defineProps<{
  src: string;
  fill?: number;
  size?: number;
}>();
</script>

<style lang="scss" scoped>
@each $name, $colour in $xf-colours {
  .yd-icon-colour {
    &-stroke-#{$name} {
      :deep(path),
      :deep(rect) {
        stroke: #{$colour} !important;
      }
    }

    &-#{$name} {
      :deep(path),
      :deep(rect) {
        fill: #{$colour} !important;
      }
    }
  }
}
</style>
