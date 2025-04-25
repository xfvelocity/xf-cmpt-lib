import type { StoryObj } from "@storybook/vue3";
import { buildDefaultProps } from "@/composables/storybook";

import XfMenu from "./XfMenu.vue";

export default { component: XfMenu };

export const Primary: StoryObj<typeof XfMenu> = {
  render: (args, { argTypes }) => ({
    template: `<XfMenu v-bind="args" v-on="props">
        <template #activator>
          Open me
        </template>
        
        <div class="xf-p-4">
          Im an open menu
        </div>
      </XfMenu>`,
    components: {
      XfMenu,
    },
    props: Object.keys(argTypes),
    setup() {
      return { args };
    },
  }),
  args: {
    ...buildDefaultProps(XfMenu),
  },
};
