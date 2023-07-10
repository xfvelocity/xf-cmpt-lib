import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfBanner from "./XfBanner.vue";

export default { component: XfBanner };

export const Primary: StoryObj<typeof XfBanner> = {
  render: (args, { argTypes }) => ({
    template: '<XfBanner v-bind="args" v-on="props" />',
    components: {
      XfBanner,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfBanner),
    text: "About me",
  },
};
