<template>
  <div class="game">
    <div class="header">
      <img src="../assets/Corrected logo without bg.png" alt="logoWithNoBG" class="headerLogo" />
      <img src="../assets/Logo_name_correct-removebg-preview.png" alt="logoWithNoBG" class="headerName" />
      <div class="userName">
        <div class="avatar"></div>
        <h2>userName</h2>
      </div>
    </div>
    <h3>Choose correct pairs..!</h3>
    <div class="game-container">
      <div class="nav-panel">
        <div class="nav-container">
          <a class="navbtn" >Home</a>
          <a class="navbtn" >Tutorial & Story</a>
          <a class="navbtn" >Leaderboard</a>
          <a class="navbtn" >Account</a>
          <button class="logoutbtn">Logout</button>
        </div>
      </div>
      <section class="game-board">
        <Card v-for="(card, index) in cardList" 
        :key="`card-${index}`" 
        :matched="card.matched"
        :value="card.value" 
        :visible="card.visible" 
        :position="card.position"
        @select-card="flipCard" />
      </section>
      <div class="scoreboard-container">
        <div class="game-detail">
          <div class="level">Mode : </div>
          <div class="level">Level : </div>
        </div>
        <div class="score-board">
          <div class="time">Time remaining : 20s </div>
          <div class="life-count">Lifes: </div>
          <h4>{{ status }}</h4>
          <button @click="shuffleCards" class="navbtn">Restart Game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {computed, ref,watch } from 'vue';
import Card from '../components/Card.vue';

export default {
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const cardList = ref([]);
    const userSelection=ref([]);
    

    const status = computed(()=>{
      if (remainingPairs.value === 0){
        return 'Player Wins..!'
      }else{
        return `Remaining Pairs: ${remainingPairs.value}`
      }
    }) 

    const remainingPairs= computed(()=>{
      const remainingCards = cardList.value.filter(card=> card.matched===false).length

      return remainingCards / 2
    })

    const shuffleCards = ()=>{
      cardList.value =  _.shuffle(cardList.value)
    }

    const restartGame = () =>{
      shuffleCards()

      cardList.value = cardList.value.map((card,index) =>{
        return{
          ...card,
          matched:false,
          position:index,
          visible:false,
        }
      })
    }

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value:8,
        visible:false,
        position:i,
        matched:false,
      });
    }
    const flipCard =(playload)=>{
      cardList.value[playload.position].visible = true

      if(userSelection.value[0]){
        userSelection.value[1] = playload
      }else{
        userSelection.value[0]=playload
      }
    }
    watch(userSelection,(currentValue)=>{
      if(currentValue.length===2){
          const cardOne= currentValue[0]
          const cardTwo= currentValue[1]

          if(cardOne.faceValue ===cardTwo.faceValue){
            

            cardList.value[cardOne.position].matched=true
            cardList.value[cardTwo.position].matched=true
          }else{
            
            
            cardList.value[cardOne.position].visible=false
            cardList.value[cardTwo.position].visible=false
          }
        



        userSelection.value.length = 0
      }
    },{deep:true})

    return { 
      cardList, 
      flipCard,
      userSelection ,
      status,
      shuffleCards,
      restartGame,
    };
  },
};
</script>

<style scoped>
/* Your existing styles */
</style>

  
  <style scoped>
    .game{
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
  .avatar{
    height: 40px;
    width: 40px;
    background: white;
    border-radius: 50%;
  }

  h3{
    color: #FFD700;
    margin: 0;
    height: 10%;
    position: absolute;
    top: 20%;
    left: 45%;
  }
 .game-container{
  display: flex;
  align-items: center;
  justify-content: space-around;
 }
  .nav-panel{
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px); 
  background: rgba(255, 255, 255, 0.2); 
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  width: 12%; 
  }
  .nav-container{
    display: flex;
    flex-direction: column;
    background-color: #E8B931;
    border-radius: 20px;
    padding: 10px;
  }
  .navbtn{
    background-color: #FBF4A9;
    color: black;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 20px;
    font-weight: bold;
    align-content: center;
  }
  .navbtn:hover{
    background-color:#ffffff;
    color: #FFD700;
    transform: scale(1.1);
    border: 3px solid #FFD700;
  }
  .logoutbtn{
    color: crimson;
    padding: 10px;
    margin: 10px;
    border-radius: 20px;
    font-weight:bolder;
    border: 3px solid red;
    align-content: center;
  }
  .logoutbtn:hover{
    background-color:crimson;
    color: #FFD700;
    transform: scale(1.1);
    border: 3px solid white;
  }
  .game-board{
    display: grid;
    grid-template-columns: 100px 100px 100px 100px;
    grid-column-gap: 30px;
    grid-template-rows: 100px 100px 100px 100px;
    grid-row-gap:30px ;
    justify-content: center;
  }
  .card{
    border:5px solid #ccc ;

  }
  .scoreboard-container{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }
  .game-detail{
    margin-bottom: 20px;
    border:5px solid #ccc ;
  padding: 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px); 
  background: rgba(255, 255, 255, 0.2); 
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
  .score-board{
    border:5px solid #ccc ;
    padding: 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px); 
  background: rgba(255, 255, 255, 0.2); 
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
  </style>
  