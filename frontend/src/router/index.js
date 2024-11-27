import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import SplashScreen from "../views/SplashScreen.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import AvatarSelection from "../views/AvatarSelection.vue";
import Game from "../views/Game.vue";
import BananaGame from "../views/BananaGame.vue";
import Home from "../views/Home.vue";
import LeaderBoard from "../views/LeaderBoard.vue";
import Account from "../views/Account.vue";
import Tutorial from "../views/Tutorial.vue";

const routes = [
  {
    path: "/",
    name: "Splash",
    component: SplashScreen,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresUnauth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresUnauth: true,
    },
  },
  {
    path: "/avatar-selection",
    name: "AvatarSelection",
    component: AvatarSelection,
    meta: {
      requiresAuth: true,
      requiresNoAvatar: true,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/bananaGame",
    name: "BananaGame",
    component: BananaGame,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/leaderboard",
    name: "LeaderBoard",
    component: LeaderBoard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tutorial",
    name: "Tutorial",
    component: Tutorial,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add route guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const hasSelectedAvatar = store.getters.hasSelectedAvatar;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/login");
    } else if (to.matched.some((record) => record.meta.requiresNoAvatar)) {
      if (hasSelectedAvatar) {
        next("/home");
      } else {
        next();
      }
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresUnauth)) {
    if (isAuthenticated) {
      next("/home");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
