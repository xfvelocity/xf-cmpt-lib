<template>
  <div>
    <div
      v-for="(item, i) in listRef"
      :key="i"
      class="xf-expansion-panel xf-mb-2"
    >
      <div
        class="xf-p-2 xf-px-4 xf-expansion-panel-title"
        :class="[
          `xf-bg-${backgroundColour}`,
          item.text.length ? 'xf-cursor-pointer' : 'xf-disabled',
          { 'xf-expansion-panel-title-active': item.active },
        ]"
        @click="item.text.length ? togglePanel(item) : ''"
      >
        <h3
          class="xf-mr-2 xf-mb-0"
          :class="`xf-text-colour-${textColour}`"
          :style="`font-size: ${fontSize}px`"
        >
          {{ item.title }}
        </h3>

        <xf-icon
          v-if="item.text.length"
          class="xf-ml-auto xf-expansion-panel-arrow"
          :class="{ 'xf-expansion-panel-arrow-active': item.active }"
          src="chevron-down"
          :fill="textColour"
          internal
        />
      </div>

      <transition name="slide-down">
        <div
          v-show="item.active"
          class="xf-p-3 xf-expansion-panel-secondary"
          :class="`xf-bg-${secondaryBackgroundColour} xf-text-colour-${secondaryTextColour}`"
        >
          <template v-if="Array.isArray(item.text)">
            <p
              v-for="(text, ti) in item.text"
              :key="ti"
              v-html="text"
              class="xf-mb-2"
              :style="`font-size: ${secondaryFontSize}px`"
            />
          </template>

          <p
            v-else
            v-html="item.text"
            :style="`font-size: ${secondaryFontSize}px`"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from "vue";
import { ExpansionPanel } from "./types/expansionPanel.types";

import XfIcon from "@/components/XfIcon/XfIcon.vue";

// ** Props **
const props = defineProps({
  list: {
    type: Array as PropType<ExpansionPanel[]>,
    default: () => [],
    required: true,
  },
  backgroundColour: {
    type: String,
    default: "grey-lighten-3",
  },
  textColour: {
    type: String,
    default: "black",
  },
  secondaryBackgroundColour: {
    type: String,
    default: "grey-lighten-5",
  },
  secondaryTextColour: {
    type: String,
    default: "black",
  },
  fontSize: {
    type: Number,
    default: 16,
  },
  secondaryFontSize: {
    type: Number,
    default: 14,
  },
});

// ** Data **
const listRef = ref<ExpansionPanel[]>([]);

// ** Methods **
const togglePanel = (item: ExpansionPanel): void => {
  if (item.active) {
    item.active = false;
  } else {
    listRef.value.forEach((l) => (l.active = false));

    item.active = true;
  }
};

// ** Watchers **
watch(
  () => props.list,
  (value) => {
    listRef.value = value.map((l) => ({ ...l, active: false }));
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.xf-expansion-panel {
  &-title {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    border-radius: 5px;

    &-active {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
    }
  }

  &-secondary {
    position: relative;
    top: -2px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &-arrow {
    transition: all 0.4s ease-out;

    &-active {
      transform: rotate(180deg);
    }
  }

  .slide-down-enter-active,
  .slide-down-leave-active {
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: linear;
    transition-delay: 0;
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    transform: translateY(-50px);
    opacity: 0;
  }
}
</style>
