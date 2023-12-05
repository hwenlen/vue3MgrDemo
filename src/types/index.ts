import { RouteLocationNormalizedLoaded } from 'vue-router'

export interface breadCrumb extends RouteLocationNormalizedLoaded {
  name: string,
  to: string,
  icon: string,
  meta: {
    icon: string,
    title: string
  }
}