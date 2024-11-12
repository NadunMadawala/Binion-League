<template>
  <div class="splash-screen">
    <!-- <img src="../assets/Splash screen.png" alt="Binions League Logo" /> -->
    <img src="../assets/Corrected logo without bg.png" alt="logoWithNoBG" class="headerLogo">
    <img src="../assets/Logo_name_correct-removebg-preview.png" alt="logoWithNoBG" class="headerName">
  </div>
</template>

<script>
export default {
  name: 'SplashScreen',
  mounted() {
    // Navigate to Register page after 5 seconds
    setTimeout(() => {
      this.$router.push('/login');
    }, 5000);
  },
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}

 .headerLogo {
  width: 300px;
  height: 300px;
  margin-top: 0;
  justify-content: center;
}

.headerName {
  width: 500px;
  height: 100px;
  margin-top: 0;
  justify-content: center;
}

.splash-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-color: #f0e68c;
  background: url('../assets/background dark.png') no-repeat center center fixed; 
  background-size: cover;
  overflow: hidden;
}

img {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
}
</style>
