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
  import axios from 'axios';

  export default {
    components: {
      PostForm,
      PostList,
    },
    data() {
      return {
        posts: [],
        dialogVisible: false,
        isPostsLoading: false,
        selectedSort: '',
        sortOptions: [
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По содержимому' },
        ],
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
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
      // changePage(pageNumber) {
      //   this.page = pageNumber;
      // },
      async fetchPosts() {
        try {
          this.isPostsLoading = true;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
          this.posts = response.data;
        } catch (error) {
          alert('Ошибка ' + error.message);
        } finally {
          this.isPostsLoading = false;
        }
      },
      async loadMorePosts() {
        try {
          if (this.page < this.totalPages) {
            this.page += 1;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            });
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
            this.posts = [...this.posts, ...response.data];
          }
        } catch (error) {
          alert('Ошибка ' + error.message);
        }
      },
    },
    mounted() {
      this.fetchPosts();
      // const options = {
      //   rootMargin: '0px',
      //   threshold: 1.0,
      // };
      // const callback = entries => {
      //   //console.log(observer);
      //   if (entries[0].isIntersecting && this.page < this.totalPages) {
      //     this.loadMorePosts();
      //   }
      // };
      // const observer = new IntersectionObserver(callback, options);
      // observer.observe(this.$refs.observer);
    },
    computed: {
      sortedPosts() {
        return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
      },
      sortedAndSearchPosts() {
        return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      },
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
