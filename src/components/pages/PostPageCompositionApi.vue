<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" />
    <div v-else>Идёт загрузка...</div>
    <!-- <div v-intersection="loadMorePosts" class="observer"></div> -->
  </div>
</template>

<script>
  import PostForm from '@/components/PostForm';
  import PostList from '@/components/PostList';

  import { usePosts } from '@/hooks/usePosts';
  import useSortedPosts from '@/hooks/useSortedPosts';
  import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';

  export default {
    components: {
      PostForm,
      PostList,
    },
    data() {
      return {
        dialogVisible: false,
        sortOptions: [
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По содержимому' },
        ],
      };
    },
    methods: {
      createPost(post) {
        this.posts.push(post);
        this.dialogVisible = false;
      },
      removePost(post) {
        this.posts = this.posts.filter(item => item.id !== post.id);
      },
      showDialog() {
        this.dialogVisible = true;
      },
    },
    setup() {
      //console.log('props: ', props);
      const { posts, totalPages, isPostsLoading } = usePosts(10);
      const { sortedPosts, selectedSort } = useSortedPosts(posts);
      const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);
      return {
        posts,
        totalPages,
        isPostsLoading,
        sortedPosts,
        selectedSort,
        searchQuery,
        sortedAndSearchedPosts,
      };
    },
  };
</script>

<style>
  /* стили видны во всех компонентах */
  .app__btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;
  }
  .page__wrapper {
    display: flex;
    gap: 15px;
    margin-top: 15px;
  }
  .page {
    border: 1px solid #000000;
    padding: 10px;
  }
  .current-page {
    border: 2px solid #008080;
  }
  .observer {
    height: 1px;
    visibility: hidden;
  }
</style>
