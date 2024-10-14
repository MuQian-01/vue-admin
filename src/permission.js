import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

// 设置进度条右上角的小圆圈
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单
const whiteList = ['/login'] // no redirect whitelist

// 全局路由守卫
router.beforeEach(async(to, from, next) => {
  // start progress bar => 启动进度条
  NProgress.start()

  // set page title => 设置每页的标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in => 获取token
  const hasToken = getToken()

  // 如果有token 证明之前登录过了
  if (hasToken) {
    // 访问的地址是登录页
    if (to.path === '/login') {
      // if is logged in, redirect to the home page => 直接跳转首页
      next({ path: '/' })
      // 进度条完成
      NProgress.done()
    } else {
      // 是否有用户信息
      const hasGetUserInfo = store.getters.name
      // 如果有
      if (hasGetUserInfo) {
        // 放行
        next()
      } else {
        try {
          // get user info => 如果没有 则发起请求获取用户信息
          await store.dispatch('user/getInfo')
          // 放行
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          // 重置token的方法
          await store.dispatch('user/resetToken')
          // 弹窗报错
          Message.error(error || 'Has Error')
          // 回到登录页重新登录
          next(`/login?redirect=${to.path}`)
          // 进度条完成
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    // 如果没有token

    // 如果该路径在白名单中 比如/login
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 重定向到登录页登录
      next(`/login?redirect=${to.path}`)
      // 进度条完成
      NProgress.done()
    }
  }
})

// 全局后置路由守卫
router.afterEach(() => {
  // finish progress bar
  // 进度条完成
  NProgress.done()
})
