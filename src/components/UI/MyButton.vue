<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'MyButton',
  };
</script>

<style scoped>
  .btn {
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color: #008080;
    border: 1px solid #008080;
    cursor: pointer;
  }
</style>
