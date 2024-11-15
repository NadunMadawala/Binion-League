<template>
    <div class="banana-game-screen">
      <!-- Header Section -->
      <div class="header">
        <img src="../assets/Corrected logo without bg.png" alt="logoWithNoBG" class="headerLogo" />
        <img src="../assets/Logo_name_correct-removebg-preview.png" alt="logoWithNoBG" class="headerName" />
        <div class="userName">
          <div class="avatar-logo">
            <img v-if="avatarImage" :src="avatarImage" alt="User Avatar" class="user-avatar" />
          </div>
          <h3>{{ username }}</h3>
        </div>
      </div>
  
      <!-- Game Content Section -->
      <div class="game-content">
        <h3>Welcome to the Banana Life Boost Screen!</h3>
        <p>Need more lives to continue your journey?</p>
        <button @click="fetchPuzzle" class="banana-btn">Get More Lives 🍌</button>
        <div v-if="loading" class="loading">Fetching puzzle...</div>
        <div v-if="puzzleImage" class="puzzle-section">
          <img :src="puzzleImage" alt="Banana Puzzle" class="puzzle-image" />
          <div class="answer-section">
            <input v-model="userAnswer" type="text" placeholder="Enter your answer here" />
            <button @click="checkAnswer" class="submit-btn">Submit Answer</button>
          </div>
        </div>
        <div v-if="resultMessage" class="result-message">
          {{ resultMessage }}
          <div v-if="showPopup" class="popup-overlay">
            <div class="popup-content">
              <h3>Time is Over!</h3>
              <p>You can either quit or try to get more lives!</p>
              <button @click="quitGame" class="popup-btn">Quit</button>
              <button @click="fetchPuzzle" class="popup-btn">Get More Lives 🍌</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  
  export default {
    name: 'BananaGameScreen',
    setup() {
      const username = ref(localStorage.getItem('username'));
      const avatarImage = ref(localStorage.getItem('avatarImage'));
      const loading = ref(false);
      const puzzleImage = ref(null);
      const correctAnswer = ref(null);
      const userAnswer = ref('');
      const resultMessage = ref('');
      const showPopup = ref(false);
  
      // Method to call Banana API to get a puzzle
      const fetchPuzzle = async () => {
        loading.value = true;
        resultMessage.value = "";
        puzzleImage.value = null;
  
        try {
          const response = await axios.get('https://marcconrad.com/uob/banana/api.php');
          if (response.data) {
            puzzleImage.value = response.data.question;
            correctAnswer.value = response.data.solution;
            console.log(response.data.solution,'value')
          } else {
            resultMessage.value = "Failed to load puzzle. Please try again.";
          }
        } catch (error) {
          resultMessage.value = "Error contacting Banana API. Please try again later.";
        } finally {
          loading.value = false;
        }
      };
  
      // Method to check the user's answer
      const checkAnswer = () => {
        console.log(Number(userAnswer.value),'user input')
        console.log(correctAnswer.value,'answer')

        if (Number(userAnswer.value) === correctAnswer.value) {
          resultMessage.value = "Correct! You've earned a banana life 🍌";
          increaseLives();
          //showPopup.value = false;
        } else {
          resultMessage.value = "Incorrect answer. Please try again.";
          //showPopup.value = true;
        }
      };
  
      // Method to increase user's life count
      const increaseLives = () => {
        let currentLives = parseInt(localStorage.getItem('lives')) || 0;
        currentLives++;
        localStorage.setItem('lives', currentLives);
      };
  
      // Method to quit the game
      const quitGame = () => {
        // Logic to quit the game (e.g., redirect to home screen)
        window.location.href = '/home';
      };
  
      return {
        username,
        avatarImage,
        fetchPuzzle,
        loading,
        puzzleImage,
        userAnswer,
        resultMessage,
        checkAnswer,
        showPopup,
        quitGame,
      };
    },
  };
  </script>
  
  <style scoped>
  .banana-game-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: url('../assets/background dark.png') no-repeat center center fixed;
    background-size: cover;
    overflow: hidden;
    color: #FFD700;
  }
  
  /* Header Styles */
  .header {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .header .headerLogo {
    width: 200px;
    height: 200px;
  }
  
  .header .headerName {
    width: 500px;
    height: 100px;
  }
  
  .userName {
    color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  
  .avatar-logo {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .avatar-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Game Content Section */
  .game-content {
    text-align: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
  
  .banana-btn {
    margin-top: 20px;
    padding: 15px 30px;
    font-size: 1.2em;
    background: #FFD700;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .banana-btn:hover {
    background-color: #e6b800;
  }
  
  .puzzle-image {
    margin-top: 20px;
    width: 300px;
    height: auto;
    border: 2px solid #FFD700;
    border-radius: 10px;
  }
  
  .answer-section {
    margin-top: 20px;
  }
  
  .submit-btn {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 1em;
    background: #FFD700;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .loading {
    margin-top: 20px;
    color: #ffffff;
    font-style: italic;
  }
  
  .result-message {
    margin-top: 20px;
    font-size: 1.1em;
    color: #FFD700;
  }
  
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .popup-content {
    background: #ffffff;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
  }
  
  .popup-btn {
    margin: 10px;
    padding: 10px 20px;
    font-size: 1em;
    background: #FFD700;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .popup-btn:hover {
    background-color: #e6b800;
  }
  </style>
  