import {defineStore} from 'pinia'
import { getBreadCrumbList } from '@/libs/util'
import conostantRoutes from '../router/routes'
import { RouteLocationMatched } from 'vue-router'
import { breadCrumb } from '@/types'


export const useUserRouteList = defineStore('userRouteList', {
  state: () => ({
    breadCrumbList: Array<breadCrumb>(),
    menuList: conostantRoutes,
    tagNavList: JSON.parse(sessionStorage.getItem('tagNavList') as string)
  }),

  actions: {
    setBreadCrumb (matched: Array<RouteLocationMatched>) {
      this.breadCrumbList = getBreadCrumbList(matched)
    },
    setTagNavList (list: breadCrumb[]) {
      if (list) {
        this.tagNavList = [...list]
        sessionStorage.setItem('tagNavList', JSON.stringify(list))
      } else {
        this.tagNavList = JSON.parse(sessionStorage.getItem('tagNavList') || '')
      }
    }
  }
})