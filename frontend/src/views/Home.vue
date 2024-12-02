<template>
  <div class="home">
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

    <h2>Choose a Game mode</h2>
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
      <div class="mode-container">
        <div class="easyContainer">
          <h3>Easy</h3>
          <img src="../assets/ModeImages/EasyMode.png" />
          <li>Time : 90s</li>
          <li>🍌 Lives: 15</li>
          <button class="playbtn" @click="goToEasyGame">Play</button>
        </div>
        <div class="mediumContainer">
          <h3>Medium</h3>
          <img src="../assets/ModeImages/MeduimMode.png" />
          <li>Time : 60s</li>
          <li>🍌 Lives: 10</li>
          <button class="playbtn" @click="goToMediumGame">Play</button>
        </div>
        <div class="hardContainer">
          <h3>Hard</h3>
          <img src="../assets/ModeImages/hardMode.png" />
          <li>Time : 30s</li>
          <li>🍌 Lives: 10</li>
          <button class="playbtn" @click="goToHardGame">Play</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      username: localStorage.getItem("username"),
      avatar: localStorage.getItem("avatar"),
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
    };
  },
  methods: {
    goToMediumGame() {
      this.$router.push("/game");
    },
    goToEasyGame() {
      this.$router.push("/easygame");
    },
    goToHardGame() {
      this.$router.push("/hardgame");
    },
    logout() {
      // Clear the local storage to log out the user
      localStorage.clear();

      // Redirect to the login page
      this.$router.push("/login");
    },
    getAvatarImage(avatarName) {
      return this.avatars[avatarName] || null;
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
.home {
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
}
.nav-panel a {
  text-decoration: none;
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
  text-decoration: none;
  height: fit-content;
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

.mode-container {
  margin-bottom: 20px;
  border: 3px solid #ccc;
  padding: 20px;
  padding-left: 50px;
  padding-right: 50px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 40%;
  margin-right: 20%;
  margin-top: 20px;
}
.playbtn {
  color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  font-weight: bolder;
  border: 3px solid #f7c32d;
  align-content: center;
  background-color: #f7c32d;
  width: 100px;
  cursor: pointer;
  margin-top: 10px;
  font-size: large;
}
.playbtn:hover {
  background-color: white;
  color: #ffd700;
  transform: scale(1.1);
  border: 3px solid FFD700;
  transform: scale(1.1);
}
h3 {
  color: #ffffff;
  margin: 0;
  margin-top: 10px;
  height: fit-content;
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}
li {
  list-style: none;
  color: black;
  font-weight: 500;
  font-style: italic;
}
.easyContainer,
.mediumContainer,
.hardContainer {
  height: 260px;
  width: 240px;
  background-color: #ffffff;
  border-radius: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.easyContainer img,
.mediumContainer img,
.hardContainer img {
  height: 120px;
  width: 91px;
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
}

p {
  margin-top: 10px;
  font-weight: bold;
}
</style>
