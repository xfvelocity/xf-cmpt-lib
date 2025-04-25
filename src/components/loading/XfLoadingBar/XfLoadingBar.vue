<template>
  <div>
    <div
      class="loading-bar"
      :class="`xf-bg-${backgroundColour}`"
      :style="`height: ${height}px`"
    >
      <div class="loading-bar-progress" :class="`xf-bg-${progressColour}`" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// ** Props **
defineProps({
  backgroundColour: {
    type: String,
    default: "grey-lighten-3",
  },
  height: {
    type: Number,
    default: 5,
  },
  progressColour: {
    type: String,
    default: "green",
  },
});
</script>

<style lang="scss" scoped>
.loading-bar {
  width: 100%;

  &-progress {
    height: 100%;
    width: 0;
    animation: loading-bar-progress 2s linear infinite;
  }
}

@keyframes loading-bar-progress {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
