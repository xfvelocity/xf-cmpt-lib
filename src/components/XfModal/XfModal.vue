<template>
  <transition>
    <div
      v-if="modelValue"
      class="xf-modal xf-w-100 xf-h-100 xf-flex-center"
      @click="closeModal"
    >
      <div
        class="xf-modal-content"
        :class="[
          `xf-bg-${backgroundColour} xf-p-${padding}`,
          { 'xf-h-100 xf-w-100': fullscreen },
        ]"
        :style="
          fullscreen
            ? ''
            : `max-width: ${maxWidth}px; min-height: ${minHeight}px`
        "
        @click.stop=""
      >
        <div class="xf-ml-auto xf-w-max-content">
          <xf-icon
            class="xf-cursor-pointer"
            src="close"
            :fill="closeIconColour"
            internal
            @click="closeModal"
          />
        </div>

        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import XfIcon from "../XfIcon/XfIcon.vue";

// ** Props **
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: Number,
    default: 350,
  },
  minHeight: {
    type: Number,
    default: 300,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  backgroundColour: {
    type: String,
    default: "white",
  },
  closeIconColour: {
    type: String,
    default: "",
  },
  padding: {
    type: Number,
    default: 4,
  },
});

// ** Emits **
const emit = defineEmits(["update:modelValue"]);

// ** Methods **
const closeModal = (): void => {
  if (!props.persistent) {
    emit("update:modelValue", !props.modelValue);
  }
};
</script>

<style lang="scss" scoped>
.xf-modal {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);

  &-content {
    width: 90%;
    border-radius: 10px;
  }
}
</style>
