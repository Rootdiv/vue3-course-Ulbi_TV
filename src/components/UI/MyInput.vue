<template>
  <input type="text" :value="modelValue" @input="updateInput" class="input" />
</template>

<script>
  export default {
    name: 'MyInput',
    props: {
      modelValue: [String, Number],
    },
    methods: {
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value);
      },
    },
  };
</script>

<style scoped>
  .input {
    width: 100%;
    border: 1px solid #008080;
    padding: 10px 15px;
    margin-top: 15px;
  }
</style>
