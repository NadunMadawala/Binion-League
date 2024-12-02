<template>
  <div class="game">
    <!-- Modal for Start Game notification -->
    <div v-if="showStartModal" class="modal-overlay">
      <div class="modal">
        <h2>Start Game</h2>
        <p>
          To start the game, click the "Start" button below.
          <li>Choose Correct pairs to Score in given time.</li>
          <li>Every mismatch will cost a 🍌 life.</li>
        </p>
        <button class="modal-btn start-game" @click="startGame">Start</button>
      </div>
    </div>
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
    <h3>Choose correct pairs..!</h3>
    <div class="game-container">
      <div class="nav-panel">
        <div class="nav-container">
          <a href="/home" class="navbtn">Home</a>
          <a href="/tutorial" class="navbtn">Tutorial & Story</a>
          <a href="/leaderboard" class="navbtn">Leaderboard</a>
          <a href="/account" class="navbtn">Account</a>
          <button class="logoutbtn" @click="logout">Logout</button>
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
          @select-card="flipCard"
        />
      </section>
      <div class="scoreboard-container">
        <div class="game-detail">
          <h2>Score: {{ score }}</h2>
          <div class="level">Mode: Medium</div>
        </div>
        <div class="score-board">
          <div class="time">Time : {{ timer }}s</div>
          <div class="life-count">🍌 Lives: {{ lives }}</div>
          <h4>{{ status }}</h4>
          <button @click="restartGame" class="navbtn" :disabled="!gameStarted">
            {{ buttonLabel }}
          </button>
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
          <!-- <button class="modal-btn get-more-lifes" @click="getMoreLives">
            Get More 🍌 Lifes
          </button> -->
        </div>
      </div>
    </div>
    <!-- Modal for running out of lives notification -->
    <div v-if="showLivesModal" class="modal-overlay">
      <div class="modal">
        <h2>Out of Lives!</h2>
        <p>You have run out of lives. Would you like to continue?</p>
        <div class="modal-buttons">
          <button class="modal-btn quit" @click="quitGame">Quit</button>
          <button class="modal-btn get-more-lifes" @click="getMoreLives">
            Get More 🍌 Lives
          </button>
        </div>
      </div>
    </div>
    <!-- Modal for Player Win -->
    <div v-if="showWinModal" class="modal-overlay">
      <div class="modal">
        <h2>Congratulations! 🎉</h2>
        <p>You have won the game and earned 1 win.</p>
        <ConfettiExplosion v-if="showConfetti" />
        <div class="modal-buttons">
          <button class="modal-btn quit" @click="goToHome">Go to Home</button>
          <button class="modal-btn get-more-lifes" @click="goToLeaderboard">
            Go to Leaderboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { ref, computed, watch, onMounted, nextTick } from "vue";
import Card from "../components/Card.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";
import ConfettiExplosion from "vue-confetti-explosion";

import BobImage from "../assets/AvatarImages/Bob.png";
import CarlImage from "../assets/AvatarImages/Carl.png";
import DaveImage from "../assets/AvatarImages/Dave.png";
import JerryImage from "../assets/AvatarImages/Jerry.png";
import KevinImage from "../assets/AvatarImages/Kevin.png";
import PhillImage from "../assets/AvatarImages/Phill.png";
import StuartImage from "../assets/AvatarImages/Stuart.png";
import TomImage from "../assets/AvatarImages/Tom.png";

export default {
  name: "Game",
  components: {
    Card,
    ConfettiExplosion,
  },
  setup() {
    const router = useRouter();
    const toast = useToast();

    // Define avatars
    const avatars = {
      Bob: BobImage,
      Carl: CarlImage,
      Dave: DaveImage,
      Jerry: JerryImage,
      Kevin: KevinImage,
      Phill: PhillImage,
      Stuart: StuartImage,
      Tom: TomImage,
    };

    // User data
    const username = ref(localStorage.getItem("username") || "");
    const avatar = ref(localStorage.getItem("avatar") || "");

    // Computed property for avatar image
    const avatarImage = computed(() => {
      return avatars[avatar.value] || null;
    });

    const cardList = ref([]);
    const userSelection = ref([]);
    const score = ref(0);
    const timer = ref(60);
    const showModal = ref(false);
    let timerInterval = null;
    const showStartModal = ref(true);
    const gameStarted = ref(false);
    const lives = ref(parseInt(localStorage.getItem("lives")) || 10);
    const showLivesModal = ref(false);
    const showConfetti = ref(false);
    const showWinModal = ref(false);
    const buttonLabel = ref("Start");

    // Increment win count in the backend and update locally
    const incrementWinCount = async () => {
      try {
        const winCount = parseInt(localStorage.getItem("winCount")) || 0;
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const response = await axios.post(
          "http://localhost:5000/api/users/increment-win",
          { userId: localStorage.getItem("userId"), winCount: winCount + 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token to authorize request
            },
          }
        );

        if (response.status === 200) {
          localStorage.setItem("winCount", winCount + 1);
          toast.success("Win count updated successfully!", {
            timeout: 2000,
            closeOnClick: true,
          });
        } else {
          toast.warning("Could not update win count. Please try again.", {
            timeout: 2000,
            closeOnClick: true,
          });
        }
      } catch (error) {
        console.error("Error updating win count:", error);
        toast.error("An error occurred while updating win count.", {
          timeout: 2000,
          closeOnClick: true,
        });
      }
    };

    // Trigger confetti explosion
    const explodeConfetti = async () => {
      showConfetti.value = false;
      await nextTick();
      showConfetti.value = true;
    };

    // Navigate to leaderboard
    const goToLeaderboard = () => {
      router.push("/leaderboard");
    };

    // Navigate to home
    const goToHome = () => {
      router.push("/home");
    };

    // Game status with win logic
    const status = computed(() => {
      if (remainingPairs.value === 0) {
        clearInterval(timerInterval);
        incrementWinCount();
        explodeConfetti();
        showWinModal.value = true;
        setTimeout(() => {
          resetGame();
        }, 3000);

        return "Player Wins!";
      } else {
        return `Remaining Pairs: ${remainingPairs.value}`;
      }
    });

    // Check life count on component load
    onMounted(() => {
      lives.value = parseInt(localStorage.getItem("lives")) || 10;
      if (lives.value === 0) {
        showLivesModal.value = true;
        toast.info("No more lives. You need to get more lives to continue.", {
          timeout: 2000,
          closeOnClick: true,
        });
      } else {
        loadGameState();
      }
    });

    const logout = () => {
      localStorage.clear();
      toast.info("You have successfully logged out", {
        timeout: 2000,
        closeOnClick: true,
      });
      router.push("/login");
    };

    // Count remaining pairs
    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(
        (card) => card.matched === false
      ).length;
      return remainingCards / 2;
    });

    // Shuffle and restart the game
    const shuffleCards = () => {
      cardList.value = _.shuffle(cardList.value);
    };

    const restartGame = () => {
      if (lives.value <= 0) {
        showLivesModal.value = true;
        toast.info(
          "No lives left. Redirecting to Banana Game to collect more.",
          {
            timeout: 2000,
            closeOnClick: true,
          }
        );
        return;
      }
      // Reset the lives to the initial value for a new game
      lives.value = 10;
      localStorage.setItem("lives", lives.value);

      buttonLabel.value = "Restart Game";
      shuffleCards();
      cardList.value = cardList.value.map((card, index) => ({
        ...card,
        matched: false,
        position: index,
        visible: false,
      }));
      startTimer();
      score.value = 0;
      gameStarted.value = true; // Mark game as started
    };

    // Timer function
    const startTimer = (initialTime = 60) => {
      clearInterval(timerInterval);
      timer.value = initialTime;

      timerInterval = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          clearInterval(timerInterval);
          showModal.value = true;
        }
      }, 1000);
    };

    // Start the game
    const startGame = () => {
      if (lives.value <= 0) {
        showLivesModal.value = true;
        toast.info(
          "You need lives to start the game. Redirecting to Banana Game.",
          {
            timeout: 2000,
            closeOnClick: true,
          }
        );
        return;
      }
      showStartModal.value = false;
      gameStarted.value = true;
      restartGame();
    };

    // Quit the game and clear state
    const quitGame = () => {
      clearInterval(timerInterval);
      clearGameState();
      toast.info("You have quit the game", {
        timeout: 2000,
        closeOnClick: true,
      });
      router.push("/home");
    };

    // Clear game state from localStorage
    const clearGameState = () => {
      localStorage.removeItem("cardList");
      localStorage.removeItem("timer");
      localStorage.removeItem("score");
      localStorage.removeItem("gameStarted");
      localStorage.removeItem("showStartModal");
    };

    // Save game state to localStorage
    const saveGameState = () => {
      localStorage.setItem("cardList", JSON.stringify(cardList.value));
      localStorage.setItem("timer", timer.value);
      localStorage.setItem("score", score.value);
      localStorage.setItem("gameStarted", gameStarted.value);
      localStorage.setItem("showStartModal", showStartModal.value);
    };

    // Load game state from localStorage
    const loadGameState = () => {
      const savedCardList = JSON.parse(localStorage.getItem("cardList"));
      if (savedCardList && localStorage.getItem("gameStarted") === "true") {
        cardList.value = savedCardList;
        timer.value = parseInt(localStorage.getItem("timer")) || 60;
        score.value = parseInt(localStorage.getItem("score")) || 0;
        gameStarted.value = localStorage.getItem("gameStarted") === "true";
        showStartModal.value =
          localStorage.getItem("showStartModal") === "true" ? true : false;

        // Resume the timer if the game is already started
        if (gameStarted.value) {
          startTimer(timer.value);
        }
      } else {
        showStartModal.value = true; // Show start modal if no game is in progress
      }
    };

    // Get more lives
    const getMoreLives = () => {
      lives.value = 0;
      localStorage.setItem("lives", lives.value);

      saveGameState();
      showModal.value = false;
      showLivesModal.value = false;
      toast.info("Collect the Lives", {
        timeout: 2000,
        closeOnClick: true,
      });
      router.push("/bananagame");
    };

    // Initialize cards
    const cardItem = [
      "Bob",
      "Carl",
      "Dave",
      "Jerry",
      "Kevin",
      "Phill",
      "Stuart",
      "Tom",
    ];
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

    cardList.value = cardList.value.map((card, index) => ({
      ...card,
      position: index,
    }));

    // Card flipping logic
    const flipCard = (payload) => {
      if (!gameStarted.value) return;
      cardList.value[payload.position].visible = true;

      if (userSelection.value[0]) {
        if (
          userSelection.value[0].position === payload.position &&
          userSelection.value[0].faceValue === payload.faceValue
        ) {
          return;
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
            score.value += 1;
            localStorage.setItem("score", score.value);
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
              lives.value--;
              localStorage.setItem("lives", lives.value);
              if (lives.value <= 0) {
                showLivesModal.value = true;
                clearInterval(timerInterval);
                toast.info("You need to get more lives to continue.", {
                  timeout: 2000,
                  closeOnClick: true,
                });
              }
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
      getMoreLives,
      showStartModal,
      startGame,
      gameStarted,
      score,
      lives,
      showLivesModal,
      logout,
      showConfetti,
      goToLeaderboard,
      goToHome,
      showWinModal,
    };
  },
};
</script>

<style scoped>
html body {
  margin-top: 0;
  padding: 0;
}
.game {
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
  height: 20%;
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
.avatar {
  height: 40px;
  width: 40px;
  background: white;
  border-radius: 50%;
}

.time {
  color: #ffd700;
  margin: 0;
  height: fit-content;
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
  font-weight: bolder;
}
h3 {
  color: #ffd700;
  margin: 0;
  height: fit-content;
  position: absolute;
  top: 15%;
  left: 45%;
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}
h2 {
  color: #ffffff;
  margin: 0;
  height: fit-content;
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}
h4 {
  color: #ffd700;
  margin: 0;
  height: fit-content;
  top: 20%;
  left: 45%;
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}
.life-count {
  color: #ffd700;
  margin-top: 10px;
  margin-bottom: 10px;
  height: fit-content;
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
  margin-top: 20px;
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

.game-board {
  display: grid;
  grid-template-columns: 70px 70px 70px 70px;
  grid-column-gap: 15px;
  grid-template-rows: 120px 120px 120px 120px;
  grid-row-gap: 15px;
  justify-content: center;
}

.card {
  border: none;
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
  gap: 20px;
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

<!-- References-:
CardFlip and matching logic-: https://youtu.be/WQa9-4K3me4 
vuetoastification-: https://vue-toastification.maronato.dev/
ConfettiExplosion-: https://www.npmjs.com/package/vue-confetti-explosion
-->
