import type { App as AppType } from "vue";
import {
  XfBanner,
  XfButton,
  XfIcon,
  XfModal,
  XfTextArea,
  XfTextInput,
  XfNav,
  XfSelect,
  XfCheckbox,
  XfMenu,
  XfSnackbar,
  XfLoadingBar,
  XfLoadingSpinner,
  XfExpansionPanel,
  XfFuzzyImage,
  XfSidebar,
} from "./index";

export default {
  install: (app: AppType) => {
    app.component("XfBanner", XfBanner);
    app.component("XfButton", XfButton);
    app.component("XfIcon", XfIcon);
    app.component("XfModal", XfModal);
    app.component("XfTextArea", XfTextArea);
    app.component("XfTextInput", XfTextInput);
    app.component("XfNav", XfNav);
    app.component("XfSelect", XfSelect);
    app.component("XfCheckbox", XfCheckbox);
    app.component("XfMenu", XfMenu);
    app.component("XfSnackbar", XfSnackbar);
    app.component("XfLoadingBar", XfLoadingBar);
    app.component("XfLoadingSpinner", XfLoadingSpinner);
    app.component("XfExpansionPanel", XfExpansionPanel);
    app.component("XfFuzzyImage", XfFuzzyImage);
    app.component("XfSidebar", XfSidebar);
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
  XfMenu,
  XfCheckbox,
  XfSnackbar,
  XfLoadingBar,
  XfLoadingSpinner,
  XfExpansionPanel,
  XfFuzzyImage,
  XfSidebar,
};

import { createApp } from "vue";

import App from "./App.vue";

createApp(App).mount("#app");
