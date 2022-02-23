<template>
  <div v-if="posts.length > 0">
    <div>
      <h3>Список постов</h3>
    </div>
    <TransitionGroup name="post-list">
      <PostItem v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)" />
    </TransitionGroup>
  </div>
  <h2 v-else style="color: #FF0000">
    Список постов пуст
  </h2>
</template>

<script>
  import PostItem from './PostItem.vue';
  export default {
    components: { PostItem },
    props: {
      //Указываем тип пропса и что он обязательный
      posts: {
        type: Object,
        required: true,
      },
    },
    emits: ['remove'],
  };
</script>

<style scoped>
  .post-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .post-list-enter-active,
  .post-list-leave-active {
    transition: all 0.4s ease;
  }
  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
  .post-list-move {
    transition: transform 0.4s ease;
  }
</style>
