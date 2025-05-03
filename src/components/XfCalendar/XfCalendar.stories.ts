import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfCalendar from "./XfCalendar.vue";

export default { component: XfCalendar };

export const Primary: StoryObj<typeof XfCalendar> = {
  render: (args, { argTypes }) => ({
    template: '<XfCalendar v-bind="args" v-on="props" />',
    components: {
      XfCalendar,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfCalendar),
    date: "",
    minDate: "",
  },
};
