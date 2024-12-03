<template>
  <div class="register-screen">
    <img
      src="../assets/Logo_name_correct-removebg-preview.png"
      alt="logoWithNoBG"
    />
    <h2>Register</h2>
    <div class="form-container">
      <form @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
        <button type="button" class="loginbtn" @click="goToLogin">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import { mapActions } from "vuex";
import { nextTick } from "vue";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["setUser", "setToken"]), // Mapping Vuex actions to set user and token
    async register() {
      const toast = useToast();
      try {
        // Use environment variable for API URL
        const apiUrl = import.meta.env.VITE_APP_API_URL;
        if (!apiUrl) {
          throw new Error(
            "API URL is not defined. Please check your environment configuration."
          );
        }

        // API Call for registration
        const response = await axios.post(`${apiUrl}/api/auth/register`, {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        // Handle successful registration and token storage
        if (response.data.token) {
          // Set user and token in Vuex store
          await this.setToken(response.data.token);
          await this.setUser(response.data.user);

          // Store in localStorage for persistence
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user.id);
          localStorage.setItem("username", response.data.user.name);
          localStorage.setItem("avatar", response.data.user.avatar || "");
          localStorage.setItem("winCount", response.data.user.winCount || 0);
          localStorage.setItem("lifeCount", response.data.user.lifeCount || 3);
          localStorage.setItem("score", response.data.user.score || 0);

          // Show success toast
          toast.success("Registration successful! Redirecting to home page...");

          // Use nextTick to ensure redirection happens after the state update is complete
          await nextTick();

          // Redirect to the home page after successful registration
          this.$router.push("/home");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error(
          error.response?.data?.msg || "Registration failed. Please try again."
        );
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.register-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url("../assets/background dark.png") no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
}

img {
  width: 500px;
  height: 100px;
}

h2 {
  font-size: 2em;
  color: #ffd700;
  margin-top: 0;
  margin-bottom: 20px;
  text-shadow: 1px 1px 4px #000;
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  height: fit-content;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input {
  margin-bottom: 15px;
  padding: 12px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  outline: none;
  background: rgba(255, 255, 255, 0.6);
}

input:focus {
  background: rgba(255, 255, 255, 0.9);
}

button {
  padding: 12px;
  font-size: 1.2em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #ffd700;
  color: #ffffff;
  transition: background-color 0.3s ease-in-out;
  font-weight: bold;
}

.loginbtn {
  padding: 12px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #fff;
  color: #ffd700;
  transition: background-color 0.3s ease-in-out;
  margin-top: 20px;
  font-weight: bold;
}

button:hover {
  background-color: #e6b800;
}

.loginbtn:hover {
  color: #fff;
}
</style>
