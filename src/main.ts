import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "@/assets/scss/index.scss";

const app = createApp(App);

app.use(createPinia()).mount("#app");

app.directive("focus", {
  mounted: (el) => {
    if (el instanceof HTMLInputElement) {
      el.focus();
    }
  },
});
