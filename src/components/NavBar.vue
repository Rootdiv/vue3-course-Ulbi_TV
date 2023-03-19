<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <MyButton @click="$router.push('/posts')">Посты</MyButton>
      <MyButton @click="$router.push('/about')">О сайте</MyButton>
      <MyButton @click="$router.push('/store')">Store</MyButton>
      <MyButton @click="$router.push('/composition')">Composition</MyButton>
    </div>
  </div>
</template>

<style scoped>
  .navbar {
    background-color: #d3d3d3;
    box-shadow: 2px 2px 4px #808080;
    display: flex;
    align-items: center;
    padding: 15px;
  }

  .navbar__btns {
    display: flex;
    gap: 20px;
    margin-left: auto;
  }
</style>
