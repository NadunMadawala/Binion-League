import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
  },
  actions: {
    // Add actions here as needed (e.g., register, login)
  },
});

export default store;
