import { postRequest } from '@/utils/request'
import { postFormRequest } from "@/utils/formRequest"

// const baseURL = process.env.NODE_ENV === 'production'
//   ? '/chatbotexam/'
//   : '/';

const baseURL = "/chatbotexam/"
// 添加分组
export const examGroupAdd = (data) => {
  return postRequest(`${baseURL}examGroup/add`, data)
}

// 修改分组
export const examGroupUpdate = (data) => {
  return postRequest(`${baseURL}examGroup/update`, data)
}

// 分组查询
export const examGroupQuery = (data) => {
  return postRequest(`${baseURL}examGroup/query`, data)
}

// 删除分组
export const examGroupDel = (data) => {
  return postRequest(`${baseURL}examGroup/del`, data)
}

// 题库详情
export const examGroupDetails = (data) => {
  return postRequest(`${baseURL}examGroup/details`, data)
}

// 添加题目
export const questionAdd = (data) => {
  return postFormRequest(`${baseURL}question/add`, data)
}

// 修改题目
export const questionUpdate = (data) => {
  return postFormRequest(`${baseURL}question/update`, data)
}

// 查询题目
export const questionQuery = (data) => {
  return postRequest(`${baseURL}question/query`, data)
}

// 删除题目
export const questionDel = (data) => {
  return postRequest(`${baseURL}question/del`, data)
}


// 添加分组
export const examAdd = (data) => {
  return postRequest(`${baseURL}exam/add`, data)
}

// 修改分组
export const examUpdate = (data) => {
  return postRequest(`${baseURL}exam/update`, data)
}

// 删除分组
export const examQuery = (data) => {
  return postRequest(`${baseURL}exam/query`, data)
}

// 分组查询
export const examDel = (data) => {
  return postRequest(`${baseURL}exam/del`, data)
}

// 试卷新增/修改
export const setPaper = (data) => {
  return postFormRequest(`${baseURL}exam/setPaper`, data)
}

// 试卷查询
export const getPaper = (data) => {
  return postFormRequest(`${baseURL}exam/getPaper`, data)
}

// 下发短信
export const sendExamMsg = (data) => {
  return postRequest(`${baseURL}exam/sendExamMsg`, data)
}

// 导出EXCEL
export const exportExam = (data) => {
  return postFormRequest(`${baseURL}exam/exportExam`, data, "get")
}

// 发送试卷
export const sendPaperQuery = (data) => {
  return postRequest(`${baseURL}exam/queryExam`, data)
}

// 试卷回落相关配置
export const setPaperFallback = (data) => {
  return postRequest(`${baseURL}exam/setPaperFallback`, data)
}

// 试卷展示样式相关配置
export const setPaperShow = (data) => {
  return postRequest(`${baseURL}exam/setPaperShow`, data)
} 

// 培训的新增/修改
export const setTrain = (data) => {
  return postFormRequest(`${baseURL}train/setTrain`, data)
}

// 培训查询
export const getTrain = (data) => {
  return postFormRequest(`${baseURL}/train/getTrain`, data)
}

// 培训下发记录的查询
export const getTrainLog = (data) => {
  return postFormRequest(`${baseURL}/train/sendList`, data)
}

// 培训下发
export const sendTrain = (data) => {
  return postFormRequest(`${baseURL}/train/sendTrain`, data)
}

