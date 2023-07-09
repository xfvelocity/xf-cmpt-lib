import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfExpansionPanel from "./XfExpansionPanel.vue";

export default { component: XfExpansionPanel };

export const Primary: StoryObj<typeof XfExpansionPanel> = {
  render: (args, { argTypes }) => ({
    template: '<XfExpansionPanel v-bind="args" v-on="props" />',
    components: {
      XfExpansionPanel,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfExpansionPanel),
    list: [
      {
        title: "Test 1",
        text: "test test",
      },
      {
        title: "Test 2",
        text: "test test",
      },
    ],
  },
};
