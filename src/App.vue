<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from './Pages/frontend/navbar.vue';
export default {
  components: { Navbar }
};
</script>