import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/peoples",
      name: "peoples",
      component: () => import("../views/PeoplesView.vue")
    },
    {
      path: "/peoples/:id",
      name: "single_people",
      component: () => import("../views/PeopleSingleView.vue")
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("../views/FavoritesView.vue")
    }
  ]
});

export default router;
