<template>
  <div class="splash-screen">
    <img src="../assets/Splash screen.png" alt="Binions League Logo" />
  </div>
</template>

<script>
export default {
  name: 'SplashScreen',
  mounted() {
    // Navigate to Register page after 5 seconds
    setTimeout(() => {
      this.$router.push('/register');
    }, 5000);
  },
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}

.splash-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-color: #f0e68c;
}

img {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
}
</style>
