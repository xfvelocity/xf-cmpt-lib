import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfTextArea from "./XfTextArea.vue";

export default { component: XfTextArea };

export const Primary: StoryObj<typeof XfTextArea> = {
  render: (args, { argTypes }) => ({
    template: '<XfTextArea v-bind="args" v-on="props" />',
    components: {
      XfTextArea,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfTextArea),
    label: "Message",
    name: "message",
  },
};
