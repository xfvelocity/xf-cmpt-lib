import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfSelect from "./XfSelect.vue";

export default { component: XfSelect };

export const Primary: StoryObj<typeof XfSelect> = {
  render: (args, { argTypes }) => ({
    template: '<XfSelect v-bind="args" v-on="props" />',
    components: {
      XfSelect,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfSelect),
    label: "Countries",
    options: [
      {
        text: "England",
        value: "england",
      },
    ],
  },
};
