<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post__btns">
      <MyButton @click="$router.push(`/posts/${post.id}`)">Открыть</MyButton>
      <MyButton @click="$emit('remove', post)">Удалить</MyButton>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped>
  /* scoped для видимости стилей только в этом компоненте */
  .post {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border: 2px solid #008080;
    margin-top: 15px;
  }
  .post__btns {
    display: flex;
  }
  .btn:first-child {
    margin: 0 15px;
  }
</style>
