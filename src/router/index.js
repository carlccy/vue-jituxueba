import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const App = () => import('@/App')
const home = () => import('@/page/home/home')
const channel = () => import('@/page/channel/channel.2')
const article = () => import('@/page/article/article')
const video = () => import('@/page/video/video')
const audio = () => import('@/page/audio/audio')
const mall = () => import('@/page/mall/mall')
const cart = () => import('@/page/cart/cart')
const dynamic = () => import('@/page/dynamic/dynamic')
const user = () => import('@/page/user/user2')
const goods = () => import('@/page/goods/goods')
const confirmOrder = () => import('@/page/confirmOrder/confirmOrder')
const invoice = () => import('@/page/confirmOrder/children/invoice')
const coupon = () => import('@/page/confirmOrder/children/coupon')
const chooseAddress = () => import('@/page/confirmOrder/children/chooseAddress')
const addAddress = () => import('@/page/confirmOrder/children/children/addAddress')
const editAddress = () => import('@/page/confirmOrder/children/children/editAddress')
const login = () => import('@/page/login/login')

Vue.use(Router)

const router =  new Router({
  // mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home,
      meta: { keepAlive: true },
      children: [{
        path: 'article/:text_id',
        component: article
      },{
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
      meta: { keepAlive: true },
      children: [{
        path: 'login',
        component: login
      },{
        path: 'article/:text_id',
        component: article
      },{
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
    }
  ]
})


router.beforeEach((to, from, next) => {
  // const token = getStore('userToken')
  const token = true
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (token) {  // 通过vuex state获取当前的token是否存在
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