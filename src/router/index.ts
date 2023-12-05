import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { getToken } from '@/libs/util'
import Cookies from 'js-cookie'
import ViewUIPlus from 'view-ui-plus';


const router = createRouter({
  history: createWebHistory('/'),
  routes
})
const LOGIN_PAGE_NAME = 'login'
const menuList = sessionStorage.getItem('menuList') || ''

router.beforeEach((to, _from, next) => {
	window.document.title = to.meta.title as string
  ViewUIPlus.LoadingBar.start();
  const token = getToken()
  if (!to.meta.islogin) {
    if (!token && to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      // 未登陆且要跳转的页面是登录页
      next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      // 已登录且要跳转的页面是登录页
      next({
        name: 'home' // 跳转到home页
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
router.afterEach((_to) => {
  ViewUIPlus.LoadingBar.finish();
})

export default router