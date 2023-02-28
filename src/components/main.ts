import type { App } from "vue";
import {
  XfBanner,
  XfButton,
  XfIcon,
  XfModal,
  XfTextArea,
  XfTextInput,
  XfNav,
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
  },
};

export { XfBanner, XfButton, XfIcon, XfModal, XfTextArea, XfTextInput, XfNav };
