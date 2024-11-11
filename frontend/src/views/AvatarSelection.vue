<template>
  <div class="avatar-selection-screen">
    <div class="header">
      <img src="../assets/Corrected logo without bg.png" alt="logoWithNoBG" class="headerLogo">
      <img src="../assets/Logo_name_correct-removebg-preview.png" alt="logoWithNoBG" class="headerName">
      <div class="userName">
        <h2>$userName</h2>
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
export default {
  data() {
    return {
      avatars: [
        { id: 1, name: 'Bob', image: '../assets/AvatarImages/MinionsAvatar7.jpeg' },
        { id: 2, name: 'Carl', image: '../assets/AvatarImages/Cael.png' },
        { id: 3, name: 'Dave', image: '../assets/AvatarImages/Dave.png' },
        { id: 4, name: 'Jerry', image: '../assets/AvatarImages/Jerry.png' },
        { id: 5, name: 'Kevin', image: '../assets/AvatarImages/Kevin.png' },
        { id: 6, name: 'Phill', image: '../assets/AvatarImages/Phill.png' },
        { id: 7, name: 'Stuart', image: '../assets/AvatarImages/Stuart.png' },
        { id: 8, name: 'Tom', image: '../assets/AvatarImages/Tom.png' },
      ],
      selectedAvatar: null,
    };
  },
  methods: {
    selectAvatar(avatar) {
      this.selectedAvatar = avatar;
      // Logic to save selected avatar, for example by saving in Vuex store or making an API call
      this.$router.push('/game');
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
}

h2 {
  font-size: 2em;
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 20px;
  text-shadow: 1px 1px 4px #000; 
}

.avatars {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.avatar {
  margin: 10px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;

}

.avatar:hover {
  transform: scale(1.1);
}

.avatar-container {
  width: 100px; 
  height: 100px; 
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #FFD700; 
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
