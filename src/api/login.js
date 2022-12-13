import { postRequest, postRequestBody } from '@/utils/request'

// const baseURL = process.env.NODE_ENV === 'production'
//   ? '/chatbotexam/'
//   : '/';

const baseURL = "/chatbotexam/"

const url = {
  login: `${baseURL}sign/doLogin/login`,
  logout: `${baseURL}sign/doOut/logout`,
  token: `${baseURL}sign/user/token`,
}

// 登录接口
export const login = (data) => postRequestBody(url.login, data)

// 登出接口
export const logout = (data) => postRequest(url.logout, data)

// 获取token
export const token = (data) => postRequest(url.token, data)