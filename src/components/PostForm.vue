<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <MyInput v-focus v-model.trim="post.title" placeholder="Название" />
    <MyInput v-model.trim="post.body" placeholder="Описание" />
    <MyButton style="margin-top: 15px;" @click="createPost">Создать</MyButton>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        post: {
          title: '',
          body: '',
        },
      };
    },
    methods: {
      createPost() {
        this.post.id = Date.now();
        this.$emit('create', this.post);
        this.post = {
          title: '',
          body: '',
        };
      },
    },
    //Наблюдение за объектом
    // watch: {
    //   post: {
    //     handler(newValue) {
    //       console.log(newValue);
    //     },
    //     deep: true,
    //   },
    // },
  };
</script>

<style scoped>
  /* scoped для видимости стилей только в этом компоненте */
  form {
    display: flex;
    flex-direction: column;
  }
</style>
