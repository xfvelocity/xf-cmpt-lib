import type { App } from "vue";
import {
  XfBanner,
  XfButton,
  XfIcon,
  XfModal,
  XfTextArea,
  XfTextInput,
  XfNav,
  XfSelect,
  XfLoading,
} from "./index";

export default {
  install: (app: App) => {
    app.component("XfBanner", XfBanner);
    app.component("XfButton", XfButton);
    app.component("XfIcon", XfIcon);
    app.component("XfModal", XfModal);
    app.component("XfTextArea", XfTextArea);
    app.component("XfTextInput", XfTextInput);
    app.component("XfNav", XfNav);
    app.component("XfSelect", XfSelect);
    app.component("XfLoading", XfLoading);
  },
};

export {
  XfBanner,
  XfButton,
  XfIcon,
  XfModal,
  XfTextArea,
  XfTextInput,
  XfNav,
  XfSelect,
  XfLoading,
};
