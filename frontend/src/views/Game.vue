<template>
  <div class="game">
        <!-- Modal for Start Game notification -->
        <div v-if="showStartModal" class="modal-overlay">
      <div class="modal">
        <h2>Start Game</h2>
        <p>To start the game, click the "Start" button below.
          
          <li>Choose Correct pairs to Score in given time. </li>
          <li>Every missmatch will cost a 🍌 life.</li>
        
        </p>
        <button class="modal-btn start-game" @click="startGame">Start</button>
      </div>
    </div>
    <div class="header">
      <img src="../assets/Corrected logo without bg.png" alt="logoWithNoBG" class="headerLogo" />
      <img src="../assets/Logo_name_correct-removebg-preview.png" alt="logoWithNoBG" class="headerName" />
      <div class="userName">
        <div class="avatar">
          <img v-if="avatarImage" :src="avatarImage" alt="User Avatar" class="user-avatar" />
        </div>
        <h2 style="color: burlywood;">{{ username }}</h2>
      </div>
    </div>
    <h3>Choose correct pairs..!</h3>
    <div class="game-container">
      <div class="nav-panel">
        <div class="nav-container">
          <a href="./home" class="navbtn">Home</a>
          <a class="navbtn">Tutorial & Story</a>
          <a class="navbtn">Leaderboard</a>
          <a class="navbtn">Account</a>
          <button class="logoutbtn">Logout</button>
        </div>
      </div>
      <section class="game-board">
        <Card 
          v-for="(card, index) in cardList"
          :key="`card-${index}`"
          :matched="card.matched"
          :value="card.value"
          :visible="card.visible"
          :position="card.position"
          @select-card="flipCard" />
      </section>
      <div class="scoreboard-container">
        <div class="game-detail">
          <h2>Score: {{ score }}</h2>
          <div class="level">Mode:</div>
          <div class="level">Level:</div>
        </div>
        <div class="score-board">
          <div class="time">Time : {{ timer }}s</div>
          <div class="life-count"> 🍌 Lives:</div>
          <h4>{{ status }}</h4>
          <button @click="restartGame" class="navbtn" :disabled="!gameStarted">{{ buttonLabel }}</button>
        </div>
      </div>
    </div>

    <!-- Modal for time out notification -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Time is over!</h2>
        <p>You have run out of time. Would you like to continue?</p>
        <div class="modal-buttons">
          <button class="modal-btn quit" @click="quitGame">Quit</button>
          <button class="modal-btn get-more-lifes" @click="getMoreLifes">Get More 🍌 Lifes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { computed, ref, watch } from 'vue';
import Card from '../components/Card.vue';

export default {
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const cardList = ref([]);
    const userSelection = ref([]);
    const username = ref(localStorage.getItem('username'));
    const avatarImage = ref(localStorage.getItem('avatarImage'));
    const buttonLabel = ref("Start");
    const timer = ref(30);
    const showModal = ref(false);
    let timerInterval = null;
    const showStartModal = ref(true);
    const gameStarted = ref(false);
    const score = ref(0);

    // Game status
    const status = computed(() => {
      if (remainingPairs.value === 0) {
        clearInterval(timerInterval);
        return 'Player Wins..!';
      } else {
        return `Remaining Pairs: ${remainingPairs.value}`;
      }
    });

    // Count remaining pairs
    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter((card) => card.matched === false).length;
      return remainingCards / 2;
    });

    // Shuffle and restart the game
    const shuffleCards = () => {
      cardList.value = _.shuffle(cardList.value);
    };

    const restartGame = () => {
      buttonLabel.value = "Restart Game";
      shuffleCards();

      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          position: index,
          visible: false,
        };
      });

      startTimer(); // Start the countdown timer when game starts
      score.value = 0; // Reset score
    };

    // Timer function
    const startTimer = () => {
      clearInterval(timerInterval); // Clear previous timer if any
      timer.value = 30; // Reset timer to 30 seconds

      timerInterval = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          clearInterval(timerInterval);
          showModal.value = true; // Show the modal when time is over
        }
      }, 1000);
    };

        // Start the game
        const startGame = () => {
      showStartModal.value = false;
      gameStarted.value = true;
      restartGame();
    };

    // Quit the game
    const quitGame = () => {
      showModal.value = false;
      // Logic to quit the game, for example redirecting to the home page
      alert("You have quit the game.");
    };

    // Get more lifes
    const getMoreLifes = () => {
      showModal.value = false;
      timer.value = 30; // Reset timer to 30 seconds
      startTimer(); // Restart timer
    };

    // Initialize cards
    const cardItem = [1, 2, 3, 4, 5, 6, 7, 8];
    cardItem.forEach((item) => {
      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
      });
      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
      });
    });

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index,
      };
    });

    // Card flipping logic
    const flipCard = (payload) => {
      if (!gameStarted.value) return; // Prevent flipping cards if the game hasn't started
      cardList.value[payload.position].visible = true;

      if (userSelection.value[0]) {
        if (
          userSelection.value[0].position === 
          payload.position && 
          userSelection.value[0].faceValue === payload.faceValue
         )   {
          return
        } else {
          userSelection.value[1] = payload;
        }
      } else {
        userSelection.value[0] = payload;
      }
    };

    // Watch user selection for matching logic
    watch(
      userSelection,
      (currentValue) => {
        if (currentValue.length === 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
            score.value += 1; // Increment score for correct pair
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
            }, 1000);
          }

          userSelection.value.length = 0;
        }
      },
      { deep: true }
    );

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      shuffleCards,
      restartGame,
      buttonLabel,
      username,
      avatarImage,
      timer,
      showModal,
      quitGame,
      getMoreLifes,
      showStartModal,
      startGame,
      gameStarted,
      score,
    };
  },
};
</script>

<style scoped>
.game {
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
  height: 30%;
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

.avatar {
  height: 40px;
  width: 40px;
  background: white;
  border-radius: 50%;
}

.time{
  color: rgb(95, 11, 11);
  transform: scale(1.1);
  font-weight: bolder;
}
h3 {
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

.game-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
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

.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-column-gap: 30px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-row-gap: 30px;
  justify-content: center;
}

.card {
  border: 5px solid #ccc;
}

.scoreboard-container {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.game-detail {
  margin-bottom: 20px;
  border: 5px solid #ccc;
  padding: 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}

.score-board {
  border: 5px solid #ccc;
  padding: 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
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
}

.modal-btn.quit {
  background: crimson;
  color: #fff;
}

.modal-btn.get-more-lifes {
  
  background: #494848c4;
  color: #fff;
  border: 1px solid#E8B931;
}

.modal-btn:hover {
  opacity: 0.9;
  transform: scale(1.1);
}
</style>