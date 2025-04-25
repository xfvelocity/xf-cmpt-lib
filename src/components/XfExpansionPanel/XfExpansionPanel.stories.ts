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
        title: "How do you make toast?",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id sem sed urna pharetra rutrum. Quisque convallis urna at purus imperdiet, sit amet aliquet mi tincidunt. Sed tristique velit non erat ornare, et sollicitudin tellus facilisis. Aenean malesuada elit semper quam blandit, eget aliquam dui sodales.",
      },
      {
        title: "How to fry an egg?",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id sem sed urna pharetra rutrum. Quisque convallis urna at purus imperdiet, sit amet aliquet mi tincidunt. Sed tristique velit non erat ornare, et sollicitudin tellus facilisis. Aenean malesuada elit semper quam blandit, eget aliquam dui sodales.",
      },
    ],
  },
};
