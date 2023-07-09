import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfLoadingBar from "./XfLoadingBar.vue";

export default { component: XfLoadingBar };

export const Primary: StoryObj<typeof XfLoadingBar> = {
  render: (args, { argTypes }) => ({
    template: '<XfLoadingBar v-bind="args" v-on="props" />',
    components: {
      XfLoadingBar,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfLoadingBar),
  },
};
