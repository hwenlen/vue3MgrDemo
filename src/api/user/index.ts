import axios from '@/libs/request'
import { interLogin } from './type'

export const login = (data: interLogin) => {
  return axios.request({
    url: '/api/login',
    data: data,
    method: 'post'
  })
}
