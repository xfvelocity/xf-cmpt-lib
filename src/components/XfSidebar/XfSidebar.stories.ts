import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfSidebar from "./XfSidebar.vue";

export default { component: XfSidebar };

export const Primary: StoryObj<typeof XfSidebar> = {
  render: (args, { argTypes }) => ({
    template: `
        <div>
            <button class="xf-m-2" @click="args.modelValue = true">Open Sidebar</button>

            <XfSidebar v-bind="args" v-on="props" @update:modelValue="args.modelValue = false">
              <p>I am a sidebar</p>
            </XfSidebar>
        </div>`,
    components: {
      XfSidebar,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  parameters: {
    layout: "fullscreen",
  },
  args: {
    ...buildDefaultProps(XfSidebar),
    side: "right",
  },
};
