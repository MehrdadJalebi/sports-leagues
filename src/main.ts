import { createApp } from "vue";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import router from "./router";
import App from "./App.vue";
import "./style.css";

const queryClient = new QueryClient();

const app = createApp(App).use(VueQueryPlugin, { queryClient });
app.use(router);

app.mount("#app");
