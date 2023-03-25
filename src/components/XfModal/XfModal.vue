<template>
  <transition>
    <div
      v-if="modelValue"
      class="xf-modal xf-w-100 xf-h-100 xf-flex-center"
      @click="closeModal"
    >
      <div
        class="xf-modal-content xf-bg-white xf-p-4"
        :style="`max-width: ${maxWidth}px; max-height: ${minHeight}px`"
        @click.stop=""
      >
        <div class="xf-ml-auto xf-w-max-content">
          <xf-icon
            class="xf-cursor-pointer"
            src="icons/close.svg"
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
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    persistent?: boolean;
    maxWidth?: number;
    minHeight?: number;
  }>(),
  {
    maxWidth: 350,
    minHeight: 300,
  }
);

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
