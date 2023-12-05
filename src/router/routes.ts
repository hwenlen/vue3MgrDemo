import Main from "@/views/main/main.vue";
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      icon: "ios-home",
      hideInMenu: true,
      title: '登录',
    },
    component: ()=>import('../views/login/login.vue')
  }, {
    path: '/:catchAll(.*)',
    name: 'error',
    meta: {
      icon: "ios-home",
      hideInMenu: true,
      title: '404',
    },
    component: ()=>import('../views/error/index.vue')
  }, {
    path: "/", 
    redirect: "/home",
    component: Main,
    children: [
      {
        path: "home",
        name: "home",
        meta: {
          hideInMenu: true,
          icon: "ios-home",
          notCache: true,
          title: "首页",
        },
        component: () => import("@/views/home/home.vue"),
      }
    ],
  }, {
    path: "/finance",
    meta: {
      title: '平台财务',
      icon: "ios-home"
    },
    name: 'finance',
    component: Main,
    children: [{
        path: "/finance/fundincome",
        name: "fundincome",
        meta: {
          icon: "ios-home",
          hideInMenu: false,
          title: "资金收入表",
        },
        component: () => import("@/views/finance/fundincome.vue"),
      }, {
        path: "/finance/fundexpend",
        name: "fundexpend",
        meta: {
          icon: "ios-home",
          hideInMenu: false,
          title: "资金支出表",
        },
        component: () => import("@/views/finance/fundexpend.vue"),
      }
    ],
  }, {
    path: "/order",
    meta: {
      title: '订单管理',
      icon: "ios-home"
    },
    name: 'order',
    component: Main,
    children: [{
        path: "/order/commodity",
        name: "commodity",
        meta: {
          icon: "ios-home",
          hideInMenu: false,
          title: "商品订单",
        },
        component: () => import("@/views/order/commodity.vue"),
      }, {
        path: "/order/serve",
        name: "serve",
        meta: {
          icon: "ios-home",
          hideInMenu: false,
          title: "服务订单",
        },
        component: () => import("@/views/order/serve.vue"),
      }
    ],
  }
]


export default routes