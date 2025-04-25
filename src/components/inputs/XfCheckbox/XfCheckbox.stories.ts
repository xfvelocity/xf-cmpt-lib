import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfCheckbox from "./XfCheckbox.vue";

export default { component: XfCheckbox };

export const Primary: StoryObj<typeof XfCheckbox> = {
  render: (args, { argTypes }) => ({
    template: '<XfCheckbox v-bind="args" v-on="props" />',
    components: {
      XfCheckbox,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfCheckbox),
    label: "Do you like chips?",
    name: "chips_liked",
  },
};
