import axios from 'axios'

export function request(config) {
  // 新建一个axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  return instance(config)
}
