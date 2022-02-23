<template>
  <NavBar />
  <div class="app">
    <RouterView />
  </div>
</template>

<script>
  import NavBar from './components/NavBar';
  export default {
    components: { NavBar },
  };
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .app {
    padding: 20px;
    overflow-x: hidden;
  }
</style>
