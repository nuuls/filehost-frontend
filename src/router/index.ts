// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "Fallback",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/Profile.vue"),
      },
      {
        path: "/settings",
        name: "Settings",
        component: () => import("@/views/Settings.vue"),
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "/signup",
        name: "Signup",
        component: () => import("@/views/Signup.vue"),
      },
      {
        path: "/3rdPartyUploaders",
        name: "ThirdParty",
        component: () => import("@/views/ThirdParty.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
