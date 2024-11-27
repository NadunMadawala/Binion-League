<template>
    <div class="tutorial">
      <div class="header">
        <img src="../assets/Corrected logo without bg.png" alt="logoWithNoBG" class="headerLogo">
        <img src="../assets/Logo_name_correct-removebg-preview.png" alt="logoWithNoBG" class="headerName">
        <div class="userName">
          <div class="avatar-logo">
            <img v-if="avatarImage" :src="avatarImage" alt="User Avatar" class="user-avatar" />
          </div>
          <h3>{{ name }}</h3>
        </div>
      </div>
      <h2>My Tutorial & Story</h2>
      <div class="content-container">
        <div class="nav-panel">
          <div class="nav-container">
            <a href="/home" class="navbtn">Home</a>
            <a href="/home"  class="navbtn">Tutorial & Story</a>
            <a href="/leaderboard" class="navbtn">Leaderboard</a>
            <a href="/account" class="navbtn">Account</a>
            <button class="logoutbtn" @click="logout">Logout</button>
          </div>
        </div>
        <div class="board-container">
            <h3>Tutorial</h3>
            <video width="800" height="500" controls>
            <source src="../assets/mov_bbb.mp4" type="video/mp4">
            </video>
            <div class="story">
                <h3>Story</h3>
                <p>
                    Once upon a time, in a magical world called Binionia, there was a grand competition known as the Binion League. It was a land where adventure, wits, and courage combined to forge heroes, and only the most dedicated players could rise to the challenge.<br><br>

                    The Binion League was a game of strategy, bravery, and quick thinking. It began when a mysterious voice summoned players from all over Binionia to compete in a series of trials. The goal was to collect bananas that held powerful magic—a source of life and strength in Binionia. Each player started with three magical bananas, representing their life count, and entered the vast playing field of puzzles and adventures.<br><br>

                    The first challenge in the League was to solve puzzles and mysteries to earn more bananas. Players had to think quickly, as time was always ticking. Each puzzle was a test of intelligence, and solving it would grant the player a precious banana, increasing their life count. But beware—every mistake would mean losing a banana, and if a player lost all their bananas, they were in danger of being eliminated from the league.<br><br>

                    The journey through Binionia wasn't only about puzzles. It was also about forming connections, strategizing, and collecting special items hidden throughout the land. These items helped players overcome obstacles and even gain an edge over others. Players could challenge each other in the Arena of Wits, a place where they could test their mental strength against others to earn rewards or even regain lost bananas.<br><br>

                    In addition, there were special arenas called "Banana Havens" scattered around Binionia, where players could compete in mini-games to earn additional bananas. But these havens were no easy place—only those who had mastered their abilities could win the coveted bananas there.<br><br>

                    To move forward, players also needed to create full costume sets, which could help them in different challenges. They had to use what they found in their wardrobe collection to create the perfect outfits for particular missions—whether it was a stealth mission, a survival test, or a speed challenge.<br><br>

                    The ultimate goal of the Binion League was to reach the grand Golden Banana, hidden in the depths of the Enchanted Jungle. To get there, players needed teamwork, skills, and all the bananas they could gather. The one who claimed the Golden Banana would be crowned as the Champion of Binionia, securing their place as the mightiest player in the league.<br><br>

                    And so, every player embarked on their journey with hope, wits, and courage—competing, learning, and growing—to become the next legend of the Binion League.<br><br>
</p>
            </div>
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
        username: localStorage.getItem('username'),
        avatar: localStorage.getItem('avatar'),
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
        }
      };
    },
    methods: {
      async fetchUserData() {
        try {
          const apiUrl = import.meta.env.VITE_APP_API_URL; // Replace with your API URL
          const response = await axios.get(`${apiUrl}/api/users`);
          this.users = response.data; // Assuming the response contains an array of users with avatars, scores, and life counts
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      },
      getAvatarImage(avatarName) {
        return this.avatars[avatarName] || null;
      },
      logout() {
        // Clear local storage and redirect to login page
        localStorage.clear();
        this.$router.push('/login');
      }
    },
    computed: {
      avatarImage() {
        return this.avatars[this.avatar] || null;
      }
    },
    created() {
      this.fetchUserData(); // Fetch user data when the component is created
    },
  };
  </script>
  
  <style scoped>
  /* Add your CSS here */
  .tutorial {
    display: flex;
    flex-direction: column;
    height:240vh;
    background: url('../assets/background dark.png') no-repeat center center fixed;
    background-size:cover;
    overflow:hidden;
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
  
  a{
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
    cursor: pointer;
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
    cursor: pointer;
  }
  
  .logoutbtn:hover {
    background-color: crimson;
    color: #FFD700;
    transform: scale(1.1);
    border: 3px solid white;
  }
  
  .board-container {
    margin-left: 30%;
    margin-bottom: 20px;
    border: 3px solid #ccc;
    padding: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 60%;
    height: auto;
    margin-right: 10%;
    margin-top: 20px;
    position:absolute;
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
  p{
    color: #ffffff;
    background: rgba(0, 0, 0, 0.6);
    text-align: justify;
    font-size: medium;
    padding: 20px;font-style: italic;
  }
  </style>
  