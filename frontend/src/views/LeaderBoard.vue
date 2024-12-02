<template>
  <div class="leaderboard">
    <div class="header">
      <img
        src="../assets/Corrected logo without bg.png"
        alt="logoWithNoBG"
        class="headerLogo"
      />
      <img
        src="../assets/Logo_name_correct-removebg-preview.png"
        alt="logoWithNoBG"
        class="headerName"
      />
      <div class="userName">
        <div class="user-avatar-container">
          <img
            v-if="avatar"
            :src="getAvatarImage(avatar)"
            alt="User Avatar"
            class="user-avatar"
          />
        </div>
        {{ username }}
      </div>
    </div>
    <h2>Leaderboard</h2>
    <div class="content-container">
      <div class="nav-panel">
        <div class="nav-container">
          <a href="/home" class="navbtn">Home</a>
          <a href="/tutorial" class="navbtn">Tutorial & Story</a>
          <a href="/leaderboard" class="navbtn">Leaderboard</a>
          <a href="/account" class="navbtn">Account</a>
          <button class="logoutbtn" @click="logout">Logout</button>
        </div>
      </div>
      <div class="board-container">
        <div class="name-container">
          <!-- Header Row -->
          <div class="headline-line">
            <h3>Avatar</h3>
            <h3>Name</h3>
            <!-- <h3>Life Count</h3> -->
            <!-- <h3>Score</h3> -->
            <h3>Wins</h3>
          </div>

          <!-- User Data Rows -->
          <div v-for="(user, index) in users" :key="index" class="user-line">
            <div class="user-avatar-container">
              <img
                v-if="user.avatar"
                :src="getAvatarImage(user.avatar)"
                alt="User Avatar"
                class="user-avatar"
              />
            </div>
            <h3>{{ user.name }}</h3>
            <!-- <h3>{{ user.lifeCount }}</h3> -->
            <!-- <h3>{{ user.score }}</h3> -->
            <h3>{{ user.winCount }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import BobImage from "../assets/AvatarImages/Bob.png";
import DaveImage from "../assets/AvatarImages/Dave.png";
import JerryImage from "../assets/AvatarImages/Jerry.png";
import KevinImage from "../assets/AvatarImages/Kevin.png";
import PhillImage from "../assets/AvatarImages/Phill.png";
import StuartImage from "../assets/AvatarImages/Stuart.png";
import TomImage from "../assets/AvatarImages/Tom.png";
import CarlImage from "../assets/AvatarImages/Carl.png";

export default {
  data() {
    return {
      username: localStorage.getItem("name"),
      avatar: localStorage.getItem("avatar"),
      users: [], // Array to store user data
      avatars: {
        Bob: BobImage,
        Carl: CarlImage,
        Dave: DaveImage,
        Jerry: JerryImage,
        Kevin: KevinImage,
        Phill: PhillImage,
        Stuart: StuartImage,
        Tom: TomImage,
      },
      username: localStorage.getItem("username"),
      score: localStorage.getItem("score"),
      lifeCount: localStorage.getItem("lifeCount"),
      winCount: localStorage.getItem("winCount"),
      avatar: localStorage.getItem("avatar"),
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const apiUrl = "http://localhost:5000/api"; // Replace with your backend base URL
        const response = await axios.get(`${apiUrl}/users/getAllUsers`);
        this.users = response.data; // Assign the fetched users to the `users` array
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    getAvatarImage(avatarName) {
      return this.avatars[avatarName] || null;
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  computed: {
    avatarImage() {
      return this.avatars[this.avatar] || null;
    },
  },
  created() {
    this.fetchUserData(); // Fetch user data when the component is created
  },
};
</script>

<style scoped>
/* Add your CSS here */
.leaderboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: url("../assets/background dark.png") no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
  color: #ffd700;
}

.header {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
}

.header .headerLogo {
  width: 200px;
  height: 200px;
  margin-top: 0;
  justify-content: center;
}

.header .headerName {
  width: 500px;
  height: 100px;
  margin-top: 0;
  justify-content: center;
}

.userName {
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  height: 60px;
  width: 60px;
  background: white;
  border-radius: 50%;
  object-fit: cover;
}

.content-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

a {
  text-decoration: none;
  cursor: pointer;
}

.nav-panel {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  width: 12%;
  margin-left: 5%;
  margin-top: 20px;
  position: fixed;
}

.nav-container {
  display: flex;
  flex-direction: column;
  background-color: #e8b931;
  border-radius: 20px;
  padding: 10px;
}

.navbtn {
  background-color: #fbf4a9;
  color: black;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 20px;
  font-weight: bold;
  align-content: center;
}

.navbtn:hover {
  background-color: #ffffff;
  color: #ffd700;
  transform: scale(1.1);
  border: 3px solid #ffd700;
}

.logoutbtn {
  color: crimson;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  font-weight: bolder;
  border: 3px solid red;
  align-content: center;
  cursor: pointer;
}

.logoutbtn:hover {
  background-color: crimson;
  color: #ffd700;
  transform: scale(1.1);
  border: 3px solid white;
}

.name-container {
  width: 100%;
}

.board-container {
  margin-left: 25%;
  margin-bottom: 20px;
  border: 3px solid #ccc;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center-align content horizontally */
  gap: 20px;
  width: 65%; /* Adjust width as needed */
  height: 400px; /* Set a fixed height for the container */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

.headline-line,
.user-line {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}
.headline-line h3 {
  color: #ffd700; /* Different color for header */
  font-weight: bold;
}

.user-line h3 {
  color: #ffffff;
}

h2 {
  color: #ffd700;
  margin: 0;
  height: fit-content;
  position: absolute;
  top: 20%;
  left: 45%;
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  width: auto;
}
h3 {
  color: #ffffff;
  margin: 0;
  height: fit-content;
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}
</style>
