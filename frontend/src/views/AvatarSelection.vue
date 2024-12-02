<template>
  <div class="avatar-selection-screen">
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

    <h2>Choose an Avatar</h2>
    <div class="avatars">
      <div
        v-for="avatar in avatars"
        :key="avatar.id"
        class="avatar"
        @click="selectAvatar(avatar)"
      >
        <div class="avatar-container">
          <img :src="avatar.image" />
        </div>
        <p>{{ avatar.name }}</p>
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
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      avatars: [
        { id: 1, name: "Bob", image: BobImage },
        { id: 2, name: "Carl", image: CarlImage },
        { id: 3, name: "Dave", image: DaveImage },
        { id: 4, name: "Jerry", image: JerryImage },
        { id: 5, name: "Kevin", image: KevinImage },
        { id: 6, name: "Phill", image: PhillImage },
        { id: 7, name: "Stuart", image: StuartImage },
        { id: 8, name: "Tom", image: TomImage },
      ],
      selectedAvatar: null,
    };
  },
  computed: {
    // Get the user's name from Vuex store
    ...mapGetters(["user"]),
    username() {
      return this.user?.name || "Guest";
    },
    // Get the avatar image from Vuex store or fallback to localStorage
    avatar() {
      return this.user?.avatar || localStorage.getItem("avatar");
    },
  },
  methods: {
    async selectAvatar(avatar) {
      this.selectedAvatar = avatar;

      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No authentication token found. Please login again.");
        }

        // Update avatar in the backend
        const apiUrl = import.meta.env.VITE_APP_API_URL;
        const response = await axios.post(
          `${apiUrl}/api/users/update-avatar`,
          {
            avatar: avatar.name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Update localStorage with the selected avatar
          localStorage.setItem("avatar", avatar.name);

          // Update Vuex store to indicate avatar has been selected
          this.$store.commit("setUserAvatar", avatar.name);
          this.$store.commit("setUserHasSelectedAvatar", true);

          // Redirect to home page after successfully updating the avatar
          this.$router.push("/home");
        }
      } catch (error) {
        console.error("Error updating avatar:", error);
        alert("Failed to update avatar. Please try again.");
      }
    },
    getAvatarImage(avatarName) {
      const avatar = this.avatars.find((a) => a.name === avatarName);
      return avatar ? avatar.image : null;
    },
  },
};
</script>

<style scoped>
.avatar-selection-screen {
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
  object-fit: scale-down;
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

.avatars {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 60%;
  margin-left: 20%;
}

.avatar {
  margin: 10px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  object-fit: scale-down;
}

.avatar:hover {
  transform: scale(1.1);
}

.avatar-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffd700;
  background-color: #ffffff;
}

.avatar-container img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

p {
  margin-top: 10px;
  font-weight: bold;
}
</style>
