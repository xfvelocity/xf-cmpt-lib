import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfLoadingSpinner from "./XfLoadingSpinner.vue";

export default { component: XfLoadingSpinner };

export const Primary: StoryObj<typeof XfLoadingSpinner> = {
  render: (args, { argTypes }) => ({
    template: '<XfLoadingSpinner v-bind="args" v-on="props" />',
    components: {
      XfLoadingSpinner,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfLoadingSpinner),
  },
};
