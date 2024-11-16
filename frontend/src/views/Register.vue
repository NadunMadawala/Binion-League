<template>
  <div class="register-screen">
    <img src="../assets/Logo_name_correct-removebg-preview.png" alt="logoWithNoBG">
    <h2>Register</h2>
    <div class="form-container">
      <form @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit" >Sign Up</button>
        <button type="button" class="loginbtn" @click="goToLogin">Login</button> 
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        const apiUrl = import.meta.env.VUE_APP_API_URL;
        console.log(apiUrl)
        const response = await axios.post(`http://localhost:5000/api/auth/register`, {
          name: this.name,
          email: this.email,
          password: this.password,
});


        
        localStorage.setItem('token', response.data.token);
        this.toast.success('Registration successful! Redirecting to login page...');

        // Redirect to login page
        this.$router.push('/login');
      } catch (error) {
        this.toast.error(error.response?.data?.msg || 'Registration failed. Please try again.');
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
  },
  created() {
    this.toast = useToast();
  },
};
</script>
<style scoped>

html, body, #app {
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
  background: url('../assets/background dark.png') no-repeat center center fixed; 
  background-size: cover;
  overflow: hidden;
}

img {
  width: 500px;
  height: 100px;
}

h2 {
  font-size: 2em;
  color: #FFD700;
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
  background: #FFD700; 
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
  color: #FFD700;
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