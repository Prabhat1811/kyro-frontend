<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>

  <RouterView />
</template>

<style lang=scss scoped>
*{
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  padding: 0;
  margin: 0;
  margin-bottom: 10vh;

  @media (max-width: 1024px) {
    margin-bottom: 7.5vh;
  }

}
</style>
