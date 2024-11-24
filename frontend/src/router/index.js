import { createRouter, createWebHistory } from "vue-router";
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
  { path: "/leaderboard", name: "LeaderBoard", component: LeaderBoard },
  { path: "/account", name: "Account", component: Account },
  { path: "/tutorial", name: "Tutorial", component: Tutorial },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
