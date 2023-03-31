<template>
  <div>
    <div
      class="xf-text-area xf-input"
      :class="[
        `xf-border-colour-${colour}`,
        outlined ? 'xf-text-area-outlined' : 'xf-text-area-border',
        {
          'xf-input-populated': !!modelValue,
          'xf-input-active': isActive,
          'xf-disabled': disabled,
        },
      ]"
    >
      <textarea
        class="xf-text-area xf-px-2 yd-py-1 xf-text-16 yd-w-100"
        :class="[`xf-text-colour-${colour}`]"
        :value="modelValue"
        :rows="rows"
        :autocomplete="autocomplete"
        data-test-id="xf-text-area-input"
        @input="emitValue"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.enter="disabled ? '' : $emit('keydown.enter')"
      />

      <label
        v-if="label"
        :class="[
          `xf-text-colour-${colour}`,
          { [`xf-bg-${outlineBackground}`]: outlined },
        ]"
        :for="name"
      >
        {{ label }}
      </label>
    </div>

    <span
      v-if="errorMessages?.length"
      class="xf-text-14 xf-fw-600 xf-text-colour-red"
      data-test-id="xf-text-area-error"
    >
      {{ errorMessages[0] }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import XfIcon from "@/components/XfIcon/XfIcon.vue";

// ** Base **
withDefaults(
  defineProps<{
    label: string;
    modelValue: string | number | null;
    rows?: number;
    name?: string;
    type?: string;
    errorMessages?: string[];
    colour?: string;
    disabled?: boolean;
    outlined?: boolean;
    outlineBackground?: string;
    autocomplete?: string;
  }>(),
  {
    rows: 3,
    type: "text",
    colour: "black",
    outlineBackground: "white",
  }
);

// ** Emits **
const emit = defineEmits([
  "update:modelValue",
  "click:append",
  "focus",
  "blur",
]);

// ** Data **
const isActive = ref<boolean>(false);

// ** Methods **
const onFocus = (event: FocusEvent): void => {
  emit("focus", event);
  isActive.value = true;
};

const onBlur = (event: FocusEvent): void => {
  emit("blur", event);
  isActive.value = false;
};

const emitValue = (event: Event): void => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
.xf-text-area {
  display: flex;

  textarea {
    border: none;
    overflow: auto;
    outline: none;
    width: 100%;
    border-radius: 0;
    background-color: transparent;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none;
  }

  label {
    top: 7px;
  }

  &-border {
    border-bottom: 1px solid;
  }

  &-outlined {
    border: 1px solid;
    border-radius: 5px;
    min-height: 45px;

    label {
      padding: 2px 5px;
    }
  }
}
</style>
