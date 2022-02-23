<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import toggleMixin from '@/mixins/toggleMixin';

  export default {
    name: 'MyDialog',
    mixins: [toggleMixin],
  };
</script>

<style scoped>
  .dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
  }
  .dialog__content {
    margin: auto;
    background-color: #ffffff;
    border-radius: 12px;
    min-width: 300px;
    min-height: 50px;
    padding: 20px;
  }
</style>
