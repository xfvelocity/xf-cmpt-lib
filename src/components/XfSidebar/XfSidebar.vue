<template>
  <div class="xf-sidebar">
    <template v-if="modelValue">
      <transition name="fade">
        <div
          v-if="!transparent"
          class="xf-drawer-overlay"
          @click="$emit('update:modelValue', false)"
        />
      </transition>

      <transition :name="`slide-${side === 'left' ? 'right' : 'left'}`">
        <div
          v-if="modelValue"
          class="xf-drawer-content"
          :class="`xf-bg-${backgroundColour}`"
          :style="[
            `width: ${width}`,
            side === 'left' ? 'left: 0;' : 'right: 0;',
          ]"
        >
          <slot />
        </div>
      </transition>
    </template>
  </div>
</template>

<script lang="ts" setup>
// ** Props **
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "300px",
  },
  backgroundColour: {
    type: String,
    default: "white",
  },
  side: {
    type: String,
    default: "left",
    validator: (v: string) => ["left", "right"].includes(v),
  },
  transparent: {
    type: Boolean,
    default: false,
  },
});

// ** Emits **
defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.xf-drawer {
  transition: background-color 0.5s ease-in-out;

  &-content,
  &-overlay {
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &-content {
    z-index: 50;
    height: 100%;
  }

  &-overlay {
    z-index: 49;
    background: rgba(0, 0, 0, 0.4);
    height: 100%;
  }
}
</style>
