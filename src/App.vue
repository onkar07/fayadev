<script setup lang="ts">
import MainMenuDetails from './components/MainMenuDetails.vue';
import Navbar from './components/nav/Navbar.vue'
import Footer from './components/footer/FooterB.vue'
import Detailpagedt from './components/details/Detailpagedt.vue';

</script>

<template>
      
      <Navbar />
      <nav>
            <router-link to="/"></router-link>
            <router-link to="/details"></router-link>
          </nav>
          <router-view></router-view>
      <Footer />

</template>

<style scoped>

</style>
