<template>
  <div class="game">
    <div class="header">
      <img src="../assets/Corrected logo without bg.png" alt="logoWithNoBG" class="headerLogo" />
      <img src="../assets/Logo_name_correct-removebg-preview.png" alt="logoWithNoBG" class="headerName" />
      <div class="userName">
        <div class="avatar"></div>
        <h2>{{ userName }}</h2>
      </div>
    </div>
    <h3>Choose correct pairs..!</h3>
    <section class="game-board">
      <Card v-for="(card, index) in cardList" :key="`card-${index}`" :value="card.value" :visible="card.visible" :position="card.position" @selectCard="flipCard" />
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';
import Card from '../components/Card.vue';

export default {
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const cardList = ref([]);
    const userName = ref('Player'); // Example userName

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value:i,
        visible:false,
        position:i
      });
    }
    const flipCard =playload=>{
      cardList.value[playload.position].visible = true
    }

    return { cardList, userName };
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
  </style>
  