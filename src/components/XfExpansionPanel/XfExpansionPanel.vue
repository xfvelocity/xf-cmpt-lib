<template>
  <div>
    <div
      v-for="(item, i) in listRef"
      :key="i"
      class="xf-expansion-panel xf-mb-2"
    >
      <div
        class="xf-p-2 xf-px-4 xf-expansion-panel-title xf-cursor-pointer"
        :class="[
          `xf-bg-${backgroundColour}`,
          { 'xf-expansion-panel-title-active': item.active },
        ]"
        @click="togglePanel(item)"
      >
        <h3 class="xf-mr-2 xf-mb-0" :class="`xf-text-colour-${textColour}`">
          {{ item.title }}
        </h3>

        <xf-icon
          class="xf-ml-auto xf-expansion-panel-arrow"
          :class="{ 'xf-expansion-panel-arrow-active': item.active }"
          src="icons/chevron-down.svg"
          :fill="textColour"
        />
      </div>

      <transition name="slide-down">
        <div
          v-show="item.active"
          class="xf-p-4 xf-expansion-panel-secondary"
          :class="`xf-bg-${secondaryBackgroundColour} xf-text-colour-${secondaryTextColour}`"
        >
          <template v-if="Array.isArray(item.text)">
            <p v-for="(text, ti) in item.text" :key="ti" class="xf-mb-2">
              {{ text }}
            </p>
          </template>

          <p v-else>
            {{ item.text }}
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { ExpansionPanel } from "./types/expansionPanel.types";

import XfIcon from "@/components/XfIcon/XfIcon.vue";

// ** Base **
const props = withDefaults(
  defineProps<{
    list: ExpansionPanel[];
    backgroundColour?: string;
    textColour?: string;
    secondaryBackgroundColour?: string;
    secondaryTextColour?: string;
  }>(),
  {
    backgroundColour: "white",
    textColour: "black",
    secondaryBackgroundColour: "white",
    secondaryTextColour: "black",
  }
);

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
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.xf-expansion-panel {
  &-title {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    border-radius: 3px;

    &-active {
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    }
  }

  &-secondary {
    position: relative;
    top: -2px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
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
