// import { createStore } from "vuex";
// import axios from "axios";

// const store = createStore({
//   state: {
//     user: null,
//     token: localStorage.getItem("token") || "",
//     isAuthenticated: !!localStorage.getItem("token"),
//     score: 0,
//     lifeCount: 3,
//     winCount: 0,
//     hasSelectedAvatar: false, // Add to track if the user has selected an avatar
//   },
//   mutations: {
//     setUser(state, user) {
//       state.user = user;
//     },
//     setToken(state, token) {
//       state.token = token;
//       localStorage.setItem("token", token);
//       state.isAuthenticated = true;
//     },
//     clearUser(state) {
//       state.user = null;
//       state.token = "";
//       state.isAuthenticated = false;
//       localStorage.removeItem("token");
//     },
//     setScore(state, score) {
//       state.score = score;
//     },
//     setLifeCount(state, lifeCount) {
//       state.lifeCount = lifeCount;
//     },
//     decrementLifeCount(state) {
//       if (state.lifeCount > 0) {
//         state.lifeCount -= 1;
//       }
//     },
//     incrementScore(state, points) {
//       state.score += points;
//     },
//     setUserAvatar(state, avatar) {
//       if (state.user) {
//         state.user.avatar = avatar;
//       }
//     },
//     setUserHasSelectedAvatar(state, hasSelectedAvatar) {
//       state.hasSelectedAvatar = hasSelectedAvatar;
//     },
//   },
//   actions: {
//     async login({ commit }, credentials) {
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_APP_API_URL}/api/auth/login`,
//           credentials
//         );
//         if (response.data.token) {
//           commit("setToken", response.data.token);
//           commit("setUser", response.data.user);
//         }
//       } catch (error) {
//         console.error("Login failed", error);
//         throw error;
//       }
//     },
//     async register({ commit }, userData) {
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_APP_API_URL}/api/auth/register`,
//           userData
//         );
//         if (response.data.token) {
//           commit("setToken", response.data.token);
//           commit("setUser", response.data.user);
//         }
//       } catch (error) {
//         console.error("Registration failed", error);
//         throw error;
//       }
//     },
//     async updateAvatar({ commit, state }, avatar) {
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_APP_API_URL}/api/users/update-avatar`,
//           {
//             userId: state.user.id,
//             avatar,
//           }
//         );
//         commit("setUserAvatar", avatar);
//         commit("setUserHasSelectedAvatar", true);
//       } catch (error) {
//         console.error("Error updating avatar", error);
//         throw error;
//       }
//     },
//     logout({ commit }) {
//       commit("clearUser");
//     },
//   },
//   getters: {
//     isAuthenticated(state) {
//       return state.isAuthenticated;
//     },
//     user(state) {
//       return state.user;
//     },
//     score(state) {
//       return state.score;
//     },
//     lifeCount(state) {
//       return state.lifeCount;
//     },
//     winCount(state) {
//       return state.winCount;
//     },
//     hasSelectedAvatar(state) {
//       return state.hasSelectedAvatar;
//     },
//   },
// });

// export default store;
// File: store/index.js

import { createStore } from "vuex";
import axios from "axios";

// Set default base URL for axios
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const store = createStore({
  state: {
    user: null,
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
    hasSelectedAvatar: !!localStorage.getItem("avatar"), // Tracks if the user has selected an avatar
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
    },
    clearUser(state) {
      state.user = null;
      state.token = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
        localStorage.setItem("avatar", avatar);
      }
    },
    setUserHasSelectedAvatar(state, hasSelectedAvatar) {
      state.hasSelectedAvatar = hasSelectedAvatar;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(`/api/auth/login`, credentials);
        if (response.data.token) {
          commit("setToken", response.data.token);
          commit("setUser", response.data.user);
          axios.defaults.headers.common["x-auth-token"] = response.data.token; // Set token in Axios headers for future requests
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
          axios.defaults.headers.common["x-auth-token"] = response.data.token; // Set token in Axios headers for future requests
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
          commit("setUserHasSelectedAvatar", true);
        }
      } catch (error) {
        console.error("Error updating avatar", error);
        throw error;
      }
    },
    logout({ commit }) {
      commit("clearUser");
      delete axios.defaults.headers.common["x-auth-token"];
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
  axios.defaults.headers.common["x-auth-token"] = store.state.token;
}

export default store;
