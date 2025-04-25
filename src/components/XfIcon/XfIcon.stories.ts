import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfIcon from "./XfIcon.vue";

export default { component: XfIcon };

export const Primary: StoryObj<typeof XfIcon> = {
  render: (args, { argTypes }) => ({
    template: '<XfIcon v-bind="args" v-on="props" />',
    components: {
      XfIcon,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfIcon),
    src: "close",
    internal: true,
  },
};
