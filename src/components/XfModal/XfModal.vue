<template>
  <transition>
    <div
      v-if="modelValue"
      class="xf-modal xf-w-100 xf-h-100 xf-flex-center"
      @click="closeModal"
    >
      <div
        class="xf-modal-content xf-bg-white xf-p-6 xf-m-4 xf-pb-12"
        @click.stop=""
      >
        <div class="xf-ml-auto xf-w-max-content">
          <xf-icon
            class="xf-cursor-pointer"
            src="close"
            :size="16"
            @click.stop="closeModal"
          />
        </div>

        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import XfIcon from "@/components/XfIcon/XfIcon.vue";

// ** Base **
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

// ** Methods **
const closeModal = (): void => {
  emit("update:modelValue", !props.modelValue);
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
    min-height: 300px;
    min-width: 300px;
    border-radius: 10px;
  }
}
</style>
