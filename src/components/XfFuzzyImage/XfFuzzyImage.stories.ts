import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfFuzzyImage from "./XfFuzzyImage.vue";

export default { component: XfFuzzyImage };

export const Primary: StoryObj<typeof XfFuzzyImage> = {
  render: (args, { argTypes }) => ({
    template: '<XfFuzzyImage v-bind="args" v-on="props" />',
    components: {
      XfFuzzyImage,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfFuzzyImage),
    img: "/img/example.jpg",
    minImg: "/img/example-min.jpg",
    background: true,
  },
};
