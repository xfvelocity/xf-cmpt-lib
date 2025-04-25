import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfTextInput from "./XfTextInput.vue";

export default { component: XfTextInput };

export const Primary: StoryObj<typeof XfTextInput> = {
  render: (args, { argTypes }) => ({
    template: '<XfTextInput v-bind="args" v-on="props" />',
    components: {
      XfTextInput,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfTextInput),
    label: "Name",
  },
};
