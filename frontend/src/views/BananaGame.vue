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
    <div class="content-container">
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
        <div v-if="resultMessage" class="result-message">{{ resultMessage }}</div>
      </div>
      <div class="score-board">
        <div class="time">Time: {{ timer }}s</div>
        <div class="life-count">🍌 Lives Collected: {{ lives }}</div>
        <button @click="quitGame" class="modal-btn quit">Quit</button>
      </div>
    </div>

    <!-- Modal for time out notification -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Time is Over!</h3>
        <p>You can either quit or try to get more lives!</p>
        <div class="modal-buttons"></div>
        <button @click="quitGame" class="modal-btn quit">Quit</button>
        <button @click="continueGame" class="modal-btn get-more-lifes">Continue</button>
      </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
    const showModal = ref(false);
    const timer = ref(15);
    const lives = ref(parseInt(localStorage.getItem('lives')) || 0);
    let timerInterval = null;

    const router = useRouter();
    const toast = useToast();

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
          console.log(response.data.solution, 'value');
          startTimer(); // Start the countdown timer when the puzzle is fetched
        } else {
          resultMessage.value = "Failed to load puzzle. Please try again.";
        }
      } catch (error) {
        resultMessage.value = "Error contacting Banana API. Please try again later.";
      } finally {
        loading.value = false;
      }
    };

    // Timer function
    const startTimer = () => {
      clearInterval(timerInterval); // Clear previous timer if any
      timer.value = 15; // Reset timer to 30 seconds

      timerInterval = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          clearInterval(timerInterval);
          showModal.value = true; 
        }
      }, 1000);
    };

    // Method to check the user's answer
    const checkAnswer = () => {
      console.log(Number(userAnswer.value), 'user input');
      console.log(correctAnswer.value, 'answer');

      if (Number(userAnswer.value) === correctAnswer.value) {
        resultMessage.value = "Correct! You've earned a banana life 🍌";
        increaseLives();
        fetchPuzzle(); // Fetch a new puzzle without restarting the timer
      } else {
        resultMessage.value = "Incorrect answer. Please try again.";
      }
    };

    // Method to increase user's life count
    const increaseLives = () => {
      lives.value++;
      localStorage.setItem('lives', lives.value);
      toast.success("You've earned a banana life! 🍌", {
        timeout: 2000,
        closeOnClick: true,
      });
    };

    // Method to quit the game
    const quitGame = () => {
      // Clear timer interval
      clearInterval(timerInterval);
      // Navigate to home page
      router.push('/home');
    };

    // Method to continue the game
    const continueGame = () => {
      showModal.value = false;
      router.push('/game');
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
      showModal,
      quitGame,
      continueGame,
      timer,
      lives,
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

.content-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 50px;
}

.score-board {
  border: 5px solid #ccc;
  padding: 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
}

.time {
  color: #FFD700;
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
  font-weight: bolder;
}

.life-count {
  color: #FFD700;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}

/* Game Content Section */
.game-content {
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}

.banana-btn {
  margin-top: 10px;
  padding: 15px 20px;
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
  padding: 10px 10px;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  border-radius: 10px;
  width: 400px;
  text-align: center;
  height: fit-content;
  border: 1px solid#E8B931;
  padding: 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}

.modal h2 {
  margin: 0 0 20px 0;
  color: #ffffff;
}

.modal p {
  margin-bottom: 20px;
  color: #ffffff;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
}

.modal-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 20px;
}
.modal-btn:hover {
  background-color: #e6b800;
  color: #fff;
  transform: scale(1.1)
}

.modal-btn.quit {
  background: crimson;
  color: #fff;
}
.modal-btn.quit:hover {
  background: crimson;
  color: #fff;
  border: 2px solid #fff;
  transform: scale(1.1)
}
</style>
