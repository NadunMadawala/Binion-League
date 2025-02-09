<template>
  <div class="login">
    <img
      src="../assets/Logo_name_correct-removebg-preview.png"
      alt="logoWithNoBG"
    />
    <h2>Login</h2>
    <div class="form-container">
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <button type="button" class="regbtn" @click="goToRegister">
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "../utils/axiosInstance"; // Use the axios instance with token headers
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/login`,
          {
            email: this.email,
            password: this.password,
          }
        );

        if (response.data.msg === "User login successfully") {
          this.toast.success("Login successful!");

          // Store userId, username, avatar, etc. in Vuex and localStorage
          this.$store.commit("setUser", {
            id: response.data.userId,
            name: response.data.username,
            avatar: response.data.avatar,
            winCount: response.data.winCount,
            lifeCount: response.data.lifeCount,
            score: response.data.score,
          });
          this.$store.commit("setToken", response.data.token);

          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("avatar", response.data.avatar);
          localStorage.setItem("winCount", response.data.winCount);
          localStorage.setItem("lifeCount", response.data.lifeCount);
          localStorage.setItem("score", response.data.score);

          // Debugging - Check if the store and localStorage have been set correctly
          console.log("User state after login:", this.$store.state.user);
          console.log("Local storage set successfully");

          // Redirect to the home page or avatar selection based on avatar status
          if (response.data.avatar) {
            this.$router.push("/home");
          } else {
            this.$router.push("/avatar-selection");
          }
        } else {
          // Handle the error message if the login was unsuccessful
          this.toast.error("Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        this.toast.error(
          error.response?.data?.msg || "Login failed. Please try again."
        );
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
  created() {
    this.toast = useToast();
  },
};
</script>

<style scoped>
/* The styling remains unchanged */
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.login {
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

.regbtn {
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

.regbtn:hover {
  color: #fff;
}
</style>
