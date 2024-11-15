<template>
    <div class="home">
      <div class="header">
        <img src="../assets/Corrected logo without bg.png"  alt="logoWithNoBG" class="headerLogo">
        <img src="../assets/Logo_name_correct-removebg-preview.png" alt="logoWithNoBG" class="headerName">
        <div class="userName">
          {{ avatar }}
          <h3>{{username}}</h3>
        </div>
      </div>
     
      <h2>Choose a Game mode</h2>
      <div class="content-container">
        <div class="nav-panel">
          <div class="nav-container">
            <a href="/home" class="navbtn">Home</a>
            <a class="navbtn">Tutorial & Story</a>
            <a class="navbtn">Leaderboard</a>
            <a class="navbtn">Account</a>
            <button class="logoutbtn">Logout</button>
          </div>
        </div>
          <div class="mode-container">
            <div class="easyContainer">
                <h3>Easy</h3>
                <img src="../assets/ModeImages/EasyMode.png">
                <li>Time : 60s</li>
                <li>🍌 Lives: 3</li>
                <button class="playbtn">Play</button>
            </div>
            <div class="mediumContainer">
              <h3>Medium</h3>
                <img src="../assets/ModeImages/MeduimMode.png">
                <li>Time : 30s</li>
                <li>🍌 Lives: 3</li>
                <button class="playbtn" @click="goToMediumGame">Play</button>
            </div>
            <div class="hardContainer">
              <h3>Hard</h3>
                <img src="../assets/ModeImages/hardMode.png">
                <li>Time : 20s</li>
                <li>🍌 Lives: 3</li>
                <button class="playbtn">Play</button>
            </div>
          </div>
      </div>



    </div>
  </template>
  
  <script>
  
  
  export default {
    data(){
    
    return{
      username: localStorage.getItem('username'),
      avatar: localStorage.getItem('avatar'),
    }
  },
  methods: {
    goToMediumGame() {
      this.$router.push('/game');
    },
  },
}
  

  </script>
  
  <style scoped>
  html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
  .home {
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
    .avatar-logo{
      height: 40px;
      width: 40px;
      background: white;
      border-radius: 50%;
    }
  .content-container{
    display: flex;
    justify-content: space-between;
  }
  .nav-panel a{
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
}

.nav-container {
  display: flex;
  flex-direction: column;
  background-color: #E8B931;
  border-radius: 20px;
  padding: 10px;

}

.navbtn {
  background-color: #FBF4A9;
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
  color: #FFD700;
  transform: scale(1.1);
  border: 3px solid #FFD700;
}

.logoutbtn {
  color: crimson;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  font-weight: bolder;
  border: 3px solid red;
  align-content: center;
}

.logoutbtn:hover {
  background-color: crimson;
  color: #FFD700;
  transform: scale(1.1);
  border: 3px solid white;
}

.mode-container{
 
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
.playbtn{
  color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  font-weight: bolder;
  border: 3px solid #F7C32D;
  align-content: center;
  background-color: #F7C32D;
  width: 100px;
  cursor: pointer;
  margin-top: 10px;
  font-size: large;
}
.playbtn:hover{
  background-color: white;
  color: #FFD700;
  transform: scale(1.1);
  border: 3px solid FFD700;
  transform: scale(1.1);
  
}
h3{
  margin: 0;
  color: black;
  font-weight: bolder;
}
li{
  list-style: none;
  color: black;
  font-weight: 500;
  font-style: italic;
  
}
.easyContainer,.mediumContainer,.hardContainer{
  height: 250px;
  width: 240px;
  background-color: #FFFFFF;
  border-radius: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.easyContainer img,.mediumContainer img,.hardContainer img{
  height: 120px;
  width: 91px;
  
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
  

  
  p {
    margin-top: 10px;
    font-weight: bold;
  }
  </style>
  