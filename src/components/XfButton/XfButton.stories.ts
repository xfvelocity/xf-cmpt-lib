import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfButton from "./XfButton.vue";

export default { component: XfButton };

export const Primary: StoryObj<typeof XfButton> = {
  render: (args, { argTypes }) => ({
    template: '<XfButton v-bind="args" v-on="$props" />',
    components: {
      XfButton,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfButton),
    text: "Click me",
  },
};
