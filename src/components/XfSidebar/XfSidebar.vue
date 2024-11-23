<template>
  <div class="xf-sidebar">
    <template v-if="modelValue">
      <transition name="fade">
        <div
          v-if="backdrop"
          class="xf-drawer-overlay"
          @click="$emit('update:modelValue', false)"
        />
      </transition>

      <transition :name="`slide-${side === 'left' ? 'right' : 'left'}`">
        <div
          v-if="modelValue"
          class="xf-drawer-content xf-p-2"
          :class="`xf-bg-${backgroundColour} xf-drawer-content-${side}`"
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
  backdrop: {
    type: Boolean,
    default: true,
  },
});

// ** Emits **
defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/assets/styles/variables/colours";

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

    &-left {
      border-right: 1px solid map.get(colours.$xf-colours, "grey-lighten-2");
      box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.05);
    }

    &-right {
      border-left: 1px solid map.get(colours.$xf-colours, "grey-lighten-2");
      box-shadow: -2px 0px 4px 0px rgba(0, 0, 0, 0.05);
    }
  }

  &-overlay {
    z-index: 49;
    background: rgba(0, 0, 0, 0.4);
    height: 100%;
  }
}
</style>
