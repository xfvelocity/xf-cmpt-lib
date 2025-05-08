import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfTooltip from "./XfTooltip.vue";
import XfIcon from "../XfIcon/XfIcon.vue";

export default { component: XfTooltip };

export const Primary: StoryObj<typeof XfTooltip> = {
  render: (args, { argTypes }) => ({
    template:
      '<XfTooltip v-bind="args" v-on="props"><XfIcon src="close" internal /></XfTooltip>',
    components: {
      XfTooltip,
      XfIcon,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfTooltip),
    text: "Close me",
    position: "bottom",
  },
};
