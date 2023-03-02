import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/MainView.vue";
import SettingsView from "../views/SettingsView.vue";
import CityView from "../views/CityView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsView,
  },
  {
    path: "/city/:id",
    name: "City",
    component: CityView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
