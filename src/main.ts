import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "@/assets/scss/index.scss";

createApp(App).use(createPinia()).mount("#app");
