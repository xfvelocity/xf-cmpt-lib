import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfNav from "./XfNav.vue";

export default { component: XfNav };

export const Primary: StoryObj<typeof XfNav> = {
  render: (args, { argTypes }) => ({
    template: '<XfNav v-bind="args" v-on="props" />',
    components: {
      XfNav,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfNav),
  },
};
