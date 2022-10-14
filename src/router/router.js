import Main from "@/pages/Main"
import PostsPage from "@/pages/PostsPage"
import { createRouter, createWebHistory } from "vue-router"
import About from "@/pages/About.vue"
import PostPage from "@/pages/PostPage"
import PostsStorePage from "@/pages/PostsStorePage"
import PostsCompositionApiPageVue from "@/pages/PostsCompositionApiPage.vue"

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: PostsPage
  },
  {
    path: '/posts/:id',
    component: PostPage
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/composition',
    component: PostsCompositionApiPageVue
  },
  {
    path: '/store',
    component: PostsStorePage
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router;
