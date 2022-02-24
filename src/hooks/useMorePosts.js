import axios from 'axios';
import { ref } from 'vue';

export function useMorePosts(posts, totalPages, limit) {
  const page = ref(1);
  const loadMorePosts = async () => {
    try {
      if (page.value < totalPages.value) {
        page.value += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: page.value,
            _limit: limit,
          },
        });
        posts.value = [...posts.value, ...response.data];
      }
    } catch (e) {
      alert('Ошибка');
    }
  };

  return {
    loadMorePosts,
  };
}
