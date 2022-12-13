import Axios from 'axios';
import Router from '@/router'
// import { useRouter } from "vue-router";
import MOMENT from 'moment'
// import AES from "@/assets/libs/AES"
import { getLocalStorage, setLocalStorage } from "@/utils/index"
import { message } from 'ant-design-vue'

const request = Axios.create({
  responseType: "json",
  timeout: 1000000,
  methods: "post",
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [function (data) {
    return JSON.stringify(data);
  }]
});

/****************** 请求拦截 ******************/
request.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

/****************** 返回拦截 ******************/
request.interceptors.response.use((res) => {
  if (!res.data || res.data.code === '111') {
    Router.push({
      name: "login"
    });
    message.destroy();
    message.error("会话已失效，请重新登录！")
    return Promise.reject();
  }

  if (res.config.url.includes('downloadFile') || res.config.url.includes("downloadVMFile")) {
    return res
  }

  if (res.data.code !== "200") {
    message.error(res.data.msg);

    return Promise.reject({
      msg: res.data.msg
    })
  }
  return res.data;
}, (err) => {
  message.error(err.msg || "服务器繁忙，稍后再试！")
  return Promise.reject(err);
});

export const postRequest = (url, params) => {
  return request({
    method: 'post',
    url: `${url}`,
    params: params
  })
}

export const postRequestBody = (url, params) => {
  return request({
    method: 'post',
    url: `${url}`,
    data: params
  })
}

export const getRequest = (url, params) => {
  return request({
    method: 'get',
    url: `${url}`,
    params: params,
    responseType: 'blob'
  })
}

export const postBlobRequest = (url, params) => {
  return request({
    method: 'get',
    url: `${url}`,
    params: params,
    responseType: 'blob'
  })
}

