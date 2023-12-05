import {defineStore} from 'pinia'
import { setToken, getToken } from '@/libs/util'
import { login } from '@/api/user'
import { interLogin } from '@/api/user/type'



export const useUserStore = defineStore('userStore', {
  state: () => ({
    userName: sessionStorage.getItem('username'),
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: ''
  }),
  actions: {
    setAvator (avatorPath: string) {
      this.avatorImgPath = avatorPath
    },
    setUserId (id: string) {
      this.userId = id
    },
    setUserName (name: string) {
      this.userName = name
    },
    setAccess (access: string) {
      this.access = access
    },
    setToken (token: string) {
      this.token = token
      setToken(token)
    },
    handleLogin (data: interLogin) {
      return new Promise((resolve, reject) => {
        // login(data).then(res => {}).catch(err => {
        //   reject(err)
        // })
        if(data) {
          this.setToken('token')
          this.setUserName('admin')
          sessionStorage.removeItem('menuList')
          sessionStorage.setItem('username', 'admin')
          sessionStorage.setItem('roleName', '超级管理员')
          resolve('success')
        } else {
          reject('err')
        }
      })
    },
    // 退出登录
    handleLogOut () {
      return new Promise((resolve) => {
        localStorage.removeItem('tagNaveList')
        sessionStorage.removeItem('menuList')
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        this.setToken('')
        this.setAccess('')
        resolve('success')
      })
    }
  }
})