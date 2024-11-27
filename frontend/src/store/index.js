import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem("token") || "",
    isAuthenticated: !!localStorage.getItem("token"),
    score: 0,
    lifeCount: 3,
    hasSelectedAvatar: false, // Add to track if the user has selected an avatar
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.token = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setScore(state, score) {
      state.score = score;
    },
    setLifeCount(state, lifeCount) {
      state.lifeCount = lifeCount;
    },
    decrementLifeCount(state) {
      if (state.lifeCount > 0) {
        state.lifeCount -= 1;
      }
    },
    incrementScore(state, points) {
      state.score += points;
    },
    setUserAvatar(state, avatar) {
      if (state.user) {
        state.user.avatar = avatar;
      }
    },
    setUserHasSelectedAvatar(state, hasSelectedAvatar) {
      state.hasSelectedAvatar = hasSelectedAvatar;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/auth/login`,
          credentials
        );
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
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/auth/register`,
          userData
        );
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
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/users/update-avatar`,
          {
            userId: state.user.id,
            avatar,
          }
        );
        commit("setUserAvatar", avatar);
        commit("setUserHasSelectedAvatar", true);
      } catch (error) {
        console.error("Error updating avatar", error);
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
    hasSelectedAvatar(state) {
      return state.hasSelectedAvatar;
    },
  },
});

export default store;
