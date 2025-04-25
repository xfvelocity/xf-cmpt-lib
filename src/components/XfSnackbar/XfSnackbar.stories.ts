import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfSnackbar from "./XfSnackbar.vue";

export default { component: XfSnackbar };

export const Primary: StoryObj<typeof XfSnackbar> = {
  render: (args, { argTypes }) => ({
    template: '<XfSnackbar v-bind="args" v-on="props" />',
    components: {
      XfSnackbar,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfSnackbar),
    modelValue: true,
    text: "Message sent!",
  },
};
