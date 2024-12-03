import { createStore } from "vuex";
import axios from "axios";

// Set default base URL for axios
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || "",
    isAuthenticated: !!localStorage.getItem("token"),
    score: localStorage.getItem("score")
      ? parseInt(localStorage.getItem("score"))
      : 0,
    lifeCount: localStorage.getItem("lifeCount")
      ? parseInt(localStorage.getItem("lifeCount"))
      : 3,
    winCount: localStorage.getItem("winCount")
      ? parseInt(localStorage.getItem("winCount"))
      : 0,
    hasSelectedAvatar: !!localStorage.getItem("avatar"),
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
      state.isAuthenticated = true;
      // Set the Axios authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    clearUser(state) {
      state.user = null;
      state.token = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("avatar");
      localStorage.removeItem("score");
      localStorage.removeItem("lifeCount");
      localStorage.removeItem("winCount");
      delete axios.defaults.headers.common["Authorization"];
    },
    setScore(state, score) {
      state.score = score;
      localStorage.setItem("score", score);
    },
    setLifeCount(state, lifeCount) {
      state.lifeCount = lifeCount;
      localStorage.setItem("lifeCount", lifeCount);
    },
    decrementLifeCount(state) {
      if (state.lifeCount > 0) {
        state.lifeCount -= 1;
        localStorage.setItem("lifeCount", state.lifeCount);
      }
    },
    incrementScore(state, points) {
      state.score += points;
      localStorage.setItem("score", state.score);
    },
    setUserAvatar(state, avatar) {
      if (state.user) {
        state.user.avatar = avatar;
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("avatar", avatar);
      }
    },
    setWinCount(state, winCount) {
      state.winCount = winCount;
      localStorage.setItem("winCount", winCount);
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(`/api/auth/login`, credentials);
        if (response.data.token) {
          commit("setToken", response.data.token);
          commit("setUser", response.data.user);
        }
      } catch (error) {
        console.error("Login failed", error);
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post(`/api/auth/register`, userData);
        if (response.data.token) {
          commit("setToken", response.data.token);
          commit("setUser", response.data.user);
        }
      } catch (error) {
        console.error("Registration failed", error);
        throw error;
      }
    },
    async updateAvatar({ commit, state }, avatar) {
      try {
        const response = await axios.post(`/api/users/update-avatar`, {
          userId: state.user.id,
          avatar,
        });
        if (response.status === 200) {
          commit("setUserAvatar", avatar);
        }
      } catch (error) {
        console.error("Error updating avatar", error);
        throw error;
      }
    },
    async incrementWinCount({ commit, state }) {
      try {
        const response = await axios.post(`/api/users/increment-win`, {
          userId: state.user.id,
          winCount: state.winCount + 1,
        });
        if (response.status === 200) {
          commit("setWinCount", state.winCount + 1);
        }
      } catch (error) {
        console.error("Error incrementing win count", error);
        throw error;
      }
    },
    logout({ commit }) {
      commit("clearUser");
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    user(state) {
      return state.user;
    },
    score(state) {
      return state.score;
    },
    lifeCount(state) {
      return state.lifeCount;
    },
    winCount(state) {
      return state.winCount;
    },
    hasSelectedAvatar(state) {
      return state.hasSelectedAvatar;
    },
  },
});

// Set the default Axios Authorization header to the token if it's available
if (store.state.token) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
}

export default store;
