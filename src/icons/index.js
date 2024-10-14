import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 全局注册
Vue.component('svg-icon', SvgIcon)

// require.context(目录名, 是否扫描子目录, 指定需要扫描文件的后缀名): 扫描指定的目录
const req = require.context('./svg', false, /\.svg$/)
// console.log(req) // f webpackContext
// console.log(req.keys()) // ['./dashboard.svg', ...]

// requireContext == req
// 引入所有的svg图标 => 模块
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)

// [].map((item, index)=> {})


  // 引入所有的svg图标 => 组件
  // const req = require.context('./svg', false, /\.svg$/)
  // const requireAll = (requireContext) => {
  //   return requireContext.keys().map(requireContext)
  // }
  // requireAll(req)
