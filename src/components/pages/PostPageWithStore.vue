<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect :model-value="selectedSort"  @update:model-value="setSelectedSort" :options="sortOptions" />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList :posts="sortedAndSearchPosts" @remove="removePost" v-if="!isPostsLoading" />
    <div v-else>Идёт загрузка...</div>
    <!-- <div class="page__wrapper">
      <div class="page" v-for="pageNumber in totalPages" :key="pageNumber"
        :class="{'current-page': page === pageNumber}" @click="changePage(pageNumber)">
        {{ pageNumber }}
      </div>
    </div> -->
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
  import PostForm from '@/components/PostForm';
  import PostList from '@/components/PostList';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

  export default {
    components: {
      PostForm,
      PostList,
    },
    data() {
      return {
        dialogVisible: false,
      };
    },
    methods: {
      ...mapMutations({
        setPage: 'post/setPage',
        setSearchQuery: 'post/setSearchQuery',
        setSelectedSort: 'post/setSelectedSort',
      }),
      ...mapActions({
        fetchPosts: 'post/fetchPosts',
        loadMorePosts: 'post/loadMorePosts',
      }),
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
      // changePage(pageNumber) {
      //   this.page = pageNumber;
      // },
    },
    mounted() {
      this.fetchPosts();
    },
    computed: {
      ...mapState({
        posts: state => state.post.posts,
        isPostsLoading: state => state.post.isPostsLoading,
        selectedSort: state => state.post.selectedSort,
        searchQuery: state => state.post.searchQuery,
        page: state => state.post.page,
        limit: state => state.post.limit,
        totalPages: state => state.post.totalPages,
        sortOptions: state => state.post.sortOptions,
      }),
      ...mapGetters({
        sortedPosts: 'post/sortedPosts',
        sortedAndSearchPosts: 'post/sortedAndSearchPosts',
      }),
    },
    watch: {
      // page() {
      //   this.fetchPosts();
      // },
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
