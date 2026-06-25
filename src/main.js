import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import router from "./router/router.js";
import App from "./App.vue";
import { useAuthStore } from "./store/authStore.js";

async function initialize() {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);

  const authStore = useAuthStore();
  await authStore.checkAuth();

  app.use(router);
  app.mount("#app");
}

initialize();
