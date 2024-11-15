import { createRouter, createWebHistory } from "vue-router";
import SplashScreen from "../views/SplashScreen.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import AvatarSelection from "../views/AvatarSelection.vue";
import Game from "../views/Game.vue";
import BananaGame from "../views/BananaGame.vue";
import Home from "../views/Home.vue";

const routes = [
  { path: "/", name: "Splash", component: SplashScreen },
  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/avatar-selection",
    name: "AvatarSelection",
    component: AvatarSelection,
  },
  { path: "/game", name: "Game", component: Game },
  { path: "/bananaGame", name: "BananaGame", component: BananaGame },
  { path: "/home", name: "Home", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
