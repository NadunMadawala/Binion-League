<template>
  <div class="avatar-selection-screen">
    <div class="header">
      <img src="../assets/Corrected logo without bg.png" alt="logoWithNoBG" class="headerLogo">
      <img src="../assets/Logo_name_correct-removebg-preview.png" alt="logoWithNoBG" class="headerName">
      <div class="userName">
        <div class="avatar-logo">
          <img v-if="avatarImage" :src="avatarImage" alt="User Avatar" class="user-avatar" />
        </div>
        <h3>{{name}}</h3>
      </div>
    </div>
   
    <h2>Choose an Avatar</h2>
    <div class="avatars">
      <div v-for="avatar in avatars" :key="avatar.id" class="avatar" @click="selectAvatar(avatar)">
        <div class="avatar-container">
          <img :src="avatar.image"  />
        </div>
        <p>{{ avatar.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


import BobImage from '../assets/AvatarImages/Bob.png';
import DaveImage from '../assets/AvatarImages/Dave.png';
import JerryImage from '../assets/AvatarImages/Jerry.png';
import KevinImage from '../assets/AvatarImages/Kevin.png';
import PhillImage from '../assets/AvatarImages/Phill.png';
import StuartImage from '../assets/AvatarImages/Stuart.png';
import TomImage from '../assets/AvatarImages/Tom.png';
import CarlImage from '../assets/AvatarImages/Carl.png';

export default {
  data() {
    return {
      avatars: [
        { id: 1, name: 'Bob', image: BobImage },
        { id: 2, name: 'Carl', image: CarlImage },
        { id: 3, name: 'Dave', image: DaveImage },
        { id: 4, name: 'Jerry', image: JerryImage  },
        { id: 5, name: 'Kevin', image: KevinImage },
        { id: 6, name: 'Phill', image: PhillImage },
        { id: 7, name: 'Stuart', image: StuartImage },
        { id: 8, name: 'Tom', image: TomImage },
      ],
      selectedAvatar: null,
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
    };
  },
  computed: {
    avatarImage() {
      const avatar = this.avatars.find(a => a.name === localStorage.getItem('avatar'));
      return avatar ? avatar.image : null;
    },
  },
  methods: {
    async selectAvatar(avatar) {
      this.selectedAvatar = avatar;

      try {
        // Get user id from Vuex store
        const userId = this.$store.state.user.id;

        const response = await axios.post('http://localhost:5000/api/users/update-avatar', {
          userId,
          avatar: avatar.name,
        });

        console.log('Avatar updated successfully:', response.data);
        this.$store.commit('setUserAvatar', avatar.name);

        this.$router.push('/home');
      } catch (error) {
        console.error('Error updating avatar:', error);
        alert('Failed to update avatar. Please try again.');
      }
    },
  },


};
</script>

<style scoped>
.avatar-selection-screen {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: url('../assets/background dark.png') no-repeat center center fixed;  
  background-size: cover;
  overflow: hidden;
  color: #FFD700;
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
  /* .avatar-logo{
    height: 40px;
    width: 40px;
    background: white;
    border-radius: 50%;
  } */

.user-avatar{
  height: 60px;
  width: 60px;
  background: white;
  border-radius: 50%;
  object-fit: scale-down;
}

h2 {
  color: #FFD700;
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

h3{
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
  border: 2px solid #FFD700; 
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
