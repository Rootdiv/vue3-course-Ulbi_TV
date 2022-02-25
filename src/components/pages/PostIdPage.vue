<template>
  <div>
    <h2>Это страница поста с ID = {{ $route.params.id }}</h2>
    <div v-if="!isPostsLoading">
      <br />
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div v-else>Идёт загрузка...</div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => ({ post: [], isPostsLoading: false }),
    methods: {
      async loadPost() {
        try {
          this.isPostsLoading = true;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + this.$route.params.id);
          this.post = response.data;
        } catch (error) {
          alert('Ошибка ' + error.message);
        } finally {
          this.isPostsLoading = false;
        }
      },
    },
    created() {
      this.loadPost();
    },
  };
</script>
