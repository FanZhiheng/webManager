import Axios from 'axios'
import qs from 'qs'

import Router from '@/router'
import { getlocalStorage, removelocalStorage } from "@/utils"
// import { message } from 'ant-design-vue'

const Request = Axios.create({
  responseType: "json",
  timeout: 1200000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
  },
  transformRequest: [function (data) {
    return qs.stringify(data, { arrayFormat: 'repeat' })
  }]
});

Request.interceptors.request.use(
  (config) => {
    if (config.url.includes("exportExam")) {
      config.responseType = 'blob'
      console.log(config)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
Request.interceptors.response.use(
  (res) => {
    console.log(res)
    // 文件流
    if (res.config.url.includes("exportExam")) {
      return res;
    }

    if (!res.data) {
      Router.push({
        name: "login"
      })
      message.error("会话已失效，请重新登录！")
      return Promise.reject();
    }

    if (res.data.code !== "200") {
      message.error(res.data.msg);

      return Promise.reject({
        msg: res.data.msg
      })
    }
    return res.data;
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const postFormRequest = (url, params, method = "post") => {
  return Request({
    method: method,
    url: `${url}`,
    data: params
  })
}



