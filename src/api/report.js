import { postRequest } from '@/utils/request'

// const baseURL = process.env.NODE_ENV === 'production'
//   ? '/chatbotexam/'
//   : '/';

const baseURL = "/chatbotexam/"
const url = {
  getReportListByCardId: `${baseURL}report/getReportListByCardId`,
  addReport: `${baseURL}report/addReport`,
  deleteReport: `${baseURL}report/deleteReport`,
  updateReport: `${baseURL}report/updateReport`
}

// 根据cardId查询日报
export const getReportListByCardId = (data) => postRequest(url.getReportListByCardId, data)

// 添加日报
export const addReport = (data) => postRequest(url.addReport, data)

// 删除日报
export const deleteReport = (data) => postRequest(url.deleteReport, data)

// 删除日报
export const updateReport = (data) => postRequest(url.updateReport, data)
