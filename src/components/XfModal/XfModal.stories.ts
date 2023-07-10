import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfModal from "./XfModal.vue";

export default { component: XfModal };

export const Primary: StoryObj<typeof XfModal> = {
  render: (args, { argTypes }) => ({
    template: `<XfModal v-bind="args" v-on="props">
      Im an open modal
    </XfModal>`,
    components: {
      XfModal,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfModal),
    modelValue: true,
  },
};
