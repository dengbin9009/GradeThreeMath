import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./app/App.vue";
import { router } from "./app/router";
import { installAuthGuards } from "./auth/route-guards";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/motion.css";

const app = createApp(App);
app.use(createPinia());
installAuthGuards(router);
app.use(router);
app.mount("#app");
