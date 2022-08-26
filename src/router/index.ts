import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Main.vue";
import Settings from "../views/Settings.vue";
import City from "../views/City.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/city/:id",
    name: "City",
    component: City,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
