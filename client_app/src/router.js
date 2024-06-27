import { createRouter, createWebHistory } from 'vue-router';
import Index from './views/index.vue';
import Register from './views/register.vue';
import NotFound from './views/404.vue';
import Login from './views/login.vue';
import Home from './views/Home.vue';
import InfoShow from './views/InfoShow.vue';
import RobotList from './views/RobotList'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes:[
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [{ path: '', component: Home},
                { path: '/home', name: 'home', component: Home},
                { path: '/infoshow', name: 'infoshow', component: InfoShow},
                { path: '/robotlist', name: 'robotlist', component: RobotList }
    ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});



// Router Guard
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('eleToken') ? true : false; // 使用 getItem 方法更标准
  if (to.path === "/login" || to.path === "/register") {
    if (isLogin) {
      next('/index'); // 如果已经登录，重定向到首页
    } else {
      next(); // 否则允许访问登录或注册
    }
  } else {
    isLogin ? next() : next('/login'); // 如果没有登录，重定向到登录页
  }
});

export default router;
