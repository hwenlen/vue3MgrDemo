import Cookies from 'js-cookie'
export const TOKEN_KEY = 'token'
import { breadCrumb } from '@/types'

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextName = (list: any, name: string) => {
  let res = ''
  if (list.length === 2) {
    res = 'home'
  } else {
    if (list.findIndex((item: { name: string }) => item.name === name) === list.length - 1) res = list[list.length - 2].name
    else res = list[list.findIndex((item: { name: string }) => item.name === name) + 1].name
  }
  return res
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list: any, newRoute: breadCrumb) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched: any) => {
  let res = routeMetched.filter((item: any) => {
    return item.name && item.name !== 'home'
  }).map((item: { meta: { icon: string }; name: string }) => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })

  return [{
    name: 'home',
    to: '/home',
    icon: 'ios-home',
    meta: {
      icon: 'ios-home',
      title: '首页'
    }
  }, ...res]
}

