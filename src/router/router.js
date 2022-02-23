import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/pages/MainPage';
import PostsPage from '@/components/pages/PostsPage';
import PostIdPage from '@/components/pages/PostIdPage';
import PostPageWithStore from '@/components/pages/PostPageWithStore';
import PostPageCompositionApi from '@/components/pages/PostPageCompositionApi';
import AboutPage from '@/components/pages/AboutPage';

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
  {
    path: '/posts/:id',
    component: PostIdPage,
  },
  {
    path: '/store',
    component: PostPageWithStore,
  },
  {
    path: '/composition',
    component: PostPageCompositionApi,
  },
  {
    path: '/about',
    component: AboutPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
