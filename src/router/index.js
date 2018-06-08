import Vue from 'vue'
import Router from 'vue-router'

// 懒加载

const home = r => require.ensure([], () => r(require('@/page/home/home')), 'home')
const channel = r => require.ensure([], () => r(require('@/page/channel/channel')), 'channel')

const article = r => require.ensure([], () => r(require('@/page/article/article')), 'content-group')
const video = r => require.ensure([], () => r(require('@/page/video/video')), 'content-group')
const audio = r => require.ensure([], () => r(require('@/page/audio/audio')), 'content-group')

const user = r => require.ensure([], () => r(require('@/page/user/user')), 'user-group')
const login = r => require.ensure([], () => r(require('@/page/login/login')), 'user-group')



Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home,
      // meta: { keepAlive: true },
      children: [{
        path: 'article/:text_id',
        component: article
      }, {
        path: 'video/:video_id',
        component: video
      },
      {
        path: 'audio/:audio_id',
        component: audio
      }]
    },
    {
      path: '/channel/:index',
      component: channel,
      // meta: { keepAlive: true },
      children: [{
        path: 'login',
        component: login
      }, {
        path: 'article/:text_id',
        component: article
      }, {
        path: 'video/:video_id',
        component: video
      },
      {
        path: 'audio/:audio_id',
        component: audio
      }]
    },
    {
      path: '/article/:text_id',
      component: article
    },
    {
      path: '/video/:video_id',
      component: video
    },
    {
      path: '/audio/:audio_id',
      component: audio
    },
    {
      path: '/user',
      component: user,
      meta: {
        requireAuth: true,
      },
      children: [{
        path: 'login',
        component: login
      }]
    },

    /* {
      path: '/mall',
      component: mall
    },
    {
      path: '/cart',
      component: cart
    },
    {
      path: '/dynamic',
      component: dynamic
    },
    {
      path: '/goods/:goods_id',
      component: goods
    },
    {
      path: '/confirmOrder',
      component: confirmOrder,
      children: [{
        path: 'invoice',
        component: invoice
      }, {
        path: 'coupon',
        component: coupon
      }, {
        path: 'chooseAddress',
        component: chooseAddress,
        children: [{
          path: 'addAddress',
          component: addAddress
        }, {
          path: 'editAddress',
          component: editAddress
        }]
      }]
    } */
  ]
})


router.beforeEach((to, from, next) => {
  // const token = getStore('userToken')
  const token = true // 业务暂不用登录权限
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (token) {  // 也可通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

export default router